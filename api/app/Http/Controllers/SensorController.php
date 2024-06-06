<?php

namespace App\Http\Controllers;

use App\Events\MainDataLogEvent;
use App\Events\RoomDataLogEvent;
use App\Events\SensorConnectedEvent;
use App\Events\SensorConnectionAttemptEvent;
use App\Models\Humidity;
use App\Models\Sensor;
use App\Models\Temperature;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use DB;

class SensorController extends Controller
{
    public static function getSensors(): JsonResponse
    {
        /*
         * Remove all the sensors that are unauthorized
         * and last connection attempt is older than 15 seconds
         *
         * This means that the sensor had attempted a connection, but stopped sending data
         */
        $sensors = Sensor::get();
        foreach ($sensors as $sensor) {
            if(!$sensor->authorized) {
                $last_attempt = $sensor->last_auth_attempt;
                $current_time = time();

                if($current_time - $last_attempt > 15) {
                    $sensor->delete();
                }
            }
        }

        $sensors = Sensor::get();

        return response()->json([
            'status' => 200,
            'sensors' => $sensors,
        ]);
    }

    public function getUnassignedSensors(): JsonResponse
    {
        $unassignedSensors = Sensor::where('sub_section_id', '=', 0)->where('authorized', '=', true)->get();

        return response()->json([
            'status' => 200,
            'message' => 'List of unassigned sensors',
            'sensors' => $unassignedSensors,
        ]);
    }

    public static function deleteSensor($sensor_token): JsonResponse
    {
        $validation = Validator::make(['sensor_token' => $sensor_token], [
            'sensor_token' => 'required|exists:sensors,sensor_token',
        ]);

        if ($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $sensor = Sensor::where('sensor_token', $sensor_token)->first();
        Sensor::where('sensor_token', $sensor_token)->delete();

        self::createLog('The sensor ('.$sensor->sensor_name.') has been deleted');

        return response()->json([
            'status' => 200,
            'message' => 'Sensor successfully deleted',
        ]);
    }

    public static function editSensor(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'id' => 'required|exists:sensors,id',
            'sensor_name' => 'string|min:2|max:55',
            'sub_section_id' => [
                'integer',
                function ($attribute, $value, $fail) {
                    if ($value !== 0 && !DB::table('sub_sections')->where('id', $value)->exists()) {
                        $fail('The selected sub_section_id is invalid.');
                    }
                },
            ],
        ]);

        if ($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        if(!request('sensor_name')) {
            Sensor::where('id', request('id'))->update([
                'sub_section_id' => request('sub_section_id'),
            ]);
        } else {
            Sensor::where('id', request('id'))->update([
                'sensor_name' => request('sensor_name'),
                'sub_section_id' => request('sub_section_id'),
            ]);
        }

        $updatedSensor = Sensor::where('id', request('id'))->first();

        return response()->json([
            'status' => 201,
            'message' => 'Sensor updated successfully',
            'sensor' => $updatedSensor,
        ], 201);
    }

    public static function sendData(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'sensor_token' => 'required|exists:sensors,sensor_token',
            'temperature' => 'required|string',
            'humidity' => 'required|string',
        ]);

        if ($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $sensor = Sensor::where('sensor_token', request('sensor_token'))->first();

        $sensor->update([
            'last_data_update' => time(),
        ]);

        $sub_section_id = $sensor->sub_section_id;

        if($sub_section_id > 0) {
            $temperature = Temperature::create([
                'sub_section_id' => $sub_section_id,
                'value' => (float) request('temperature'),
                'timestamp' => time(),
            ]);

            $humidity = Humidity::create([
                'sub_section_id' => $sub_section_id,
                'value' => (float) request('humidity'),
                'timestamp' => time(),
            ]);

            broadcast(new MainDataLogEvent([
                'sensor' => $sensor,
                'temperature' => $temperature,
                'humidity' => $humidity,
            ]));

            broadcast(new RoomDataLogEvent(
                [
                    'sensor' => $sensor,
                    'temperature' => $temperature,
                    'humidity' => $humidity,
                ],
                $sensor->sub_section_id
            ));

            return response()->json([
                'status' => 201,
                'message' => 'Temperature and humidity successfully logged',
                'temperature' => $temperature,
                'humidity' => $humidity,
            ], 201);
        }

        broadcast(new MainDataLogEvent([
            'sensor' => $sensor,
            'temperature' => null,
            'humidity' => null,
        ]));

        return response()->json([
            'status' => 404,
            'message' => 'Sensor not authorized to any sub-section',
        ], 404);
    }

    // Sensor handshake/authorization request
    public static function attemptHandshake(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'sensor_name' => 'required|string|min:3|max:55',
            'sensor_token' => 'required|string|size:30',
        ]);

        if ($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        // Get the previous attempt if it exists
        $token = request('sensor_token');
        $previousAttempt = Sensor::where('sensor_token', $token)->first();

        // If there is no previous attempt, create a new unauthorized sensor
        if(!$previousAttempt) {
            $newSensor = Sensor::create([
                'sensor_name' => request('sensor_name'),
                'sensor_token' => $token,
                'authorized' => false,
                'last_auth_attempt' => time(),
                'last_data_update' => null,
            ]);

            broadcast(new SensorConnectionAttemptEvent($newSensor));
            self::createLog($newSensor->sensor_name . ' has started an authorization request');

            return response()->json([
                'status' => 201,
                'message' => 'Waiting for authorization',
            ], 201);
        }

        // If sensor is authorized, return 200
        if($previousAttempt->authorized) {
            broadcast(new SensorConnectedEvent($previousAttempt));

            return response()->json([
                'status' => 200,
                'message' => 'Authorized',
            ]);
        }

        // If the sensor isn't new and isn't authorized, update last_auth_attempt timestamp
        $previousAttempt->update([
            'last_auth_attempt' => time(),
        ]);

        broadcast(new SensorConnectionAttemptEvent($previousAttempt));

        return response()->json([
            'status' => 201,
            'message' => 'Waiting for authorization',
        ], 201);
    }

    // User authorized the sensor that is attempting to handshake
    public static function acceptHandshake(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'sensor_token' => 'required|exists:sensors,sensor_token|string',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $authorizedSensor = Sensor::where('sensor_token', request('sensor_token'))->first();
        $authorizedSensor->update([
            'authorized' => true,
            'last_data_update' => time(),
        ]);

        self::createLog($authorizedSensor->sensor_name . ' has been authorized');

        return response()->json([
            'status' => 201,
            'message' => 'Sensor authorized',
            'sensor' => $authorizedSensor,
        ], 201);
    }

    public static function getSensorBySubsection($sub_section_id): JsonResponse
    {
        $validation = Validator::make(['id' => $sub_section_id], [
            'id' => 'required|exists:sub_sections,id',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $sensor = Sensor::where('sub_section_id', $sub_section_id)->first();

        if(!$sensor) {
            return response()->json([
                'status' => 200,
                'message' => 'Sensor not found for this subsection',
                'sensor' => null,
            ]);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Sensor found for this subsections',
            'sensor' => $sensor,
        ]);
    }
}

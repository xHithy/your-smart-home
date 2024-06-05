<?php

namespace App\Http\Controllers;

use App\Models\Humidity;
use App\Models\Sensor;
use App\Models\SubSection;
use App\Models\Temperature;
use App\Models\Token;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Hash;

class SubSectionController extends Controller
{
    public static function getSubsections(): JsonResponse
    {
        $subsections = SubSection::with('category')->get();

        return response()->json([
            'status' => 200,
            'message' => 'Subsection list',
            'subsections' => $subsections,
        ]);
    }

    public static function createSubsection(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'name' => 'required|min:2|max:55|string',
            'section_id' => 'required|integer|exists:sections,id',
            'category_id' => 'required|integer|exists:sub_section_categories,id',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $newSubsection = SubSection::create([
            'name' => request('name'),
            'section_id' => request('section_id'),
            'category_id' => request('category_id'),
        ]);

        $newSubsectionWithCategory = SubSection::where('id', $newSubsection->id)->with('category')->first();

        self::createLog('A new subsection ('.$newSubsection->name.') has been created');

        return response()->json([
            'status' => 201,
            'message' => 'Subsection successfully created',
            'subsection' => $newSubsectionWithCategory,
        ], 201);
    }

    public static function editSubsection(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'id' => 'required|exists:sub_sections,id|integer',
            'name' => 'required|string|min:2|max:55',
            'category_id' => 'required|integer|exists:sub_section_categories,id',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $editedSubsection = SubSection::where('id', request('id'))->with('category')->update([
            'name' => request('name'),
            'category_id' => request('category_id'),
        ]);

        return response()->json([
            'status' => 201,
            'message' => 'Subsection successfully edited',
            'subsection' => $editedSubsection,
        ], 201);
    }

    public static function deleteSubsection($id): JsonResponse
    {
        $validation = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:sub_sections,id',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        SubSection::where('id', $id)->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Subsection successfully deleted',
        ]);
    }

    public static function pin(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'sub_section_id' => 'required|exists:sub_sections,id',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $sub_section_id = request('sub_section_id');

        $subSection = SubSection::where('id', $sub_section_id)->first();

        // If its not pinned then pin it, if it's pinned then unpin it
        if($subSection->pinned) {
            $message = 'Room successfully unpinned';
            $subSection->update([
                'pinned' => false,
            ]);
        } else {
            $message = 'Room successfully pinned';
            $subSection->update([
                'pinned' => true,
            ]);
        }

        $updatedSubSection = SubSection::where('id', $sub_section_id)->first();

        return response()->json([
            'status' => 201,
            'message' => $message,
            'sub_section' => $updatedSubSection,
        ], 201);
    }

    public static function getPinned(): JsonResponse
    {
        $pinnedSubsections = SubSection::where('pinned', '=', true)->with('section')->with('category')->get();

        return response()->json([
            'status' => 200,
            'message' => 'List of pinned sensors with section data',
            'pinned_sub_sections' => $pinnedSubsections,
        ]);
    }

    public static function wipeData(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'password' => 'required',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $token = request()->bearerToken();

        // Get the user by the token
        $tokenData = Token::where('token', $token)->first();
        $user = User::where('id', $tokenData->user_id)->first();

        // Check if the password is correct
        $passwordCorrect = Hash::check(request('password'), $user->password);

        if(!$passwordCorrect) {
            return self::incorrectPayloadFormatResponse([
                'password' => ['Incorrect password'],
            ]);
        }

        Temperature::query()->delete();
        Humidity::query()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Data wiped successfully',
        ]);
    }

    public static function addSensor(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'sensor_token' => 'required|string',
            'sub_section_id' => 'required|exists:sub_sections,id',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $sensor = Sensor::where('sensor_token', request('sensor_token'))->first();

        if($sensor->sub_section_id !== 0) {
            $error = [
                'sensor_token' => ['Sensor already assigned to a room'],
            ];

            return self::incorrectPayloadFormatResponse($error);
        }

        $sensor->update([
            'sub_section_id' => request('sub_section_id'),
        ]);

        return response()->json([
            'status' => 201,
            'message' => 'Sensor assigned to room successfully',
        ], 201);
    }

    public static function getHumidity($sub_section_id): JsonResponse
    {
        $validation = Validator::make(['id' => $sub_section_id], [
            'id' => 'required|exists:sub_sections,id',
        ]);

        if ($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $queryType = request()->query('type', 'day'); // Default to 'day' if not provided
        $interval = self::getIntervalForQueryType($queryType);
        $startTime = Carbon::now()->sub(self::getTimeFrameForQueryType($queryType));

        $humidities = Humidity::where('sub_section_id', $sub_section_id)
            ->where('timestamp', '>=', $startTime->timestamp)
            ->orderBy('timestamp')
            ->get();

        $filledHumidities = self::fillMissingTimestamps($sub_section_id, $humidities, $interval, $startTime);

        return response()->json([
            'status' => 200,
            'message' => 'Humidities for room successfully fetched',
            'humidities' => $filledHumidities,
        ]);
    }

    public static function getTemperature($sub_section_id): JsonResponse
    {
        $validation = Validator::make(['id' => $sub_section_id], [
            'id' => 'required|exists:sub_sections,id',
        ]);

        if ($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $queryType = request()->query('type', 'day'); // Default to 'day' if not provided
        $interval = self::getIntervalForQueryType($queryType);
        $startTime = Carbon::now()->sub(self::getTimeFrameForQueryType($queryType));

        $temperatures = Temperature::where('sub_section_id', $sub_section_id)
            ->where('timestamp', '>=', $startTime->timestamp)
            ->orderBy('timestamp')
            ->get();

        $filledTemperatures = self::fillMissingTimestamps($sub_section_id, $temperatures, $interval, $startTime);

        return response()->json([
            'status' => 200,
            'message' => 'Temperatures for room successfully fetched',
            'temperatures' => $filledTemperatures,
        ]);
    }

    private static function getIntervalForQueryType(string $queryType): int
    {
        return match ($queryType) {
            'week' => 3600,
            'hour' => 30,
            default => 600,
        };
    }

    private static function getTimeFrameForQueryType(string $queryType): Carbon
    {
        return match ($queryType) {
            'week' => Carbon::now()->subWeek(),
            'hour' => Carbon::now()->subHour(),
            default => Carbon::now()->subDay(),
        };
    }

    private static function fillMissingTimestamps($sub_section_id, $data, int $interval, Carbon $startTime): array
    {
        $filledData = [];
        $timestampPointer = $startTime->timestamp;
        $now = Carbon::now()->timestamp;

        while ($timestampPointer <= $now) {
            $filtered = $data->filter(function ($item) use ($timestampPointer, $interval) {
                return $item->timestamp >= $timestampPointer && $item->timestamp < $timestampPointer + $interval;
            });

            if ($filtered->isEmpty()) {
                // Only add a null value if we're not at the current time
                if ($timestampPointer < $now) {
                    $filledData[] = [
                        'sub_section_id' => $sub_section_id,
                        'value' => 0,
                        'timestamp' => $timestampPointer,
                        'isInvalid' => true,
                    ];
                }
            } else {
                $averageValue = $filtered->avg('value');
                $filledData[] = [
                    'sub_section_id' => $sub_section_id,
                    'value' => round($averageValue, 1),
                    'timestamp' => $timestampPointer,
                ];
            }

            $timestampPointer += $interval;
        }

        // Check if the latest data point exists
        if ($data->last() && $data->last()->timestamp > $timestampPointer - $interval) {
            $filledData[] = [
                'sub_section_id' => $sub_section_id,
                'value' => round($data->last()->value, 1),
                'timestamp' => $data->last()->timestamp,
            ];
        }

        return $filledData;
    }
}

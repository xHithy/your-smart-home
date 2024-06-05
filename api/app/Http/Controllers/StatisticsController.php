<?php

namespace App\Http\Controllers;

use App\Models\Humidity;
use App\Models\Log;
use App\Models\Temperature;
use Illuminate\Http\JsonResponse;

class StatisticsController extends Controller
{
    public static function getStatistics(): JsonResponse
    {
        // Get all temperature and humidity data
        $temperatureData = Temperature::get();
        $humidityData = Humidity::get();

        // Get the max and min values for temperature and humidity
        $maxTemp = $temperatureData->sortByDesc('value')->first();
        $minTemp = $temperatureData->sortBy('value')->first();
        $maxHumidity = $humidityData->sortByDesc('value')->first();
        $minHumidity = $humidityData->sortBy('value')->first();

        return response()->json([
            'status' => 200,
            'message' => 'Fetched all time statistics for temperatures and humidities',
            'humidity' => [
                'ath' => [
                    'value' => $maxHumidity->value,
                    'timestamp' => $maxHumidity->timestamp,
                ],
                'atl' => [
                    'value' => $minHumidity->value,
                    'timestamp' => $minHumidity->timestamp,
                ],
                'avg' => round($humidityData->avg('value'), 1),
                'total_records' => $humidityData->count(),
            ],
            'temperature' => [
                'ath' => [
                    'value' => $maxTemp->value,
                    'timestamp' => $maxTemp->timestamp,
                ],
                'atl' => [
                    'value' => $minTemp->value,
                    'timestamp' => $minTemp->timestamp,
                ],
                'avg' => round($temperatureData->avg('value'), 1),
                'total_records' => $temperatureData->count(),
            ],
        ]);
    }

    public static function getLogs(): JsonResponse
    {
        // Delete logs that are older than 24 hours
        $twentyFourHoursAgo = now()->subDay();
        Log::where('timestamp', '<', $twentyFourHoursAgo)->delete();

        $logs = Log::where('timestamp', '>=', $twentyFourHoursAgo)->get();

        return response()->json([
            'status' => 200,
            'message' => 'List of all the logs (24h)',
            'logs' => $logs,
        ]);
    }
}

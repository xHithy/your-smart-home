<?php

namespace App\Http\Controllers;

use App\Events\ActionLogEvent;
use App\Models\Log;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests;
    use ValidatesRequests;

    public static function incorrectPayloadFormatResponse($errors): JsonResponse
    {
        return response()->json([
            'status' => 422,
            'message' => 'Payload incorrectly formatted',
            'errors' => $errors,
        ]);
    }

    public static function createLog($log): void
    {
        $userIpAddress = request()->ip();
        $log = Log::create([
            'log' => $log . ' (IP: ' . $userIpAddress . ')',
            'timestamp' => time(),
        ]);

        broadcast(new ActionLogEvent([
            'log' => $log->log,
            'timestamp' => time(),
        ]));
    }
}

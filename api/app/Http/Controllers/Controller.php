<?php

namespace App\Http\Controllers;

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
}

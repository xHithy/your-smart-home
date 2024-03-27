<?php

use App\Http\Controllers\SensorController;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(function () {
    Route::prefix('/sensor')->group(function () {
        Route::post('/handshake', [SensorController::class, 'attemptHandshake']);
        Route::post('/authorize', [SensorController::class, 'acceptHandshake']);
    });
});

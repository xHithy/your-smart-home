<?php

use App\Http\Controllers\SectionController;
use App\Http\Controllers\SensorController;
use App\Http\Controllers\SubSectionCategoryController;
use App\Http\Controllers\SubSectionController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\TokenVerification;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(function () {
    // Sensor API endpoints
    Route::prefix('/sensor')->group(function () {
        Route::get('/', [SensorController::class, 'getSensors'])->middleware(TokenVerification::class);
        Route::get('/unassigned', [SensorController::class, 'getUnassignedSensors'])->middleware(TokenVerification::class);
        Route::get('/{sub_section_id}', [SensorController::class, 'getSensorBySubsection'])->middleware(TokenVerification::class);
        Route::post('/handshake', [SensorController::class, 'attemptHandshake']);
        Route::post('/authorize', [SensorController::class, 'acceptHandshake'])->middleware(TokenVerification::class);
        Route::post('/data', [SensorController::class, 'sendData']);
        Route::put('/edit', [SensorController::class, 'editSensor'])->middleware(TokenVerification::class);
        Route::delete('/{sensor_token}', [SensorController::class, 'deleteSensor'])->middleware(TokenVerification::class);
    });

    // Section API endpoints
    Route::prefix('/section')->middleware(TokenVerification::class)->group(function () {
        Route::get('/', [SectionController::class, 'getSections']);
        Route::get('/{id}', [SectionController::class, 'getSingleSection']);
        Route::post('/create', [SectionController::class, 'createSection']);
        Route::post('/edit', [SectionController::class, 'editSection']);
        Route::delete('/delete/{id}', [SectionController::class, 'deleteSection']);
    });

    // Sub-section API endpoints
    Route::prefix('/subsection')->middleware(TokenVerification::class)->group(function () {
        Route::get('', [SubSectionController::class, 'getSubsections']);
        Route::get('/categories', [SubSectionCategoryController::class, 'getSubSectionCategories']);
        Route::get('/temperature/{sub_section_id}', [SubSectionController::class, 'getTemperature']);
        Route::get('/humidity/{sub_section_id}', [SubSectionController::class, 'getHumidity']);
        Route::get('/pinned', [SubSectionController::class, 'getPinned']);
        Route::post('/wipe-data', [SubSectionController::class, 'wipeData']);
        Route::post('/pin', [SubSectionController::class, 'pin']);
        Route::post('/create', [SubSectionController::class, 'createSubsection']);
        Route::post('/add-sensor', [SubSectionController::class, 'addSensor']);
        Route::put('/edit', [SubSectionController::class, 'editSubsection']);
        Route::delete('/delete/{id}', [SubSectionController::class, 'deleteSubsection']);
    });

    // Authorization API endpoints
    Route::prefix('/auth')->group(function () {
        Route::post('/login', [UserController::class, 'login']);
        Route::post('/logout', [UserController::class, 'logout']);
        Route::post('/ping-token', [UserController::class, 'pingToken'])->middleware(TokenVerification::class);
    });
});

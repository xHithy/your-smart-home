<?php

use App\Http\Controllers\SectionController;
use App\Http\Controllers\SensorController;
use App\Http\Controllers\SubSectionCategoryController;
use App\Http\Controllers\SubSectionController;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(function () {
    // Sensor API calls
    Route::prefix('/sensor')->group(function () {
        Route::post('/handshake', [SensorController::class, 'attemptHandshake']);
        Route::post('/authorize', [SensorController::class, 'acceptHandshake']);
    });

    // Section API calls
    Route::prefix('/section')->group(function () {
        Route::get('/', [SectionController::class, 'getSections']);
        Route::post('/create', [SectionController::class, 'createSection']);
        Route::post('/edit', [SectionController::class, 'editSection']);
        Route::delete('/delete/{id}', [SectionController::class, 'deleteSection']);
    });

    // Sub-section API calls
    Route::prefix('/subsection')->group(function () {
        Route::get('', [SubSectionController::class, 'getSubsections']);
        Route::post('/create', [SubSectionController::class, 'createSubsection']);
        Route::put('/edit', [SubSectionController::class, 'editSubsection']);
        Route::delete('/delete/{id}', [SubSectionController::class, 'deleteSubsection']);
        Route::get('/categories', [SubSectionCategoryController::class, 'getSubSectionCategories']);
    });
});

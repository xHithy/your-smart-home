<?php

namespace App\Http\Controllers;

use App\Models\SubSectionCategory;
use Illuminate\Http\JsonResponse;

class SubSectionCategoryController extends Controller
{
    public static function getSubSectionCategories(): JsonResponse
    {
        $categories = SubSectionCategory::all();
        return response()->json([
            'status' => 200,
            'message' => 'Sub-section category list',
            'categories' => $categories,
        ]);
    }
}

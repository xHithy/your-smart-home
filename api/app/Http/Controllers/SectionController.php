<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class SectionController extends Controller
{
    public static function getSections(): JsonResponse
    {
        $sections = Section::with('subSections')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 200,
            'message' => 'Section list',
            'sections' => $sections,
        ]);
    }

    public static function createSection(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'name' => 'required|string|min:2|max:55',
            'color' => 'required|string',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $newSection = Section::create([
            'name' => request('name'),
            'color' => request('color'),
        ]);

        $newSectionData = Section::where('id', $newSection->id)->with('subsections')->first();

        return response()->json([
            'status' => 201,
            'message' => 'Section successfully created',
            'section' => $newSectionData,
        ], 201);
    }

    public static function editSection(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'id' => 'required|integer|exists:sections,id',
            'name' => 'required|min:2|max:55|string',
            'color' => 'required|string',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        Section::where('id', request('id'))->update([
            'name' => request('name'),
            'color' => request('color'),
        ]);

        $editedSection = Section::with('subSections')->find(request('id'));

        return response()->json([
            'status' => 201,
            'message' => 'Section successfully updated',
            'section' => $editedSection,
        ], 201);
    }

    public static function deleteSection($id): JsonResponse
    {
        $validation = Validator::make(['id' => $id], [
            'id' => 'required|exists:sections,id|integer',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        Section::where('id', $id)->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Section successfully deleted',
        ]);
    }
}

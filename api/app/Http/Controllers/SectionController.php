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

    public static function getSingleSection($id): JsonResponse
    {
        $section = Section::where('id', $id)->with('subSections.category')->first();

        if(!$section) {
            return response()->json([
                'status' => 404,
                'message' => 'Section not found',
            ]);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Section found',
            'section' => $section,
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

        $newSectionData = Section::where('id', $newSection->id)->with('subSections')->first();

        self::createLog('A new section ('.$newSection->name.') has been created');

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

        $section = Section::where('id', request('id'))->first();

        Section::where('id', request('id'))->update([
            'name' => request('name'),
            'color' => request('color'),
        ]);

        $editedSection = Section::where('id', request('id'))->with('subSections')->first();

        self::createLog('The section ('.$section->name.') has been updated to ('.$editedSection->name.')');

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

        $section = Section::where('id', $id)->first();

        Section::where('id', $id)->delete();

        self::createLog('The section ('.$section->name.') has been deleted');

        return response()->json([
            'status' => 200,
            'message' => 'Section successfully deleted',
        ]);
    }
}

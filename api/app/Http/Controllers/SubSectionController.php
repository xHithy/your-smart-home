<?php

namespace App\Http\Controllers;

use App\Models\SubSection;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class SubSectionController extends Controller
{
    public static function getSubsections(): JsonResponse
    {
        $subsections = SubSection::get();

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
            'category_id' => 'required|integer|exists:subsectioncategories,id',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $newSubsection = SubSection::create([
            'name' => request('name'),
            'section_id' => request('section_id'),
            'category_id' => request('category_id'),
        ]);

        return response()->json([
            'status' => 201,
            'message' => 'Subsection successfully created',
            'subsection' => $newSubsection,
        ], 201);
    }

    public static function editSubsection(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'id' => 'required|exists:subsections,id|integer',
            'name' => 'required|string|min:2|max:55',
            'category_id' => 'required|integer|exists:sub_section_categories,id',
        ]);

        if($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        $editedSubsection = SubSection::where('id', request('id'))->update([
            'name' => request('name'),
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
}

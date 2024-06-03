<?php

namespace App\Http\Controllers;

use App\Models\Token;
use App\Models\User;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public static function login(): JsonResponse
    {
        $validation = Validator::make(request()->all(), [
            'username' => 'required|exists:users,username|max:20|min:3|string',
            'password' => 'required|string',
        ]);

        if ($validation->fails()) {
            return self::incorrectPayloadFormatResponse($validation->errors());
        }

        // Validate if password belongs to user;
        $username = request('username');
        $password = request('password');

        $user = User::where('username', $username)->first();
        $passwordMatches = Hash::check($password, $user->password);

        if(!$passwordMatches) {
            return self::incorrectPayloadFormatResponse([
                'password' => ['Incorrect password'],
            ]);
        }

        $token = Token::create([
            'token' => Str::random(30),
            'user_id' => $user->id,
            'last_used' => time(),
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Logged in successfully',
            'token' => $token,
        ]);

    }

    public static function logout(): JsonResponse
    {
        $token = request()->bearerToken();

        Token::where('token', $token)->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Logout successful',
        ]);
    }

    public static function pingToken()
    {

    }
}

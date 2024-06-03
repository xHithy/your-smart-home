<?php

namespace App\Http\Middleware;

use App\Models\Token;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TokenVerification
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        // Check if token exists
        $tokenData = Token::where('token', $token)->first();
        if (!$tokenData) {
            return response()->json([
                'status' => 401,
                'message' => 'Token invalid',
            ], 401);
        }

        // Check if token is expired (Last used more than a day ago)
        $lastUsed = $tokenData->last_used;
        $now = time();

        if (($now - $lastUsed) > 86400) { // 86400 seconds = 24 hours
            return response()->json([
                'status' => 401,
                'message' => 'Token expired',
            ], 401);
        }

        // Update last used if the token is valid
        $tokenData->update([
            'last_used' => $now,
        ]);

        return $next($request);
    }
}

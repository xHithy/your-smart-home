<?php

namespace Tests\Feature;

use App\Models\Token;
use App\Models\User;
use Hash;
use Illuminate\Support\Str;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Run the database migrations
        $this->artisan('migrate');

        // Create user to test login functionality
        $this->user = User::create([
            'username' => 'TestUser123',
            'password' => Hash::make('testpassword123!'),
        ]);

        // Create token for the test user
        $this->token = Token::create([
            'user_id' => $this->user->id,
            'token' => Str::random(30),
            'last_used' => time(),
        ]);
    }

    public function getAuthHeaders(): array
    {
        return ['Authorization' => "Bearer {$this->token->token}"];
    }

    public function testLoginUser()
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'username' => 'TestUser123',
            'password' => 'testpassword123!',
        ]);

        $response->assertStatus(200);
    }

    public function testCatchIncorrectLoginDetails()
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'username' => 'TestUser123!!!!!!',
            'password' => 'testpassword123!ssss',
        ]);

        $response->assertJsonFragment([
            'status' => 422,
        ]);
    }

    public function testLogoutUser()
    {
        $response = $this->postJson('/api/v1/auth/logout', [], $this->getAuthHeaders());

        $response->assertStatus(200);
    }

    public function testTokenVerifyPingWithCorrectToken()
    {
        $response = $this->postJson('/api/v1/auth/ping-token', [], $this->getAuthHeaders());

        $response->assertStatus(200);
    }

    public function testTokenVerificationFailWithIncorrectToken()
    {
        $response = $this->postJson('/api/v1/auth/ping-token', [], ['Authorization' => 'Bearer incorrect_token']);

        $response->assertStatus(401);
    }
}

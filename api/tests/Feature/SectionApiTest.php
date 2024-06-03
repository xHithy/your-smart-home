<?php

namespace Tests\Feature;

use App\Models\Sensor;
use App\Models\Token;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tests\TestCase;

class SectionApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Run the database migrations and seeders
        $this->artisan('migrate');
        $this->artisan('db:seed');

        $this->user = User::create([
            'username' => 'TestUser123',
            'password' => Hash::make('testpassword123!'),
        ]);

        $this->token = Token::create([
            'user_id' => $this->user->id,
            'token' => Str::random(30),
            'last_used' => time(),
        ]);

        // Create a sensor for testing
        $this->sensor = Sensor::create([
            'sensor_name' => 'Temperature and Humidity sensor #1',
            'sensor_token' => 'cxfXAK0cyoIHQQWxa676AkhSDe4xGw',
            'sub_section_id' => 0,
            'authorized' => false,
            'last_auth_attempt' => time(),
            'last_data_update' => null,
        ]);
    }

    public function getAuthHeaders(): array
    {
        return ['Authorization' => "Bearer {$this->token->token}"];
    }

    public function getInvalidAuthHeaders(): array
    {
        return ['Authorization' => 'Bearer invalid_token'];
    }

    public function testGetSectionsWithValidToken()
    {
        $response = $this->getJson('/api/v1/section', $this->getAuthHeaders());

        $response->assertStatus(200);
    }

    public function testDenyAccessToGetSectionsWithInvalidToken()
    {
        $response = $this->getJson('/api/v1/section', $this->getInvalidAuthHeaders());

        $response->assertStatus(401);
    }

    public function testGetSingleSectionByIdWithValidToken()
    {
        $response = $this->getJson('/api/v1/section/1', $this->getAuthHeaders());

        $response->assertStatus(200);
    }

    public function testDenyAccessToGetSingleSectionByIdWithInvalidToken()
    {
        $response = $this->getJson('/api/v1/section/1', $this->getInvalidAuthHeaders());

        $response->assertStatus(401);
    }

    public function testCatchGetSingleSectionWithInvalidIdError()
    {
        $response = $this->getJson('/api/v1/section/666', $this->getAuthHeaders());

        $response->assertJsonFragment([
            'status' => 404,
        ]);
    }

    public function testCreateSectionWithValidToken()
    {
        $response = $this->postJson('/api/v1/section/create', [
            'name' => 'Testtttt',
            'color' => '000000',
        ], $this->getAuthHeaders());

        $response->assertStatus(201);
    }

    public function testEditSectionWithValidToken()
    {
        $response = $this->postJson('/api/v1/section/edit', [
            'id' => 1,
            'name' => 'Testtttt',
            'color' => '000000',
        ], $this->getAuthHeaders());

        $response->assertStatus(200);
    }

    public function testDenyAccessToEditSectionWithInvalidToken()
    {
        $response = $this->postJson('/api/v1/section/edit', [
            'id' => 1,
            'name' => 'Testtttt',
            'color' => '000000',
        ], $this->getInvalidAuthHeaders());

        $response->assertStatus(401);
    }

    public function testDeleteSectionWithValidToken()
    {
        $response = $this->deleteJson('/api/v1/section/delete/1', [], $this->getAuthHeaders());

        $response->assertStatus(200);
    }

    public function testUnableToDeleteSectionWithInvalidSectionId()
    {
        $response = $this->deleteJson('/api/v1/section/delete/666', [], $this->getAuthHeaders());

        $response->assertJsonFragment([
            'status' => 422,
        ]);
    }
}

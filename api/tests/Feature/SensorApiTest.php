<?php

namespace Tests\Feature;

use App\Models\Sensor;
use App\Models\SubSection;
use App\Models\Section;
use App\Models\User;
use App\Models\Token;
use App\Models\SubSectionCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tests\TestCase;

class SensorApiTest extends TestCase
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

        $this->section = Section::create([
            'name' => 'First Floor',
            'color' => '#000000',
        ]);

        // Retrieve the first category from the seeded data
        $category = SubSectionCategory::firstOrFail();

        // Create a subsection for testing
        $this->subSection = SubSection::create([
            'name' => 'Kitchen',
            'section_id' => $this->section->id,
            'category_id' => $category->id,
            'pinned' => false,
        ]);

        // Create a sensor for testing
        $this->sensor = Sensor::create([
            'sensor_name' => 'Temperature and Humidity sensor #1',
            'sensor_token' => 'cxfXAK0cyoIHQQWxa676AkhSDe4xGw',
            'sub_section_id' => $this->subSection->id,
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

    public function testGetSensorsWithValidToken()
    {
        $response = $this->getJson('/api/v1/sensor', $this->getAuthHeaders());

        $response->assertStatus(200);
    }

    public function testDenyAccessToGetSensorsWithInvalidToken()
    {
        $response = $this->getJson('/api/v1/sensor', $this->getInvalidAuthHeaders());

        $response->assertStatus(401);
    }

    public function testGetUnassignedSensorsWithValidToken()
    {
        $response = $this->getJson('/api/v1/sensor/unassigned', $this->getAuthHeaders());

        $response->assertStatus(200);
    }

    public function testDenyAccessToGetUnassignedSensorsWithInvalidToken()
    {
        $response = $this->getJson('/api/v1/sensor/unassigned', $this->getInvalidAuthHeaders());

        $response->assertStatus(401);
    }

    public function testGetSensorBySubsectionWithValidToken()
    {
        $response = $this->getJson('/api/v1/sensor/' . $this->subSection->id, $this->getAuthHeaders());

        $response->assertStatus(200);
    }

    public function testDenyAccessToGetSensorBySubsectionWithInvalidToken()
    {
        $response = $this->getJson('/api/v1/sensor/' . $this->subSection->id, $this->getInvalidAuthHeaders());

        $response->assertStatus(401);
    }

    public function testAttemptHandshake()
    {
        $response = $this->postJson('/api/v1/sensor/handshake', [
            'sensor_name' => 'Test Sensor',
            'sensor_token' => Str::random(30),
        ]);

        $response->assertStatus(201);
    }

    public function testAcceptHandshakeWithValidToken()
    {
        $response = $this->postJson('/api/v1/sensor/authorize', [
            'sensor_token' => $this->sensor->sensor_token,
        ], $this->getAuthHeaders());

        $response->assertStatus(201);
    }

    public function testDenyAccessToAcceptHandshakeWithInvalidToken()
    {
        $response = $this->postJson('/api/v1/sensor/authorize', [
            'sensor_token' => $this->sensor->sensor_token,
        ], $this->getInvalidAuthHeaders());

        $response->assertStatus(401);
    }

    public function testSendSensorDataWithAuthorizedSensor()
    {
        $response = $this->postJson('/api/v1/sensor/data', [
            'sensor_token' => $this->sensor->sensor_token,
            'temperature' => '25.5',
            'humidity' => '60.5',
        ]);

        $response->assertStatus(201);
    }

    public function testDenyAccessToSendSensorDataWithUnauthorizedSensor()
    {
        $response = $this->postJson('/api/v1/sensor/data', [
            'sensor_token' => 'unauthorized_sensor_token',
            'temperature' => '25.5',
            'humidity' => '60.5',
        ]);

        $response->assertJsonFragment([
            'status' => 422,
        ]);
    }

    public function testEditSensorWithValidToken()
    {
        $response = $this->putJson('/api/v1/sensor/edit', [
            'id' => $this->sensor->id,
            'sensor_name' => 'Updated Sensor Name',
            'sub_section_id' => $this->subSection->id,
        ], $this->getAuthHeaders());

        $response->assertStatus(201);
    }

    public function testDenyAccessToEditSensorWithInvalidToken()
    {
        $response = $this->putJson('/api/v1/sensor/edit', [
            'id' => $this->sensor->id,
            'sensor_name' => 'Updated Sensor Name',
            'sub_section_id' => $this->subSection->id,
        ], $this->getInvalidAuthHeaders());

        $response->assertStatus(401);
    }

    public function testDeleteSensorWithValidToken()
    {
        $response = $this->deleteJson('/api/v1/sensor/' . $this->sensor->sensor_token, [], $this->getAuthHeaders());

        $response->assertStatus(200);
    }

    public function testDenyAccessToDeleteSensorWithInvalidToken()
    {
        $response = $this->deleteJson('/api/v1/sensor/' . $this->sensor->sensor_token, [], $this->getInvalidAuthHeaders());

        $response->assertStatus(401);
    }
}

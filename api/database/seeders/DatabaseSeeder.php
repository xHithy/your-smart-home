<?php

namespace Database\Seeders;

use App\Models\SubSectionCategory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create base sub-section categories
        SubSectionCategory::factory()->create([
            'name' => 'Living Room',
            'image_path' => '/storage/categories/livingroom.jpg',
        ]);
        SubSectionCategory::factory()->create([
            'name' => 'Bathroom',
            'image_path' => '/storage/categories/bathroom.jpg',
        ]);
        SubSectionCategory::factory()->create([
            'name' => 'Bedroom',
            'image_path' => '/storage/categories/bedroom.jpg',
        ]);
        SubSectionCategory::factory()->create([
            'name' => 'Pantry',
            'image_path' => '/storage/categories/pantry.jpg',
        ]);
        SubSectionCategory::factory()->create([
            'name' => 'Kitchen',
            'image_path' => '/storage/categories/kitchen.jpg',
        ]);
        SubSectionCategory::factory()->create([
            'name' => 'Garage',
            'image_path' => '/storage/categories/garage.jpg',
        ]);
        SubSectionCategory::factory()->create([
            'name' => 'Storage',
            'image_path' => '/storage/categories/storage.jpg',
        ]);
        SubSectionCategory::factory()->create([
            'name' => 'Dining room',
            'image_path' => '/storage/categories/diningroom.jpg',
        ]);
        SubSectionCategory::factory()->create([
            'name' => 'Office',
            'image_path' => '/storage/categories/office.jpg',
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\SubSectionCategory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create base sub-section categories
        SubSectionCategory::create([
            'name' => 'Living Room',
            'image_path' => '/storage/public/categories/livingroom.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Bathroom',
            'image_path' => '/storage/public/categories/bathroom.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Bedroom',
            'image_path' => '/storage/public/categories/bedroom.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Pantry',
            'image_path' => '/storage/public/categories/pantry.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Kitchen',
            'image_path' => '/storage/public/categories/kitchen.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Garage',
            'image_path' => '/storage/public/categories/garage.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Storage',
            'image_path' => '/storage/public/categories/storage.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Dining room',
            'image_path' => '/storage/public/categories/diningroom.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Office',
            'image_path' => '/storage/public/categories/office.jpg',
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\SubSectionCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create default user
        User::create([
            'username' => 'TestUser123',
            'password' => Hash::make('PareizaParole123!'),
        ]);

        // Create base sub-section categories
        SubSectionCategory::create([
            'name' => 'Living Room',
            'image_path' => '/storage/categories/livingroom.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Bathroom',
            'image_path' => '/storage/categories/bathroom.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Bedroom',
            'image_path' => '/storage/categories/bedroom.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Pantry',
            'image_path' => '/storage/categories/pantry.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Kitchen',
            'image_path' => '/storage/categories/kitchen.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Garage',
            'image_path' => '/storage/categories/garage.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Storage',
            'image_path' => '/storage/categories/storage.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Dining room',
            'image_path' => '/storage/categories/diningroom.jpg',
        ]);
        SubSectionCategory::create([
            'name' => 'Office',
            'image_path' => '/storage/categories/office.jpg',
        ]);
    }
}

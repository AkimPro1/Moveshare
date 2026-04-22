<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@moveshare.com'],
            [
                'name' => 'Admin MoveShare',
                'phone' => '00000000',
                'role' => 'driver',
                'password' => Hash::make('Admin123!'),
                'is_admin' => true,
                'city' => 'Paris'
            ]
        );
    }
}

<?php

require __DIR__ . '/vendor/autoload.php';

$app = require __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use App\Models\Vehicle;
use App\Models\Ride;

// Create or get admin user
$admin = User::firstOrCreate(
    ['email' => 'admin@test.com'],
    [
        'name' => 'Admin User',
        'phone' => '0123456789',
        'role' => 'driver',
        'password' => bcrypt('Password123!'),
        'is_admin' => true,
    ]
);

// Create driver user
$driver = User::firstOrCreate(
    ['email' => 'driver@test.com'],
    [
        'name' => 'Test Driver',
        'phone' => '0987654321',
        'role' => 'driver',
        'password' => bcrypt('Password123!'),
    ]
);

// Create vehicle for driver
$vehicle = Vehicle::firstOrCreate(
    ['license_plate' => 'ABC123'],
    [
        'user_id' => $driver->id,
        'brand' => 'Toyota',
        'model' => 'Prius',
        'year' => 2024,
        'color' => 'White',
        'seats' => 4,
        'vehicle_type' => 'car',
        'verification_status' => 'verified',
    ]
);

// Create rides
Ride::firstOrCreate(
    ['id' => 1],
    [
        'user_id' => $driver->id,
        'car_id' => $vehicle->id,
        'start_location' => 'Paris',
        'start_lat' => 48.8566,
        'start_lng' => 2.3522,
        'end_location' => 'Lyon',
        'end_lat' => 45.7640,
        'end_lng' => 4.8357,
        'ride_date' => now()->addDay(),
        'ride_time' => '10:00:00',
        'price_per_seat' => 45.50,
        'available_seats' => 2,
        'total_seats' => 4,
        'status' => 'active',
    ]
);

Ride::firstOrCreate(
    ['id' => 2],
    [
        'user_id' => $driver->id,
        'car_id' => $vehicle->id,
        'start_location' => 'Marseille',
        'start_lat' => 43.2965,
        'start_lng' => 5.3698,
        'end_location' => 'Nice',
        'end_lat' => 43.7102,
        'end_lng' => 7.2620,
        'ride_date' => now()->addDays(2),
        'ride_time' => '14:30:00',
        'price_per_seat' => 35.00,
        'available_seats' => 1,
        'total_seats' => 4,
        'status' => 'active',
    ]
);

echo "✓ Test data seeded successfully!\n";
echo "Admin token: " . $admin->createToken('test')->plainTextToken . "\n";
?>

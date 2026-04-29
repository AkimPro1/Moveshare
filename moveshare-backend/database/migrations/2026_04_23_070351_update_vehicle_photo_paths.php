<?php

use Illuminate\Database\Migrations\Migration;
use App\Models\Vehicle;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update all vehicle photos to use /api/files/ instead of /storage/
        Vehicle::all()->each(function ($vehicle) {
            if ($vehicle->photos && is_array($vehicle->photos)) {
                $updated_photos = array_map(function ($photo) {
                    // Replace /storage/ with /api/files/
                    return str_replace('/storage/', '/api/files/', $photo);
                }, $vehicle->photos);
                
                if ($updated_photos !== $vehicle->photos) {
                    $vehicle->update(['photos' => $updated_photos]);
                }
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverse: convert /api/files/ back to /storage/
        Vehicle::all()->each(function ($vehicle) {
            if ($vehicle->photos && is_array($vehicle->photos)) {
                $updated_photos = array_map(function ($photo) {
                    // Replace /api/files/ with /storage/
                    return str_replace('/api/files/', '/storage/', $photo);
                }, $vehicle->photos);
                
                if ($updated_photos !== $vehicle->photos) {
                    $vehicle->update(['photos' => $updated_photos]);
                }
            }
        });
    }
};



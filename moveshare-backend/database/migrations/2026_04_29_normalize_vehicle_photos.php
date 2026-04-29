<?php

use Illuminate\Database\Migrations\Migration;
use App\Models\Vehicle;

return new class extends Migration
{
    /**
     * Normalize vehicle photos to ensure they are always properly stored arrays of paths
     */
    public function up(): void
    {
        Vehicle::all()->each(function ($vehicle) {
            $normalized_photos = [];
            
            // Ensure photos is always an array
            $photos = $vehicle->photos;
            
            if (empty($photos)) {
                // No photos - set to empty array
                $normalized_photos = [];
            } elseif (is_array($photos)) {
                // Already array - normalize each path
                foreach ($photos as $photo) {
                    if (is_string($photo) && !empty($photo)) {
                        // Normalize path: should start with /api/files/vehicles/
                        $photo = trim($photo);
                        
                        // Remove any double slashes except protocol
                        $photo = preg_replace('#([^:]\/)\/+#', '$1', $photo);
                        
                        // Ensure it starts with /api/files/vehicles/
                        if (!str_starts_with($photo, '/api/files/')) {
                            $photo = '/api/files/' . ltrim($photo, '/');
                        }
                        
                        $normalized_photos[] = $photo;
                    }
                }
            } elseif (is_string($photos)) {
                // String - try to use as single photo path
                $photo = trim($photos);
                if (!empty($photo)) {
                    if (!str_starts_with($photo, '/api/files/')) {
                        $photo = '/api/files/' . ltrim($photo, '/');
                    }
                    $normalized_photos[] = $photo;
                }
            }
            
            // Update if changed
            if (json_encode($normalized_photos) !== json_encode($vehicle->photos)) {
                $vehicle->update(['photos' => $normalized_photos]);
                echo "Vehicle {$vehicle->id}: Photos normalized\n";
            }
        });
    }

    /**
     * Rollback
     */
    public function down(): void
    {
        // No rollback needed - this is a data cleanup migration
    }
};

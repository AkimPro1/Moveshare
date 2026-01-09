<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TrackingController extends Controller
{
    /**
     * Get current ride tracking information
     */
    public function getRideTracking(Request $request, Ride $ride): JsonResponse
    {
        // Check if user is driver, passenger, or admin
        $user = auth()->user();
        
        $isDriver = $ride->user_id === $user->id;
        $isPassenger = $ride->bookings()
            ->where('user_id', $user->id)
            ->where('status', 'confirmed')
            ->exists();

        if (!$isDriver && !$isPassenger) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Get current tracking data
        $tracking = [
            'ride_id' => $ride->id,
            'current_position' => [
                'lat' => $ride->current_latitude ?? $ride->start_lat,
                'lng' => $ride->current_longitude ?? $ride->start_lng,
                'timestamp' => $ride->position_updated_at?->timestamp ?? now()->timestamp
            ],
            'eta' => $this->calculateETA($ride),
            'distance_remaining' => $this->calculateDistance($ride)
        ];

        return response()->json($tracking, 200);
    }

    /**
     * Update driver's current position
     */
    public function updatePosition(Request $request, Ride $ride): JsonResponse
    {
        // Verify user is the driver
        if ($ride->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'speed' => 'nullable|numeric|min:0',
            'heading' => 'nullable|numeric|between:0,360'
        ]);

        $ride->update([
            'current_latitude' => $validated['latitude'],
            'current_longitude' => $validated['longitude'],
            'current_speed' => $validated['speed'] ?? null,
            'current_heading' => $validated['heading'] ?? null,
            'position_updated_at' => now()
        ]);

        // Broadcast position update via WebSocket or queue
        broadcast(new \App\Events\RidePositionUpdated($ride))->toOthers();

        return response()->json([
            'message' => 'Position updated',
            'ride' => $ride
        ], 200);
    }

    /**
     * Calculate ETA in seconds
     */
    private function calculateETA(Ride $ride): int
    {
        // Simplified calculation - in production, use actual routing API
        $distance = $this->calculateDistance($ride);
        $averageSpeed = 50; // km/h
        
        if ($distance <= 0) return 0;
        
        return (int)($distance / $averageSpeed * 3600); // Convert to seconds
    }

    /**
     * Calculate remaining distance in km
     */
    private function calculateDistance(Ride $ride): float
    {
        $currentLat = $ride->current_latitude ?? $ride->start_lat;
        $currentLng = $ride->current_longitude ?? $ride->start_lng;
        $destLat = $ride->end_lat;
        $destLng = $ride->end_lng;

        return $this->haversineDistance(
            $currentLat, $currentLng,
            $destLat, $destLng
        );
    }

    /**
     * Calculate distance between two coordinates using Haversine formula
     */
    private function haversineDistance($lat1, $lon1, $lat2, $lon2): float
    {
        $earthRadius = 6371; // Km

        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($dLon / 2) * sin($dLon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }

    /**
     * Get ride history
     */
    public function getRideHistory(Request $request): JsonResponse
    {
        $rides = auth()->user()
            ->rides()
            ->where('status', 'completed')
            ->with(['bookings', 'vehicle'])
            ->latest('ride_date')
            ->paginate(20);

        return response()->json($rides, 200);
    }
}

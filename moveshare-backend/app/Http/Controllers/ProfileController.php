<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Get the authenticated user's profile.
     */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();
        
        // Try to load relationships safely
        try {
            $user->load([
                'vehicles',
                'rides' => function($query) {
                    $query->latest()->take(5);
                },
                'bookings' => function($query) {
                    $query->with('ride')->latest()->take(5);
                },
                'reviewsReceived' => function($query) {
                    $query->with('reviewer')->latest()->take(10);
                }
            ]);

            // Calculate stats
            $totalRidesAsDriver = $user->rides()->count();
            $totalBookingsAsPassenger = $user->bookings()->count();
            $completedRides = $user->rides()->where('status', 'completed')->count();
        } catch (\Exception $e) {
            // If tables don't exist yet, use default values
            $totalRidesAsDriver = 0;
            $totalBookingsAsPassenger = 0;
            $completedRides = 0;
        }

        return response()->json([
            'user' => $user,
            'stats' => [
                'total_rides_as_driver' => $totalRidesAsDriver,
                'total_bookings_as_passenger' => $totalBookingsAsPassenger,
                'completed_rides' => $completedRides,
            ],
        ]);
    }

    /**
     * Get a specific user's profile (public view).
     */
    public function showUser(int $userId): JsonResponse
    {
        $user = \App\Models\User::findOrFail($userId);
        
        $user->load([
            'reviewsReceived' => function($query) {
                $query->with('reviewer')->latest()->take(10);
            }
        ]);

        $totalRidesAsDriver = $user->rides()->count();
        $completedRides = $user->rides()->where('status', 'completed')->count();

        return response()->json([
            'user' => $user->only([
                'id', 'name', 'profile_photo', 'bio', 'city', 
                'average_rating', 'total_reviews', 'created_at'
            ]),
            'reviews' => $user->reviewsReceived,
            'stats' => [
                'total_rides_as_driver' => $totalRidesAsDriver,
                'completed_rides' => $completedRides,
            ],
        ]);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'phone' => ['sometimes', 'nullable', 'string', 'max:20'],
            'bio' => ['sometimes', 'nullable', 'string', 'max:500'],
            'city' => ['sometimes', 'nullable', 'string', 'max:100'],
            'profile_photo' => ['sometimes', 'nullable', 'image', 'max:2048'], // 2MB max
        ]);

        // Handle profile photo upload
        if ($request->hasFile('profile_photo')) {
            // Delete old photo if exists
            if ($user->profile_photo) {
                Storage::disk('public')->delete($user->profile_photo);
            }

            $path = $request->file('profile_photo')->store('profile-photos', 'public');
            $data['profile_photo'] = $path;
        }

        $user->update($data);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }
}
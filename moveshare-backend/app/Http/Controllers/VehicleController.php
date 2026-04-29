<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class VehicleController extends Controller
{
    /**
     * Display a listing of the user's vehicles.
     */
    public function index(Request $request): JsonResponse
    {
        $vehicles = $request->user()->vehicles()->latest()->get();
        return response()->json($vehicles);
    }

    /**
     * Store a newly created vehicle.
     */
    public function store(Request $request): JsonResponse
    {
        // Only drivers can create vehicles
        if ($request->user()->role !== 'driver') {
            return response()->json(['message' => 'Unauthorized: Only drivers can create vehicles'], 403);
        }

        $data = $request->validate([
            'brand' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],
            'color' => ['required', 'string', 'max:255'],
            'license_plate' => ['required', 'string', 'max:255', 'unique:vehicles'],
            'seats' => ['required', 'integer', 'min:1', 'max:9'],
            'vehicle_type' => ['required', 'in:car,van,suv'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['image', 'max:5120'], // 5MB max per image
        ]);

        // Handle photo uploads
        $photoPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('vehicles', 'public');
                // Store as: /api/files/vehicles/filename
                $photoPaths[] = '/api/files/' . $path;
            }
        }

        $vehicle = $request->user()->vehicles()->create([
            'brand' => $data['brand'],
            'model' => $data['model'],
            'year' => $data['year'],
            'color' => $data['color'],
            'license_plate' => $data['license_plate'],
            'seats' => $data['seats'],
            'vehicle_type' => $data['vehicle_type'],
            'photos' => $photoPaths,
            'verification_status' => 'pending',
        ]);

        return response()->json($vehicle, 201);
    }

    /**
     * Display the specified vehicle.
     */
    public function show(Request $request, Vehicle $vehicle): JsonResponse
    {
        // Ensure user owns this vehicle
        if ($vehicle->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($vehicle);
    }

    /**
     * Update the specified vehicle.
     */
    public function update(Request $request, Vehicle $vehicle): JsonResponse
    {
        // Only drivers can update vehicles
        if ($request->user()->role !== 'driver') {
            return response()->json(['message' => 'Unauthorized: Only drivers can update vehicles'], 403);
        }

        // Ensure user owns this vehicle
        if ($vehicle->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'brand' => ['sometimes', 'string', 'max:255'],
            'model' => ['sometimes', 'string', 'max:255'],
            'year' => ['sometimes', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],
            'color' => ['sometimes', 'string', 'max:255'],
            'license_plate' => ['sometimes', 'string', 'max:255', 'unique:vehicles,license_plate,' . $vehicle->id],
            'seats' => ['sometimes', 'integer', 'min:1', 'max:9'],
            'vehicle_type' => ['sometimes', 'in:car,van,suv'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['image', 'max:5120'],
        ]);

        // Handle photo uploads - only if new photos provided
        if ($request->hasFile('photos')) {
            $photoPaths = [];
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('vehicles', 'public');
                $photoPaths[] = '/api/files/' . $path;
            }
            $data['photos'] = $photoPaths;
        }

        $data['verification_status'] = 'pending';

        $vehicle->update($data);

        return response()->json($vehicle);
    }

    /**
     * Remove the specified vehicle.
     */
    public function destroy(Request $request, Vehicle $vehicle): JsonResponse
    {
        // Only drivers can delete vehicles
        if ($request->user()->role !== 'driver') {
            return response()->json(['message' => 'Unauthorized: Only drivers can delete vehicles'], 403);
        }

        // Ensure user owns this vehicle
        if ($vehicle->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Check if vehicle has active rides
        $hasActiveRides = $vehicle->rides()
            ->where('status', 'active')
            ->where('ride_date', '>=', now())
            ->exists();

        if ($hasActiveRides) {
            return response()->json([
                'message' => 'Cannot delete vehicle with active rides'
            ], 422);
        }

        $vehicle->delete();

        return response()->json(['message' => 'Vehicle deleted successfully']);
    }
}
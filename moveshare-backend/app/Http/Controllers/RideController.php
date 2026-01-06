<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use App\Models\Vehicle;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class RideController extends Controller
{
    /**
     * Display a listing of available rides.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Ride::with(['user', 'vehicle'])
            ->where('status', 'active')
            ->where('ride_date', '>=', now()->toDateString())
            ->where('available_seats', '>', 0);

        // Search by location
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('start_location', 'like', "%{$search}%")
                  ->orWhere('end_location', 'like', "%{$search}%");
            });
        }

        // Filter by date
        if ($request->has('date')) {
            $query->whereDate('ride_date', $request->date);
        }

        // Filter by price range
        if ($request->has('min_price')) {
            $query->where('price_per_seat', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price_per_seat', '<=', $request->max_price);
        }

        // Filter by minimum seats
        if ($request->has('min_seats')) {
            $query->where('available_seats', '>=', $request->min_seats);
        }

        $rides = $query->latest('ride_date')->get();

        // Format response
        $rides = $rides->map(function ($ride) {
            return [
                'id' => $ride->id,
                'user_id' => $ride->user_id,
                'car_id' => $ride->car_id,
                'start_location' => $ride->start_location,
                'end_location' => $ride->end_location,
                'ride_date' => $ride->ride_date->format('Y-m-d'),
                'ride_time' => $ride->ride_time,
                'price_per_seat' => (float) $ride->price_per_seat,
                'available_seats' => $ride->available_seats,
                'total_seats' => $ride->total_seats,
                'status' => $ride->status,
                'driver' => [
                    'id' => $ride->user->id,
                    'name' => $ride->user->name,
                    'email' => $ride->user->email,
                ],
                'vehicle' => [
                    'brand' => $ride->vehicle->brand,
                    'model' => $ride->vehicle->model,
                    'color' => $ride->vehicle->color,
                    'license_plate' => $ride->vehicle->license_plate,
                ],
                'created_at' => $ride->created_at->toISOString(),
            ];
        });

        return response()->json($rides);
    }

    /**
     * Store a newly created ride.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'car_id' => ['required', 'exists:vehicles,id'],
            'start_location' => ['required', 'string', 'max:255'],
            'end_location' => ['required', 'string', 'max:255'],
            'ride_date' => ['required', 'date', 'after_or_equal:today'],
            'ride_time' => ['required', 'date_format:H:i'],
            'price_per_seat' => ['required', 'numeric', 'min:0'],
            'available_seats' => ['required', 'integer', 'min:1'],
        ]);

        // Verify vehicle belongs to user
        $vehicle = Vehicle::findOrFail($data['car_id']);
        if ($vehicle->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Verify available seats don't exceed vehicle capacity
        if ($data['available_seats'] > $vehicle->seats) {
            return response()->json([
                'message' => 'Available seats cannot exceed vehicle capacity'
            ], 422);
        }

        $ride = $request->user()->rides()->create([
            'car_id' => $data['car_id'],
            'start_location' => $data['start_location'],
            'end_location' => $data['end_location'],
            'ride_date' => $data['ride_date'],
            'ride_time' => $data['ride_time'],
            'price_per_seat' => $data['price_per_seat'],
            'available_seats' => $data['available_seats'],
            'total_seats' => $data['available_seats'],
            'status' => 'active',
        ]);

        return response()->json($ride, 201);
    }

    /**
     * Display the specified ride with full details.
     */
    public function show(Ride $ride): JsonResponse
    {
        $ride->load([
            'user.reviewsReceived' => function($query) {
                $query->latest()->take(5);
            },
            'vehicle',
            'bookings.user'
        ]);

        return response()->json([
            'id' => $ride->id,
            'user_id' => $ride->user_id,
            'car_id' => $ride->car_id,
            'start_location' => $ride->start_location,
            'end_location' => $ride->end_location,
            'ride_date' => $ride->ride_date->format('Y-m-d'),
            'ride_time' => $ride->ride_time,
            'price_per_seat' => (float) $ride->price_per_seat,
            'available_seats' => $ride->available_seats,
            'total_seats' => $ride->total_seats,
            'status' => $ride->status,
            'driver' => [
                'id' => $ride->user->id,
                'name' => $ride->user->name,
                'email' => $ride->user->email,
                'profile_photo' => $ride->user->profile_photo,
                'bio' => $ride->user->bio,
                'city' => $ride->user->city,
                'average_rating' => (float) $ride->user->average_rating,
                'total_reviews' => $ride->user->total_reviews,
            ],
            'vehicle' => [
                'id' => $ride->vehicle->id,
                'brand' => $ride->vehicle->brand,
                'model' => $ride->vehicle->model,
                'year' => $ride->vehicle->year,
                'color' => $ride->vehicle->color,
                'license_plate' => $ride->vehicle->license_plate,
                'seats' => $ride->vehicle->seats,
                'vehicle_type' => $ride->vehicle->vehicle_type,
                'photos' => $ride->vehicle->photos,
            ],
            'passengers' => $ride->bookings->map(function($booking) {
                return [
                    'id' => $booking->user->id,
                    'name' => $booking->user->name,
                    'seats_booked' => $booking->seats_booked,
                ];
            }),
            'created_at' => $ride->created_at->toISOString(),
        ]);
    }

    /**
     * Get rides created by authenticated user.
     */
    public function myRides(Request $request): JsonResponse
    {
        $rides = Ride::where('user_id', $request->user()->id)
            ->with(['vehicle', 'bookings.user'])
            ->latest('ride_date')
            ->get();

        $rides = $rides->map(function($ride) {
            return [
                'id' => $ride->id,
                'start_location' => $ride->start_location,
                'end_location' => $ride->end_location,
                'ride_date' => $ride->ride_date->format('Y-m-d'),
                'ride_time' => $ride->ride_time,
                'price_per_seat' => (float) $ride->price_per_seat,
                'available_seats' => $ride->available_seats,
                'total_seats' => $ride->total_seats,
                'status' => $ride->status,
                'vehicle' => [
                    'brand' => $ride->vehicle->brand,
                    'model' => $ride->vehicle->model,
                ],
                'passengers_count' => $ride->bookings->count(),
                'passengers' => $ride->bookings->map(fn($b) => [
                    'name' => $b->user->name,
                    'seats' => $b->seats_booked,
                ]),
                'created_at' => $ride->created_at->toISOString(),
            ];
        });

        return response()->json($rides);
    }

    /**
     * Get bookings made by authenticated user.
     */
    public function myBookings(Request $request): JsonResponse
    {
        $bookings = Booking::where('user_id', $request->user()->id)
            ->with(['ride.user', 'ride.vehicle'])
            ->latest()
            ->get();

        $bookings = $bookings->map(function($booking) {
            return [
                'id' => $booking->id,
                'seats_booked' => $booking->seats_booked,
                'status' => $booking->status,
                'ride' => [
                    'id' => $booking->ride->id,
                    'start_location' => $booking->ride->start_location,
                    'end_location' => $booking->ride->end_location,
                    'ride_date' => $booking->ride->ride_date->format('Y-m-d'),
                    'ride_time' => $booking->ride->ride_time,
                    'price_per_seat' => (float) $booking->ride->price_per_seat,
                    'status' => $booking->ride->status,
                    'driver' => [
                        'id' => $booking->ride->user->id,
                        'name' => $booking->ride->user->name,
                        'average_rating' => (float) $booking->ride->user->average_rating,
                    ],
                    'vehicle' => [
                        'brand' => $booking->ride->vehicle->brand,
                        'model' => $booking->ride->vehicle->model,
                    ],
                ],
                'created_at' => $booking->created_at->toISOString(),
            ];
        });

        return response()->json($bookings);
    }

    /**
     * Book a ride.
     */
    public function book(Request $request, Ride $ride): JsonResponse
    {
        $data = $request->validate([
            'seats_booked' => ['sometimes', 'integer', 'min:1'],
        ]);

        $seatsBooked = $data['seats_booked'] ?? 1;

        // Check if ride is available
        if ($ride->status !== 'active') {
            return response()->json(['message' => 'Ride is not available'], 422);
        }

        // Check if ride is in the future
        if ($ride->ride_date < now()->toDateString()) {
            return response()->json(['message' => 'Cannot book past rides'], 422);
        }

        // Check if user is not the driver
        if ($ride->user_id === $request->user()->id) {
            return response()->json(['message' => 'Cannot book your own ride'], 422);
        }

        // Check if user already booked this ride
        $existingBooking = Booking::where('ride_id', $ride->id)
            ->where('user_id', $request->user()->id)
            ->first();

        if ($existingBooking) {
            return response()->json(['message' => 'You have already booked this ride'], 422);
        }

        // Check if enough seats available
        if ($ride->available_seats < $seatsBooked) {
            return response()->json(['message' => 'Not enough seats available'], 422);
        }

        DB::beginTransaction();
        try {
            // Create booking
            $booking = Booking::create([
                'ride_id' => $ride->id,
                'user_id' => $request->user()->id,
                'seats_booked' => $seatsBooked,
                'status' => 'confirmed',
            ]);

            // Update available seats
            $ride->decrement('available_seats', $seatsBooked);

            DB::commit();

            return response()->json([
                'message' => 'Ride booked successfully',
                'booking' => $booking,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Booking failed'], 500);
        }
    }

    /**
     * Cancel a booking.
     */
    public function cancelBooking(Request $request, Ride $ride): JsonResponse
    {
        $booking = Booking::where('ride_id', $ride->id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        DB::beginTransaction();
        try {
            // Return seats to ride
            $ride->increment('available_seats', $booking->seats_booked);

            // Update booking status
            $booking->update(['status' => 'cancelled']);

            DB::commit();

            return response()->json(['message' => 'Booking cancelled successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Cancellation failed'], 500);
        }
    }
}
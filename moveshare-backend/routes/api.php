<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\RideController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TrackingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);

// Simple connectivity check for frontend/dev tooling
Route::get('/ping', function () {
	return response()->json(['status' => 'ok']);
});

// Serve uploaded files (images, documents) - PUBLIC
Route::get('/files/{path}', function ($path) {
	$full_path = storage_path('app/public/' . $path);
	
	if (!file_exists($full_path)) {
		return response()->json(['message' => 'File not found'], 404);
	}
	
	return response()->file($full_path);
})->where('path', '.*');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::get('/users/{userId}', [ProfileController::class, 'showUser']);
    
    // Vehicle routes
    Route::apiResource('vehicles', VehicleController::class);
    
    // Ride routes
    Route::get('/rides', [RideController::class, 'index']);
    Route::post('/rides', [RideController::class, 'store']);
    Route::get('/rides/{ride}', [RideController::class, 'show']);
    Route::post('/rides/{ride}/book', [RideController::class, 'book']);
    Route::post('/rides/{ride}/cancel', [RideController::class, 'cancelBooking']);
    Route::get('/my-rides', [RideController::class, 'myRides']);
    Route::get('/my-bookings', [RideController::class, 'myBookings']);
    
    // Review routes
    Route::get('/users/{userId}/reviews', [ReviewController::class, 'getUserReviews']);
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);
    
    // Payment routes
    Route::post('/payments/process', [PaymentController::class, 'processPayment']);
    Route::get('/payments/history', [PaymentController::class, 'getPaymentHistory']);
    Route::post('/payments/{booking}/cancel', [PaymentController::class, 'cancelPayment']);
    
    // Tracking routes
    Route::get('/rides/{ride}/tracking', [TrackingController::class, 'getRideTracking']);
    Route::post('/rides/{ride}/position', [TrackingController::class, 'updatePosition']);
    Route::get('/rides/history', [TrackingController::class, 'getRideHistory']);
});

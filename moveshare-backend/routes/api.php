<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\NotificationController;
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
    // Security check: prevent directory traversal
    if (str_contains($path, '..') || str_contains($path, '~')) {
        return response()->json(['message' => 'Invalid path'], 400);
    }

    // Normalize path
    $path = trim($path);
    $path = str_replace('\\', '/', $path);
    
    // Build full file path
    $full_path = storage_path('app/public/' . $path);
    $real_path = realpath($full_path);
    $storage_dir = realpath(storage_path('app/public'));
    
    // Verify the real path is within storage directory
    if ($real_path === false || $storage_dir === false || !str_starts_with($real_path, $storage_dir)) {
        return response()->json(['message' => 'Invalid path'], 401);
    }
    
    if (!file_exists($real_path) || !is_file($real_path)) {
        return response()->json(['message' => 'File not found'], 404);
    }
    
    try {
        return response()->file($real_path);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error serving file'], 500);
    }
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

    // Notification routes
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/unread', [NotificationController::class, 'unread']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);

    // Admin routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/stats', [AdminController::class, 'stats']);
        Route::get('/users', [AdminController::class, 'users']);
        Route::delete('/users/{user}', [AdminController::class, 'deleteUser']);
        Route::post('/users/{user}/toggle-admin', [AdminController::class, 'toggleAdmin']);
        Route::get('/vehicles', [AdminController::class, 'vehicles']);
        Route::post('/vehicles/{vehicle}/verify', [AdminController::class, 'verifyVehicle']);
        Route::delete('/vehicles/{vehicle}', [AdminController::class, 'deleteVehicle']);
        Route::get('/rides', [AdminController::class, 'rides']);
        Route::post('/rides/{ride}/cancel', [AdminController::class, 'cancelRide']);
        Route::delete('/rides/{ride}', [AdminController::class, 'deleteRide']);
        Route::get('/reviews', [AdminController::class, 'reviews']);
        Route::delete('/reviews/{review}', [AdminController::class, 'deleteReview']);
    });
});

<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Ride;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    /**
     * Get reviews for a specific user.
     */
    public function getUserReviews(int $userId): JsonResponse
    {
        $reviews = Review::where('reviewee_id', $userId)
            ->with('reviewer')
            ->latest()
            ->get();

        return response()->json($reviews);
    }

    /**
     * Create a new review.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'reviewee_id' => ['required', 'exists:users,id'],
            'ride_id' => ['required', 'exists:rides,id'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:500'],
        ]);

        // Verify the ride exists and user was part of it
        $ride = Ride::findOrFail($data['ride_id']);
        $currentUser = $request->user();

        // Check if user was driver or passenger on this ride
        $wasDriver = $ride->user_id === $currentUser->id;
        $wasPassenger = Booking::where('ride_id', $ride->id)
            ->where('user_id', $currentUser->id)
            ->exists();

        if (!$wasDriver && !$wasPassenger) {
            return response()->json([
                'message' => 'You must have been part of this ride to leave a review'
            ], 403);
        }

        // Can't review yourself
        if ($data['reviewee_id'] === $currentUser->id) {
            return response()->json([
                'message' => 'You cannot review yourself'
            ], 422);
        }

        // Check if review already exists
        $existingReview = Review::where('reviewer_id', $currentUser->id)
            ->where('ride_id', $data['ride_id'])
            ->first();

        if ($existingReview) {
            return response()->json([
                'message' => 'You have already reviewed this ride'
            ], 422);
        }

        DB::beginTransaction();
        try {
            // Create review
            $review = Review::create([
                'reviewer_id' => $currentUser->id,
                'reviewee_id' => $data['reviewee_id'],
                'ride_id' => $data['ride_id'],
                'rating' => $data['rating'],
                'comment' => $data['comment'] ?? null,
            ]);

            // Update user's average rating
            $reviewee = User::find($data['reviewee_id']);
            $avgRating = Review::where('reviewee_id', $data['reviewee_id'])
                ->avg('rating');
            $totalReviews = Review::where('reviewee_id', $data['reviewee_id'])
                ->count();

            $reviewee->update([
                'average_rating' => round($avgRating, 2),
                'total_reviews' => $totalReviews,
            ]);

            DB::commit();

            $review->load('reviewer');

            return response()->json([
                'message' => 'Review created successfully',
                'review' => $review,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create review'], 500);
        }
    }

    /**
     * Delete a review (only by the reviewer).
     */
    public function destroy(Request $request, Review $review): JsonResponse
    {
        if ($review->reviewer_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        DB::beginTransaction();
        try {
            $revieweeId = $review->reviewee_id;
            $review->delete();

            // Recalculate user's average rating
            $reviewee = User::find($revieweeId);
            $avgRating = Review::where('reviewee_id', $revieweeId)->avg('rating') ?? 0;
            $totalReviews = Review::where('reviewee_id', $revieweeId)->count();

            $reviewee->update([
                'average_rating' => round($avgRating, 2),
                'total_reviews' => $totalReviews,
            ]);

            DB::commit();

            return response()->json(['message' => 'Review deleted successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to delete review'], 500);
        }
    }
}
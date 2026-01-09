<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    /**
     * Process a payment for a booking
     */
    public function processPayment(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:flooz,mixx,card,wallet',
            'phone_number' => 'required_if:payment_method,flooz,mixx|nullable|string|max:20',
        ]);

        $booking = Booking::with('ride')->findOrFail($validated['booking_id']);

        // Check if already paid
        if ($booking->status === 'confirmed' && $booking->payments()->where('status', 'completed')->exists()) {
            return response()->json(['message' => 'Cette réservation est déjà payée.'], 422);
        }

        DB::beginTransaction();
        try {
            // Create payment record
            $payment = Payment::create([
                'booking_id' => $booking->id,
                'user_id' => auth()->id(),
                'amount' => $validated['amount'],
                'payment_method' => $validated['payment_method'],
                'phone_number' => $validated['phone_number'] ?? null,
                'status' => 'pending',
                'reference' => 'MS-' . strtoupper(Str::random(10)),
            ]);

            // Simulation of External API call (Flooz/Mixx)
            // In a real scenario, you would redirect to the provider's gateway or trigger a USSD push
            $success = true; // Simulating success

            if ($success) {
                $payment->update([
                    'status' => 'completed',
                    'transaction_id' => 'TXN-' . strtoupper(Str::random(12)),
                    'processed_at' => now(),
                    'metadata' => [
                        'simulated' => true,
                        'provider_response' => 'SUCCESS'
                    ]
                ]);

                $booking->update(['status' => 'confirmed']);
                
                DB::commit();

                return response()->json([
                    'message' => 'Paiement effectué avec succès via ' . ucfirst($validated['payment_method']),
                    'payment' => $payment,
                    'booking' => $booking
                ]);
            }

            throw new \Exception('Le paiement a été refusé par l\'opérateur.');

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Échec du paiement : ' . $e->getMessage()
            ], 400);
        }
    }

    /**
     * Get payment history for the authenticated user
     */
    public function getPaymentHistory(): JsonResponse
    {
        $payments = Payment::where('user_id', auth()->id())
            ->with(['booking.ride'])
            ->latest()
            ->paginate(15);

        return response()->json($payments);
    }

    /**
     * Cancel a payment/booking (Mock)
     */
    public function cancelPayment(Request $request, Booking $booking): JsonResponse
    {
        if ($booking->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $payment = Payment::where('booking_id', $booking->id)->where('status', 'completed')->first();
        
        if ($payment) {
            $payment->update(['status' => 'refunded']);
        }

        $booking->update(['status' => 'cancelled']);

        return response()->json(['message' => 'Réservation annulée et paiement remboursé (Simulé)']);
    }
}

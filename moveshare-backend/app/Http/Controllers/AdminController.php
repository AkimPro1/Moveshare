<?php
namespace App\Http\Controllers;



use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\Ride;
use App\Models\Booking;
use App\Models\Review;
use App\Notifications\VehicleStatusNotification;
use App\Notifications\RideCancelledNotification;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function stats()
    {
        return response()->json([
            'users_count' => User::count(),
            'vehicles_count' => Vehicle::count(),
            'rides_count' => Ride::count(),
            'bookings_count' => Booking::count(),
            'pending_vehicles' => Vehicle::where('verification_status', 'pending')->count(),
            'total_revenue' => DB::table('payments')->sum('amount') ?? 0,
            'recent_reviews' => Review::count(),
        ]);
    }
    
        public function deleteVehicle(Vehicle $vehicle)
        {
            $vehicle->delete();
            return response()->json(['message' => 'Véhicule supprimé avec succès']);
        }

    public function users()
    {
        return response()->json(User::latest()->paginate(10));
    }

    public function deleteUser(User $user)
    {
        if (auth()->id() === $user->id) {
            return response()->json(['message' => 'Vous ne pouvez pas supprimer votre propre compte'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }

    public function toggleAdmin(User $user)
    {
        if (auth()->id() === $user->id) {
            return response()->json(['message' => 'Vous ne pouvez pas retirer vos propres droits admin'], 403);
        }

        $user->is_admin = !$user->is_admin;
        $user->save();

        return response()->json([
            'message' => 'Statut admin mis à jour',
            'user' => $user
        ]);
    }

    public function vehicles()
    {
        $vehicles = Vehicle::with('user')->latest()->paginate(10);

        // Ensure photos is always an array (never null)
        $vehicles->getCollection()->transform(function ($v) {
            if (is_string($v->photos)) {
                $v->photos = json_decode($v->photos, true) ?: [];
            } else {
                $v->photos = $v->photos ?? [];
            }
            return $v;
        });

        return response()->json($vehicles);
    }

    public function verifyVehicle(Request $request, Vehicle $vehicle)
    {
        $request->validate([
            'status' => 'required|in:verified,pending,unverified'
        ]);

        $vehicle->verification_status = $request->status;
        $vehicle->save();

        return response()->json([
            'message' => 'Statut de vérification mis à jour',
            'vehicle' => $vehicle
        ]);
    }

    public function rides()
    {
        try {
            $rides = Ride::with(['driver:id,name,email', 'vehicle:id,brand,model,year,license_plate,user_id,photos'])
                ->latest()
                ->paginate(10);
            
            // Ensure vehicle photos is always an array (never null)
            $rides->getCollection()->transform(function ($ride) {
                if ($ride->vehicle) {
                    if (is_string($ride->vehicle->photos)) {
                        $ride->vehicle->photos = json_decode($ride->vehicle->photos, true) ?: [];
                    } else {
                        $ride->vehicle->photos = $ride->vehicle->photos ?? [];
                    }
                }
                return $ride;
            });
            
            return response()->json($rides);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors du chargement des trajets: ' . $e->getMessage()], 500);
        }
    }

    public function cancelRide(Ride $ride)
    {
        $ride->status = 'cancelled';
        $ride->save();

        // Cancel all bookings for this ride
        $ride->bookings()->update(['status' => 'cancelled']);

        return response()->json([
            'message' => 'Trajet annulé avec succès',
            'ride' => $ride
        ]);
    }

    public function deleteRide(Ride $ride)
    {
        $ride->delete();
        return response()->json(['message' => 'Trajet supprimé avec succès']);
    }

    public function reviews()
    {
        return response()->json(Review::with(['reviewer', 'reviewee', 'ride'])->latest()->paginate(10));
    }

    public function deleteReview(Review $review)
    {
        $review->delete();
        return response()->json(['message' => 'Avis supprimé avec succès']);
    }
}

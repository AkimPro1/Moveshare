<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ride extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'car_id',
        'start_location',
        'start_lat',
        'start_lng',
        'end_location',
        'end_lat',
        'end_lng',
        'ride_date',
        'ride_time',
        'price_per_seat',
        'available_seats',
        'total_seats',
        'status',
    ];

    protected $casts = [
        'ride_date' => 'date',
        'start_lat' => 'float',
        'start_lng' => 'float',
        'end_lat' => 'float',
        'end_lng' => 'float',
        'price_per_seat' => 'decimal:2',
        'available_seats' => 'integer',
        'total_seats' => 'integer',
    ];

    /**
     * Get the user (driver) that owns the ride.
     */
    public function driver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the vehicle for this ride.
     */
    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class, 'car_id');
    }

    /**
     * Get the bookings for this ride.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
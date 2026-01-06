<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'ride_id',
        'user_id',
        'seats_booked',
        'status',
    ];

    protected $casts = [
        'seats_booked' => 'integer',
    ];

    /**
     * Get the ride for this booking.
     */
    public function ride(): BelongsTo
    {
        return $this->belongsTo(Ride::class);
    }

    /**
     * Get the user (passenger) for this booking.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
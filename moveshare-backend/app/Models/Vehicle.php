<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'brand',
        'model',
        'year',
        'color',
        'license_plate',
        'seats',
        'vehicle_type',
        'verification_status',
        'photos',
    ];

    protected $casts = [
        'photos' => 'array',
        'year' => 'integer',
        'seats' => 'integer',
    ];

    /**
     * Get the user that owns the vehicle.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the rides for this vehicle.
     */
    public function rides(): HasMany
    {
        return $this->hasMany(Ride::class, 'car_id');
    }
}
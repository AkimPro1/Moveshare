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
     * Get photos, ensuring it's always an array
     */
    public function getPhotosAttribute($value): array
    {
        if (is_null($value)) {
            return [];
        }
        
        if (is_array($value)) {
            // Filter out empty strings and non-string values
            return array_filter(array_map('strval', $value), function($photo) {
                return !empty(trim($photo));
            });
        }
        
        if (is_string($value)) {
            $trimmed = trim($value);
            return !empty($trimmed) ? [$trimmed] : [];
        }
        
        return [];
    }

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
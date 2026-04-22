<?php

namespace App\Notifications;

use App\Models\Vehicle;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class VehicleStatusNotification extends Notification
{
    use Queueable;

    protected $vehicle;
    protected $status;

    /**
     * Create a new notification instance.
     */
    public function __construct(Vehicle $vehicle, string $status)
    {
        $this->vehicle = $vehicle;
        $this->status = $status;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $message = $this->status === 'verified' 
            ? "Votre véhicule {$this->vehicle->brand} {$this->vehicle->model} a été validé par l'administrateur."
            : "Votre véhicule {$this->vehicle->brand} {$this->vehicle->model} a été rejeté. Veuillez vérifier les informations.";

        return [
            'type' => 'vehicle_status',
            'vehicle_id' => $this->vehicle->id,
            'status' => $this->status,
            'message' => $message,
            'icon' => $this->status === 'verified' ? 'CheckCircle' : 'XCircle',
        ];
    }
}

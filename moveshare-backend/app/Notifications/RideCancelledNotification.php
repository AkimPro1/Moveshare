<?php

namespace App\Notifications;

use App\Models\Ride;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class RideCancelledNotification extends Notification
{
    use Queueable;

    protected $ride;
    protected $reason;
    protected $is_booking_cancellation;
    protected $actor_name;

    /**
     * Create a new notification instance.
     */
    public function __construct(Ride $ride, string $actor_name, bool $is_booking_cancellation = false)
    {
        $this->ride = $ride;
        $this->actor_name = $actor_name;
        $this->is_booking_cancellation = $is_booking_cancellation;
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
        if ($this->is_booking_cancellation) {
            $message = "{$this->actor_name} a annulé sa réservation pour votre trajet {$this->ride->start_location} → {$this->ride->end_location}.";
        } else {
            $message = "Le trajet {$this->ride->start_location} → {$this->ride->end_location} du {$this->ride->ride_date->format('d/m/Y')} a été annulé par le conducteur ({$this->actor_name}).";
        }

        return [
            'type' => 'ride_cancelled',
            'ride_id' => $this->ride->id,
            'message' => $message,
            'icon' => 'XCircle',
        ];
    }
}

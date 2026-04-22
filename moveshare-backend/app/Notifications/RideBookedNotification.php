<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class RideBookedNotification extends Notification
{
    use Queueable;

    protected $booking;

    /**
     * Create a new notification instance.
     */
    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
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
        $ride = $this->booking->ride;
        $passenger = $this->booking->user;
        
        return [
            'type' => 'ride_booked',
            'booking_id' => $this->booking->id,
            'ride_id' => $ride->id,
            'message' => "{$passenger->name} a réservé {$this->booking->seats_booked} place(s) pour votre trajet {$ride->start_location} → {$ride->end_location}.",
            'icon' => 'BookOpen',
        ];
    }
}

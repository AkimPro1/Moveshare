<?php

namespace App\Notifications;

use App\Models\Review;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewReviewNotification extends Notification
{
    use Queueable;

    protected $review;

    /**
     * Create a new notification instance.
     */
    public function __construct(Review $review)
    {
        $this->review = $review;
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
        $reviewer = $this->review->reviewer;
        
        return [
            'type' => 'new_review',
            'review_id' => $this->review->id,
            'rating' => $this->review->rating,
            'message' => "{$reviewer->name} vous a laissé un avis ({$this->review->rating}/5).",
            'icon' => 'Star',
        ];
    }
}

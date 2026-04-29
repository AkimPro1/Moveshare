import { formatDate } from '../utils/formatters'
import { Review } from '../types'
import { getProfileImageUrl } from '../utils/urls'
import Card from './Card'
import StarRating from './StarRating'
import './ReviewCard.css'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const reviewerName = review.reviewer?.name || 'Utilisateur'
  const reviewerInitials = reviewerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const reviewerPhoto = review.reviewer?.profile_photo

  return (
    <Card className="review-card">
      <div className="review-header">
        <div className="review-author">
          {reviewerPhoto ? (
            <img 
              src={getProfileImageUrl(reviewerPhoto)} 
              alt={reviewerName}
              className="review-avatar"
            />
          ) : (
            <div className="review-avatar review-avatar-fallback">
              {reviewerInitials}
            </div>
          )}
          <div className="review-author-info">
            <div className="review-author-name">{reviewerName}</div>
            <div className="review-date">{formatDate(review.created_at)}</div>
          </div>
        </div>
        <StarRating rating={review.rating} size={16} />
      </div>
      
      {review.comment && (
        <p className="review-comment">{review.comment}</p>
      )}
    </Card>
  )
}
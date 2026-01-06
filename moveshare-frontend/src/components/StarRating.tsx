import { Star } from 'lucide-react'
import './StarRating.css'

interface StarRatingProps {
  rating: number
  totalStars?: number
  size?: number
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

export default function StarRating({ 
  rating, 
  totalStars = 5, 
  size = 20,
  interactive = false,
  onRatingChange 
}: StarRatingProps) {
  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1)
    }
  }

  return (
    <div className={`star-rating ${interactive ? 'star-rating-interactive' : ''}`}>
      {[...Array(totalStars)].map((_, index) => {
        const isFilled = index < Math.floor(rating)
        const isHalf = !isFilled && index < rating

        return (
          <button
            key={index}
            type="button"
            className={`star-button ${interactive ? 'star-clickable' : ''}`}
            onClick={() => handleClick(index)}
            disabled={!interactive}
            aria-label={`${index + 1} star${index + 1 > 1 ? 's' : ''}`}
          >
            <Star
              style={{ 
                width: size, 
                height: size,
                fill: isFilled ? 'var(--ms-warning)' : isHalf ? 'var(--ms-warning)' : 'none',
                color: isFilled || isHalf ? 'var(--ms-warning)' : 'var(--ms-muted)',
                opacity: isHalf ? 0.5 : 1
              }}
            />
          </button>
        )
      })}
    </div>
  )
}
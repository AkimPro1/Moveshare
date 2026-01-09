import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  MapPin, Calendar, Clock, DollarSign, Users, Car, 
  Mail, Phone, Star, MessageCircle, ArrowLeft
} from 'lucide-react'
import { ridesApi } from '../api/ridesApi'
import { paymentApi, PaymentMethod } from '../api/paymentApi'
import { reviewApi } from '../api/reviewApi'
import { routingService, RouteResponse } from '../api/routingService'
import { RideDetails as RideDetailsType } from '../types'
import { formatDate, formatTime, formatPrice } from '../utils/formatters'
import { getVehicleImageUrl, getProfileImageUrl } from '../utils/urls'
import Card from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'
import Input from '../components/Input'
import StarRating from '../components/StarRating'
import ReviewCard from '../components/ReviewCard'
import MapboxView from '../components/MapboxView'
import RouteDetails from '../components/RouteDetails'
import './RideDetails.css'

export default function RideDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [ride, setRide] = useState<RideDetailsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showBookModal, setShowBookModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [seatsToBook, setSeatsToBook] = useState(1)
  const [booking, setBooking] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('flooz')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [route, setRoute] = useState<RouteResponse | null>(null)
  const [routeLoading, setRouteLoading] = useState(false)
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    if (id) {
      loadRideDetails()
    }
  }, [id])

  // Load route when ride details are available
  useEffect(() => {
    if (ride && ride.start_lat && ride.start_lng && ride.end_lat && ride.end_lng) {
      loadRoute()
    }
  }, [ride])

  const loadRideDetails = async () => {
    try {
      setLoading(true)
      const data = await ridesApi.getRideDetails(parseInt(id!))
      setRide(data)
    } catch (err) {
      setError('Erreur lors du chargement des détails du trajet')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadRoute = async () => {
    if (!ride || !ride.start_lat || !ride.start_lng || !ride.end_lat || !ride.end_lng) return

    try {
      setRouteLoading(true)
      const result = await routingService.getRoute(
        [ride.start_lat, ride.start_lng],
        [ride.end_lat, ride.end_lng]
      )
      setRoute(result)
    } catch (err) {
      console.error('Failed to load route:', err)
    } finally {
      setRouteLoading(false)
    }
  }

  const handleBookRide = async () => {
    try {
      setBooking(true)
      // 1. Create the booking
      const bookingData = await ridesApi.bookRide(parseInt(id!), seatsToBook)
      
      // 2. Process payment
      await paymentApi.processPayment({
        booking_id: bookingData.booking.id,
        amount: totalPrice,
        payment_method: paymentMethod,
        phone_number: phoneNumber
      })

      setShowBookModal(false)
      alert('Réservation et paiement effectués avec succès !')
      await loadRideDetails()
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Erreur lors de la réservation ou du paiement')
    } finally {
      setBooking(false)
    }
  }

  const handleSubmitReview = async () => {
    if (!ride) return

    try {
      setSubmittingReview(true)
      await reviewApi.createReview({
        reviewee_id: ride.driver.id,
        ride_id: ride.id,
        rating: reviewRating,
        comment: reviewComment
      })
      setShowReviewModal(false)
      setReviewRating(5)
      setReviewComment('')
      alert('Avis ajouté avec succès !')
      await loadRideDetails()
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Erreur lors de l\'ajout de l\'avis')
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) {
    return (
      <div className="ride-details-page">
        <div className="ms-container">
          <div className="ride-details-loading">Chargement...</div>
        </div>
      </div>
    )
  }

  if (!ride || error) {
    return (
      <div className="ride-details-page">
        <div className="ms-container">
          <Card className="ride-details-error">
            <p>{error || 'Trajet introuvable'}</p>
            <Button onClick={() => navigate('/rides')}>Retour aux trajets</Button>
          </Card>
        </div>
      </div>
    )
  }

  const driverInitials = ride.driver.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const driverPhoto = ride.driver.profile_photo 
    ? getProfileImageUrl(ride.driver.profile_photo)
    : null
  const totalPrice = ride.price_per_seat * seatsToBook
  const canBook = ride.available_seats > 0 && ride.status === 'active'

  return (
    <div className="ride-details-page">
      <div className="ms-container">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="back-button"
        >
          <ArrowLeft style={{ width: 18, height: 18 }} />
          Retour
        </Button>

        <div className="ride-details-content">
          {/* Main Content */}
          <div className="ride-details-main">
            {/* Ride Info Card */}
            <Card className="ride-info-card">
              <div className="ride-info-header">
                <h1>Détails du trajet</h1>
                {ride.status === 'active' && (
                  <span className="status-badge-active">Actif</span>
                )}
              </div>

              <div className="ride-route-section">
                <div className="route-point-large">
                  <MapPin style={{ width: 24, height: 24, color: 'var(--ms-primary)' }} />
                  <div>
                    <div className="route-label">Départ</div>
                    <div className="route-location-large">{ride.start_location}</div>
                  </div>
                </div>
                <div className="route-line-large"></div>
                <div className="route-point-large">
                  <MapPin style={{ width: 24, height: 24, color: 'var(--ms-accent)' }} />
                  <div>
                    <div className="route-label">Arrivée</div>
                    <div className="route-location-large">{ride.end_location}</div>
                  </div>
                </div>
              </div>

              <div className="ride-info-grid">
                <div className="info-item">
                  <Calendar style={{ width: 20, height: 20 }} />
                  <div>
                    <div className="info-label">Date</div>
                    <div className="info-value">{formatDate(ride.ride_date)}</div>
                  </div>
                </div>

                <div className="info-item">
                  <Clock style={{ width: 20, height: 20 }} />
                  <div>
                    <div className="info-label">Heure</div>
                    <div className="info-value">{formatTime(ride.ride_time)}</div>
                  </div>
                </div>

                <div className="info-item">
                  <DollarSign style={{ width: 20, height: 20 }} />
                  <div>
                    <div className="info-label">Prix / place</div>
                    <div className="info-value">{formatPrice(ride.price_per_seat)}</div>
                  </div>
                </div>

                <div className="info-item">
                  <Users style={{ width: 20, height: 20 }} />
                  <div>
                    <div className="info-label">Places disponibles</div>
                    <div className="info-value">{ride.available_seats} / {ride.total_seats}</div>
                  </div>
                </div>
              </div>

              {canBook && (
                <div className="ride-booking-section">
                  <Button 
                    size="lg" 
                    onClick={() => setShowBookModal(true)}
                    className="book-button"
                  >
                    Réserver ce trajet
                  </Button>
                </div>
              )}
            </Card>

            {/* Real-time Tracking Map */}
            <Card className="ride-map-card">
              <h2>Suivi du trajet en temps réel</h2>
              <MapboxView 
                startPos={ride.start_lat && ride.start_lng ? [ride.start_lat, ride.start_lng] : [48.8566, 2.3522]}
                endPos={ride.end_lat && ride.end_lng ? [ride.end_lat, ride.end_lng] : [45.7640, 4.8357]}
                currentPos={ride.start_lat && ride.start_lng ? [ride.start_lat, ride.start_lng] : undefined}
                height="350px"
                zoom={12}
              />
              <div className="map-legend">
                <div className="legend-item">
                  <span className="legend-dot start"></span>
                  <span>Départ</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot current"></span>
                  <span>Position actuelle</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot end"></span>
                  <span>Arrivée</span>
                </div>
              </div>
            </Card>

            {/* Route Details */}
            <RouteDetails route={route} loading={routeLoading} />

            {/* Vehicle Card */}
            <Card className="vehicle-card">
              <h2>Véhicule</h2>
              
              {ride.vehicle.photos && ride.vehicle.photos.length > 0 && (
                <div className="vehicle-photos">
                  <img
                    src={getVehicleImageUrl(ride.vehicle.photos[0])}
                    alt={`${ride.vehicle.brand} ${ride.vehicle.model}`}
                    className="vehicle-photo-main"
                  />
                </div>
              )}

              <div className="vehicle-info">
                <div className="vehicle-detail">
                  <Car style={{ width: 18, height: 18 }} />
                  <span>{ride.vehicle.brand} {ride.vehicle.model} ({ride.vehicle.year})</span>
                </div>
                <div className="vehicle-detail">
                  <div className="color-dot" style={{ background: ride.vehicle.color }}></div>
                  <span>{ride.vehicle.color}</span>
                </div>
                <div className="vehicle-detail">
                  <Users style={{ width: 18, height: 18 }} />
                  <span>{ride.vehicle.seats} places</span>
                </div>
              </div>
            </Card>

            {/* Passengers Card */}
            {ride.passengers && ride.passengers.length > 0 && (
              <Card className="passengers-card">
                <h2>Passagers ({ride.passengers.length})</h2>
                <div className="passengers-grid">
                  {ride.passengers.map((passenger) => (
                    <div key={passenger.id} className="passenger-badge">
                      <div className="passenger-avatar-small">
                        {passenger.name[0].toUpperCase()}
                      </div>
                      <div className="passenger-details">
                        <span className="passenger-name-small">{passenger.name}</span>
                        <span className="passenger-seats-small">{passenger.seats_booked} place{passenger.seats_booked > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="ride-details-sidebar">
            {/* Driver Card */}
            <Card className="driver-card">
              <h2>Conducteur</h2>
              
              <div className="driver-profile">
                {driverPhoto ? (
                  <img src={driverPhoto} alt={ride.driver.name} className="driver-photo" />
                ) : (
                  <div className="driver-photo driver-photo-fallback">
                    {driverInitials}
                  </div>
                )}
                
                <div className="driver-info-main">
                  <h3>{ride.driver.name}</h3>
                  <div className="driver-rating-section">
                    <StarRating rating={ride.driver.average_rating ?? 0} size={18} />
                    <span className="driver-rating-text">
                      {(ride.driver.average_rating ?? 0).toFixed(1)} ({ride.driver.total_reviews ?? 0} avis)
                    </span>
                  </div>
                </div>
              </div>

              {ride.driver.city && (
                <div className="driver-detail">
                  <MapPin style={{ width: 16, height: 16 }} />
                  <span>{ride.driver.city}</span>
                </div>
              )}

              {ride.driver.bio && (
                <p className="driver-bio">{ride.driver.bio}</p>
              )}

              <div className="driver-actions">
                <Button variant="outline" size="sm">
                  <Mail style={{ width: 16, height: 16 }} />
                  Contacter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowReviewModal(true)}
                >
                  <Star style={{ width: 16, height: 16 }} />
                  Évaluer
                </Button>
              </div>
            </Card>

            {/* Reviews Section */}
            {ride.driver.reviewsReceived && ride.driver.reviewsReceived.length > 0 && (
              <Card className="reviews-card">
                <h2>Avis ({ride.driver.total_reviews})</h2>
                <div className="reviews-list-details">
                  {ride.driver.reviewsReceived.slice(0, 3).map((review: any) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        title="Réserver ce trajet"
      >
        <div className="booking-modal-content">
          <div className="booking-summary">
            <div className="summary-route">
              <MapPin style={{ width: 18, height: 18 }} />
              <span>{ride.start_location} → {ride.end_location}</span>
            </div>
            <div className="summary-date">
              <Calendar style={{ width: 18, height: 18 }} />
              <span>{formatDate(ride.ride_date)} à {formatTime(ride.ride_time)}</span>
            </div>
          </div>

          <div className="seats-selector">
            <label>Nombre de places</label>
            <select 
              value={seatsToBook}
              onChange={(e) => setSeatsToBook(parseInt(e.target.value))}
              className="seats-select"
            >
              {[...Array(Math.min(ride.available_seats, 4))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} place{i + 1 > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="booking-total">
            <span>Total à payer</span>
            <span className="total-price">{formatPrice(totalPrice)}</span>
          </div>

          <div className="payment-method-selector">
            <label className="form-label">Moyen de paiement</label>
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === 'flooz' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="flooz" 
                  checked={paymentMethod === 'flooz'} 
                  onChange={() => setPaymentMethod('flooz')} 
                />
                <span className="payment-label">Flooz (Moov)</span>
              </label>
              <label className={`payment-option ${paymentMethod === 'mixx' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="mixx" 
                  checked={paymentMethod === 'mixx'} 
                  onChange={() => setPaymentMethod('mixx')} 
                />
                <span className="payment-label">Mixx (Tmoney)</span>
              </label>
            </div>
          </div>

          {(paymentMethod === 'flooz' || paymentMethod === 'mixx') && (
            <div className="phone-number-input">
              <label className="form-label">Numéro de téléphone (Togo)</label>
              <Input
                type="tel"
                placeholder="Ex: 90 00 00 00"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <p className="input-hint">Une demande de confirmation sera envoyée sur ce numéro.</p>
            </div>
          )}

          <div className="modal-actions">
            <Button variant="outline" onClick={() => setShowBookModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleBookRide} loading={booking} disabled={booking}>
              Confirmer la réservation
            </Button>
          </div>
        </div>
      </Modal>

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="Évaluer le conducteur"
      >
        <div className="review-modal-content">
          <div className="review-driver-info">
            <div className="review-driver-avatar">
              {driverInitials}
            </div>
            <span>{ride.driver.name}</span>
          </div>

          <div className="review-rating-section">
            <label>Note</label>
            <StarRating 
              rating={reviewRating} 
              size={32}
              interactive
              onRatingChange={setReviewRating}
            />
          </div>

          <div className="review-comment-section">
            <label>Commentaire (optionnel)</label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Partagez votre expérience..."
              rows={4}
              maxLength={500}
              className="review-textarea"
            />
            <div className="review-hint">{reviewComment.length}/500 caractères</div>
          </div>

          <div className="modal-actions">
            <Button variant="outline" onClick={() => setShowReviewModal(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleSubmitReview} 
              loading={submittingReview}
              disabled={submittingReview}
            >
              Publier l'avis
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
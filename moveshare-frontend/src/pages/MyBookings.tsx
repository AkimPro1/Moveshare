import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, DollarSign, Users, User, X, Eye, Star } from 'lucide-react'
import { ridesApi } from '../api/ridesApi'
import { Booking } from '../types'
import { formatDate, formatTime, formatPrice } from '../utils/formatters'
import Card from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'
import './MyBookings.css'
import './MyBookings.css'

export default function MyBookings() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancellingId, setCancellingId] = useState<number | null>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)

  useEffect(() => {
    loadMyBookings()
  }, [])

  const loadMyBookings = async () => {
    try {
      setLoading(true)
      const data = await ridesApi.getMyBookings()
      setBookings(data)
    } catch (err) {
      setError('Erreur lors du chargement de vos réservations')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async () => {
    if (!cancellingId) return

    try {
      await ridesApi.cancelBooking(cancellingId)
      setShowCancelModal(false)
      setCancellingId(null)
      await loadMyBookings()
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Erreur lors de l\'annulation')
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      confirmed: { label: 'Confirmé', className: 'booking-status booking-confirmed' },
      pending: { label: 'En attente', className: 'booking-status booking-pending' },
      cancelled: { label: 'Annulé', className: 'booking-status booking-cancelled' }
    }
    return badges[status as keyof typeof badges] || badges.pending
  }

  const getRideStatusBadge = (status: string) => {
    const badges = {
      active: { label: 'Actif', className: 'ride-status ride-active' },
      completed: { label: 'Terminé', className: 'ride-status ride-completed' },
      cancelled: { label: 'Annulé', className: 'ride-status ride-cancelled' }
    }
    return badges[status as keyof typeof badges] || badges.active
  }

  if (loading) {
    return (
      <div className="my-bookings-page">
        <div className="ms-container">
          <div className="my-bookings-loading">Chargement...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-bookings-page">
      <div className="ms-container">
        <div className="my-bookings-header">
          <div>
            <h1>Mes réservations</h1>
            <p>Vos trajets réservés en tant que passager</p>
          </div>
          <Button onClick={() => navigate('/rides')}>
            Trouver un trajet
          </Button>
        </div>

        {error && (
          <div className="my-bookings-error">{error}</div>
        )}

        {bookings.length === 0 ? (
          <Card className="my-bookings-empty">
            <Users style={{ width: 48, height: 48, color: 'var(--ms-muted)' }} />
            <h2>Aucune réservation</h2>
            <p>Commencez à réserver des trajets pour voyager économique !</p>
            <Button onClick={() => navigate('/rides')}>
              Rechercher un trajet
            </Button>
          </Card>
        ) : (
          <div className="my-bookings-list">
            {bookings.map((booking) => {
              const statusBadge = getStatusBadge(booking.status)
              const rideStatusBadge = getRideStatusBadge(booking.ride.status)
              const canCancel = booking.status === 'confirmed' && booking.ride.status === 'active'
              const totalPrice = booking.ride.price_per_seat * booking.seats_booked

              return (
                <Card key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <div className="booking-badges">
                      <span className={statusBadge.className}>{statusBadge.label}</span>
                      <span className={rideStatusBadge.className}>{rideStatusBadge.label}</span>
                    </div>
                    <div className="booking-actions">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/rides/${booking.ride.id}`)}
                      >
                        <Eye style={{ width: 16, height: 16 }} />
                      </Button>
                      {canCancel && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setCancellingId(booking.ride.id)
                            setShowCancelModal(true)
                          }}
                        >
                          <X style={{ width: 16, height: 16 }} />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="booking-content">
                    <div className="booking-route">
                      <div className="route-point">
                        <MapPin style={{ width: 18, height: 18, color: 'var(--ms-primary)' }} />
                        <div>
                          <div className="route-label">Départ</div>
                          <div className="route-location">{booking.ride.start_location}</div>
                        </div>
                      </div>
                      <div className="route-line"></div>
                      <div className="route-point">
                        <MapPin style={{ width: 18, height: 18, color: 'var(--ms-accent)' }} />
                        <div>
                          <div className="route-label">Arrivée</div>
                          <div className="route-location">{booking.ride.end_location}</div>
                        </div>
                      </div>
                    </div>

                    <div className="booking-details">
                      <div className="detail-row">
                        <Calendar style={{ width: 16, height: 16 }} />
                        <span>{formatDate(booking.ride.ride_date)} à {formatTime(booking.ride.ride_time)}</span>
                      </div>
                      <div className="detail-row">
                        <Users style={{ width: 16, height: 16 }} />
                        <span>{booking.seats_booked} place{booking.seats_booked > 1 ? 's' : ''} réservée{booking.seats_booked > 1 ? 's' : ''}</span>
                      </div>
                      <div className="detail-row">
                        <DollarSign style={{ width: 16, height: 16 }} />
                        <span className="booking-price">{formatPrice(totalPrice)} total</span>
                      </div>
                    </div>

                    <div className="booking-driver">
                      <div className="driver-info">
                        <User style={{ width: 16, height: 16 }} />
                        <div>
                          <div className="driver-label">Conducteur</div>
                          <div className="driver-name">{booking.ride.driver.name}</div>
                        </div>
                      </div>
                      <div className="driver-rating">
                        <Star style={{ width: 14, height: 14, fill: 'var(--ms-warning)', color: 'var(--ms-warning)' }} />
                        <span>{booking.ride.driver.average_rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="booking-vehicle">
                      <span className="vehicle-label">Véhicule:</span>
                      <span className="vehicle-name">{booking.ride.vehicle.brand} {booking.ride.vehicle.model}</span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false)
          setCancellingId(null)
        }}
        title="Annuler la réservation"
      >
        <div className="cancel-modal-content">
          <p>Êtes-vous sûr de vouloir annuler cette réservation ?</p>
          <p className="cancel-warning">Cette action est irréversible.</p>
          
          <div className="modal-actions">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowCancelModal(false)
                setCancellingId(null)
              }}
            >
              Non, garder
            </Button>
            <Button 
              variant="danger"
              onClick={handleCancelBooking}
            >
              Oui, annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
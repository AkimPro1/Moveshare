import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, DollarSign, Users, Car, Eye } from 'lucide-react'
import { ridesApi } from '../api/ridesApi'
import { MyRide } from '../types'
import { formatDate, formatTime, formatPrice } from '../utils/formatters'
import Card from '../components/Card'
import Button from '../components/Button'
import './MyRides.css'
import './MyRides.css'

export default function MyRides() {
  const navigate = useNavigate()
  const [rides, setRides] = useState<MyRide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadMyRides()
  }, [])

  const loadMyRides = async () => {
    try {
      setLoading(true)
      const data = await ridesApi.getMyRides()
      setRides(data)
    } catch (err) {
      setError('Erreur lors du chargement de vos trajets')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { label: 'Actif', className: 'status-badge status-active' },
      completed: { label: 'Terminé', className: 'status-badge status-completed' },
      cancelled: { label: 'Annulé', className: 'status-badge status-cancelled' }
    }
    return badges[status as keyof typeof badges] || badges.active
  }

  if (loading) {
    return (
      <div className="my-rides-page">
        <div className="ms-container">
          <div className="my-rides-loading">Chargement...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-rides-page">
      <div className="ms-container">
        <div className="my-rides-header">
          <div>
            <h1>Mes trajets proposés</h1>
            <p>Gérez vos trajets en tant que conducteur</p>
          </div>
          <Button onClick={() => navigate('/rides/create')}>
            Créer un trajet
          </Button>
        </div>

        {error && (
          <div className="my-rides-error">{error}</div>
        )}

        {rides.length === 0 ? (
          <Card className="my-rides-empty">
            <Car style={{ width: 48, height: 48, color: 'var(--ms-muted)' }} />
            <h2>Aucun trajet proposé</h2>
            <p>Commencez à partager vos trajets et gagnez de l'argent !</p>
            <Button onClick={() => navigate('/rides/create')}>
              Créer mon premier trajet
            </Button>
          </Card>
        ) : (
          <div className="my-rides-grid">
            {rides.map((ride) => {
              const statusBadge = getStatusBadge(ride.status)
              
              return (
                <Card key={ride.id} className="my-ride-card">
                  <div className="my-ride-header">
                    <span className={statusBadge.className}>
                      {statusBadge.label}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/rides/${ride.id}`)}
                    >
                      <Eye style={{ width: 16, height: 16 }} />
                    </Button>
                  </div>

                  <div className="my-ride-route">
                    <div className="route-point">
                      <MapPin style={{ width: 18, height: 18, color: 'var(--ms-primary)' }} />
                      <div>
                        <div className="route-label">Départ</div>
                        <div className="route-location">{ride.start_location}</div>
                      </div>
                    </div>
                    <div className="route-line"></div>
                    <div className="route-point">
                      <MapPin style={{ width: 18, height: 18, color: 'var(--ms-accent)' }} />
                      <div>
                        <div className="route-label">Arrivée</div>
                        <div className="route-location">{ride.end_location}</div>
                      </div>
                    </div>
                  </div>

                  <div className="my-ride-details">
                    <div className="detail-item">
                      <Calendar style={{ width: 16, height: 16 }} />
                      <span>{formatDate(ride.ride_date)} à {formatTime(ride.ride_time)}</span>
                    </div>
                    <div className="detail-item">
                      <DollarSign style={{ width: 16, height: 16 }} />
                      <span>{formatPrice(ride.price_per_seat)} / place</span>
                    </div>
                    <div className="detail-item">
                      <Users style={{ width: 16, height: 16 }} />
                      <span>{ride.available_seats} / {ride.total_seats} places disponibles</span>
                    </div>
                  </div>

                  <div className="my-ride-vehicle">
                    <Car style={{ width: 16, height: 16 }} />
                    <span>{ride.vehicle.brand} {ride.vehicle.model}</span>
                  </div>

                  {ride.passengers_count > 0 && (
                    <div className="my-ride-passengers">
                      <div className="passengers-header">
                        <Users style={{ width: 16, height: 16 }} />
                        <span>{ride.passengers_count} passager{ride.passengers_count > 1 ? 's' : ''}</span>
                      </div>
                      <div className="passengers-list">
                        {ride.passengers.map((passenger, idx) => (
                          <div key={idx} className="passenger-item">
                            <div className="passenger-avatar">
                              {passenger.name[0].toUpperCase()}
                            </div>
                            <div className="passenger-info">
                              <span className="passenger-name">{passenger.name}</span>
                              <span className="passenger-seats">{passenger.seats} place{passenger.seats > 1 ? 's' : ''}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
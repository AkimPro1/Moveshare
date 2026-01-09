import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Clock, DollarSign, Users, Search, Filter } from 'lucide-react'
import { ridesApi } from '../api/ridesApi'
import { Ride } from '../types'
import { formatDate, formatTime, formatPrice } from '../utils/formatters'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import './RidesList.css'

export default function RidesList() {
  const navigate = useNavigate()
  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadRides()
  }, [])

  const loadRides = async () => {
    try {
      setLoading(true)
      const data = await ridesApi.getRides()
      setRides(data)
    } catch (err) {
      setError('Erreur lors du chargement des trajets')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      const data = await ridesApi.getRides({ 
        search, 
        date: dateFilter 
      })
      setRides(data)
    } catch (err) {
      setError('Erreur lors de la recherche')
    } finally {
      setLoading(false)
    }
  }

  const handleBookRide = async (rideId: number) => {
    try {
      await ridesApi.bookRide(rideId)
      alert('Réservation effectuée avec succès !')
      loadRides()
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Erreur lors de la réservation')
    }
  }

  const filteredRides = rides.filter(ride => {
    const matchesSearch = !search || 
      ride.start_location.toLowerCase().includes(search.toLowerCase()) ||
      ride.end_location.toLowerCase().includes(search.toLowerCase())
    
    const matchesDate = !dateFilter || ride.ride_date === dateFilter
    
    return matchesSearch && matchesDate
  })

  return (
    <div className="rides-list-page">
      <div className="ms-container">
        <div className="rides-header">
          <h1>Trajets disponibles</h1>
          <p>Trouvez le trajet qui vous convient</p>
        </div>

        <Card className="rides-search-card">
          <div className="rides-search">
            <Input
              placeholder="Rechercher par lieu..."
              icon={<Search style={{ width: 18, height: 18 }} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Input
              type="date"
              icon={<Calendar style={{ width: 18, height: 18 }} />}
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            <Button 
              onClick={handleSearch}
              icon={<Filter style={{ width: 18, height: 18 }} />}
            >
              Filtrer
            </Button>
          </div>
        </Card>

        {error && (
          <div className="rides-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rides-loading">
            <div className="spinner"></div>
            <p>Chargement des trajets...</p>
          </div>
        ) : filteredRides.length === 0 ? (
          <Card className="rides-empty">
            <MapPin style={{ width: 48, height: 48, color: 'var(--ms-muted)' }} />
            <h2>Aucun trajet disponible</h2>
            <p>Essayez de modifier vos critères de recherche</p>
          </Card>
        ) : (
          <div className="rides-grid">
            {filteredRides.map((ride) => (
              <Card key={ride.id} className="ride-card" hoverable onClick={() => navigate(`/rides/${ride.id}`)}>
                <div className="ride-route">
                  <div className="ride-location">
                    <MapPin style={{ width: 20, height: 20, color: 'var(--ms-primary)' }} />
                    <div>
                      <div className="location-label">Départ</div>
                      <div className="location-value">{ride.start_location}</div>
                    </div>
                  </div>
                  <div className="ride-arrow">→</div>
                  <div className="ride-location">
                    <MapPin style={{ width: 20, height: 20, color: 'var(--ms-accent)' }} />
                    <div>
                      <div className="location-label">Arrivée</div>
                      <div className="location-value">{ride.end_location}</div>
                    </div>
                  </div>
                  <div className="ride-details">
                    <div className="ride-detail">
                      <Calendar style={{ width: 16, height: 16 }} />
                      <span>{formatDate(ride.ride_date)}</span>
                    </div>

                    <div className="ride-detail">
                      <Clock style={{ width: 16, height: 16 }} />
                      <span>{formatTime(ride.ride_time)}</span>
                    </div>

                    <div className="ride-detail">
                      <Users style={{ width: 16, height: 16 }} />
                      <span>{ride.available_seats} places restantes</span>
                    </div>
                  </div>
                </div>

                <div className="ride-driver">
                  <div className="driver-avatar">
                    {ride.driver.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="driver-info">
                    <div className="driver-name">{ride.driver.name}</div>
                    <div className="driver-vehicle">
                      {ride.vehicle.brand} {ride.vehicle.model} • {ride.vehicle.color}
                    </div>
                  </div>
                </div>

                <div className="ride-footer">
                  <div className="ride-price">
                    <DollarSign style={{ width: 20, height: 20 }} />
                    <span className="price-value">{formatPrice(ride.price_per_seat)}</span>
                    <span className="price-label">/ place</span>
                  </div>
                  <Button 
                    onClick={(e: any) => { e.stopPropagation(); handleBookRide(ride.id) }}
                    size="sm"
                  >
                    Réserver
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
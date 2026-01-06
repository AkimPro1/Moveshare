import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Clock, DollarSign, Users, Car } from 'lucide-react'
import { ridesApi } from '../api/ridesApi'
import { vehicleApi } from '../api/vehicleApi'
import { Vehicle, CreateRideForm } from '../types'
import Input from '../components/Input'
import Select from '../components/Select'
import Button from '../components/Button'
import Card from '../components/Card'
import './CreateRide.css'

export default function CreateRide() {
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const [form, setForm] = useState<CreateRideForm>({
    car_id: '',
    start_location: '',
    end_location: '',
    ride_date: '',
    ride_time: '',
    price_per_seat: '',
    available_seats: ''
  })

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    try {
      const data = await vehicleApi.getVehicles()
      setVehicles(data)
      if (data.length > 0) {
        setForm(prev => ({ ...prev, car_id: data[0].id.toString() }))
      }
    } catch (err) {
      console.error('Failed to load vehicles:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await ridesApi.createRide(form)
      setSuccess(true)
      setTimeout(() => {
        navigate('/rides')
      }, 1500)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erreur lors de la création du trajet')
    } finally {
      setLoading(false)
    }
  }

  const vehicleOptions = vehicles.map(v => ({
    value: v.id.toString(),
    label: `${v.brand} ${v.model} (${v.license_plate})`
  }))

  if (vehicles.length === 0) {
    return (
      <div className="create-ride-page">
        <div className="ms-container">
          <Card className="create-ride-empty">
            <Car style={{ width: 48, height: 48, color: 'var(--ms-muted)' }} />
            <h2>Aucun véhicule disponible</h2>
            <p>Vous devez d'abord ajouter un véhicule avant de créer un trajet.</p>
            <Button onClick={() => navigate('/vehicles')}>
              Gérer mes véhicules
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="create-ride-page">
      <div className="ms-container">
        <div className="create-ride-header">
          <h1>Créer un nouveau trajet</h1>
          <p>Partagez votre trajet et gagnez de l'argent</p>
        </div>

        <div className="create-ride-content">
          <Card className="create-ride-form-card">
            {success && (
              <div className="create-ride-success">
                ✓ Trajet publié avec succès ! Redirection...
              </div>
            )}
            
            {error && (
              <div className="create-ride-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="create-ride-form">
              <div className="form-grid">
                <Select
                  label="Véhicule"
                  options={vehicleOptions}
                  value={form.car_id}
                  onChange={(e) => setForm({ ...form, car_id: e.target.value })}
                  required
                />

                <Input
                  label="Lieu de départ"
                  placeholder="Paris, France"
                  icon={<MapPin style={{ width: 18, height: 18 }} />}
                  value={form.start_location}
                  onChange={(e) => setForm({ ...form, start_location: e.target.value })}
                  required
                />

                <Input
                  label="Destination"
                  placeholder="Lyon, France"
                  icon={<MapPin style={{ width: 18, height: 18 }} />}
                  value={form.end_location}
                  onChange={(e) => setForm({ ...form, end_location: e.target.value })}
                  required
                />

                <Input
                  label="Date du trajet"
                  type="date"
                  icon={<Calendar style={{ width: 18, height: 18 }} />}
                  value={form.ride_date}
                  onChange={(e) => setForm({ ...form, ride_date: e.target.value })}
                  required
                />

                <Input
                  label="Heure de départ"
                  type="time"
                  icon={<Clock style={{ width: 18, height: 18 }} />}
                  value={form.ride_time}
                  onChange={(e) => setForm({ ...form, ride_time: e.target.value })}
                  required
                />

                <Input
                  label="Prix par place (€)"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="15.00"
                  icon={<DollarSign style={{ width: 18, height: 18 }} />}
                  value={form.price_per_seat}
                  onChange={(e) => setForm({ ...form, price_per_seat: e.target.value })}
                  required
                />

                <Input
                  label="Places disponibles"
                  type="number"
                  min="1"
                  max="8"
                  placeholder="3"
                  icon={<Users style={{ width: 18, height: 18 }} />}
                  value={form.available_seats}
                  onChange={(e) => setForm({ ...form, available_seats: e.target.value })}
                  required
                />
              </div>

              <div className="form-actions">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/')}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  loading={loading}
                  disabled={loading}
                >
                  Publier le trajet
                </Button>
              </div>
            </form>
          </Card>

          <div className="create-ride-sidebar">
            <Card>
              <h3>Conseils pour un trajet réussi</h3>
              <ul className="tips-list">
                <li>Soyez ponctuel au point de départ</li>
                <li>Communiquez clairement avec vos passagers</li>
                <li>Gardez votre véhicule propre</li>
                <li>Respectez le code de la route</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
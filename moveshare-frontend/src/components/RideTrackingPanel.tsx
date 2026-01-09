import { useEffect, useState } from 'react'
import { AlertCircle, Navigation, Clock, MapPin } from 'lucide-react'
import { realtimeTrackingService, RideTracking } from '../api/realtimeTrackingService'
import MapboxView from './MapboxView'
import './RideTrackingPanel.css'

interface RideTrackingPanelProps {
  rideId: number
  startLng: number
  startLat: number
  endLng?: number
  endLat?: number
  driverName?: string
}

export default function RideTrackingPanel({
  rideId,
  startLng,
  startLat,
  endLng,
  endLat,
  driverName = 'Conducteur'
}: RideTrackingPanelProps) {
  const [tracking, setTracking] = useState<RideTracking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFollowing, setIsFollowing] = useState(true)

  useEffect(() => {
    setLoading(true)
    setError(null)

    // Subscribe to real-time tracking
    const unsubscribe = realtimeTrackingService.subscribe(
      rideId,
      (data: RideTracking) => {
        setTracking(data)
        setLoading(false)
      }
    )

    // Handle errors
    const handleError = () => {
      setError('Impossible de se connecter au suivi en temps réel')
      setLoading(false)
    }

    window.addEventListener('tracking-error', handleError)

    // Cleanup
    return () => {
      unsubscribe()
      window.removeEventListener('tracking-error', handleError)
    }
  }, [rideId])

  const formatDistance = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)}m`
    return `${km.toFixed(1)}km`
  }

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}min ${secs}s`
  }

  const currentPos = tracking?.current_position 
    ? [tracking.current_position.lng, tracking.current_position.lat] as [number, number]
    : [startLng, startLat] as [number, number]

  return (
    <div className="ride-tracking-panel">
      <div className="tracking-header">
        <h2>📍 Suivi du trajet en temps réel</h2>
        <div className="tracking-driver-info">
          <span className="driver-badge">{driverName}</span>
          {loading && <span className="tracking-status loading">Connexion...</span>}
          {!loading && tracking && <span className="tracking-status connected">En ligne</span>}
          {error && <span className="tracking-status error">Déconnecté</span>}
        </div>
      </div>

      {error && (
        <div className="tracking-error">
          <AlertCircle style={{ width: 20, height: 20 }} />
          <span>{error}</span>
        </div>
      )}

      <div className="tracking-map">
        <MapboxView
          startPos={[startLng, startLat]}
          endPos={endLng && endLat ? [endLng, endLat] : undefined}
          currentPos={currentPos}
          height="350px"
          zoom={13}
        />
      </div>

      {tracking && (
        <div className="tracking-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <MapPin style={{ width: 20, height: 20 }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Distance restante</div>
              <div className="stat-value">
                {tracking.distance_remaining
                  ? formatDistance(tracking.distance_remaining)
                  : 'Calcul...'}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Clock style={{ width: 20, height: 20 }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Arrivée estimée</div>
              <div className="stat-value">
                {tracking.eta ? formatTime(tracking.eta) : 'Calcul...'}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Navigation style={{ width: 20, height: 20 }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Position</div>
              <div className="stat-value">
                {tracking.current_position.lat.toFixed(4)},
                {tracking.current_position.lng.toFixed(4)}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="tracking-controls">
        <button
          className={`control-btn ${isFollowing ? 'active' : ''}`}
          onClick={() => setIsFollowing(!isFollowing)}
          title={isFollowing ? 'Arrêter le suivi' : 'Suivre le conducteur'}
        >
          {isFollowing ? '👁️ Suivre' : '🔍 Ne pas suivre'}
        </button>
      </div>

      <div className="tracking-footer">
        <small>
          Mise à jour en temps réel • Dernière mise à jour:{' '}
          {tracking?.current_position?.timestamp
            ? new Date(tracking.current_position.timestamp).toLocaleTimeString('fr-FR')
            : 'En attente...'}
        </small>
      </div>
    </div>
  )
}

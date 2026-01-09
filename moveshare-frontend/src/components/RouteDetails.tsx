import { RouteResponse, routingService } from '../api/routingService'
import { ChevronRight, Navigation2, MapPin, Clock, Gauge } from 'lucide-react'
import './RouteDetails.css'

interface RouteDetailsProps {
  route: RouteResponse | null
  loading: boolean
}

export default function RouteDetails({ route, loading }: RouteDetailsProps) {
  if (loading) {
    return (
      <div className="route-details">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Calcul de l'itinéraire...</p>
        </div>
      </div>
    )
  }

  if (!route) {
    return null
  }

  return (
    <div className="route-details">
      {/* Route Summary */}
      <div className="route-summary">
        <div className="summary-item">
          <Navigation2 style={{ width: 18, height: 18 }} />
          <span>{routingService.formatDistance(route.distance)}</span>
        </div>
        <div className="summary-divider"></div>
        <div className="summary-item">
          <Clock style={{ width: 18, height: 18 }} />
          <span>{routingService.formatDuration(route.duration)}</span>
        </div>
      </div>

      {/* Route Steps */}
      {route.steps && route.steps.length > 0 && (
        <div className="route-steps">
          <div className="steps-header">
            <h3>Itinéraire détaillé</h3>
            <span className="step-count">{route.steps.length} étapes</span>
          </div>
          <div className="steps-list">
            {route.steps.map((step, index) => (
              <div key={index} className="step-item">
                <div className="step-marker">
                  {index === 0 ? (
                    <MapPin style={{ width: 18, height: 18 }} />
                  ) : index === route.steps.length - 1 ? (
                    <MapPin style={{ width: 18, height: 18 }} />
                  ) : (
                    <ChevronRight style={{ width: 18, height: 18 }} />
                  )}
                </div>
                <div className="step-content">
                  <div className="step-instruction">{step.instruction}</div>
                  <div className="step-road">{step.name}</div>
                </div>
                <div className="step-info">
                  <div className="step-distance">
                    {routingService.formatDistance(step.distance)}
                  </div>
                  <div className="step-duration">
                    {Math.round(step.duration / 60)} min
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

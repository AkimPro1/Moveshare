import axios from 'axios'

export interface RouteStep {
  distance: number // meters
  duration: number // seconds
  instruction: string
  name: string
}

export interface RouteCoordinates {
  lat: number
  lng: number
}

export interface RouteResponse {
  coordinates: [number, number][] // [lat, lng] format
  distance: number // in meters
  duration: number // in seconds
  steps: RouteStep[]
}

/**
 * Get the best route between two points
 * Using OSRM via CORS proxy
 */
export const routingService = {
  /**
   * Get route from start to end coordinates with detailed steps
   * @param start - [latitude, longitude]
   * @param end - [latitude, longitude]
   * @returns Route with coordinates and detailed turn-by-turn directions
   */
  getRoute: async (
    start: [number, number],
    end: [number, number]
  ): Promise<RouteResponse | null> => {
    if (!start || !end) return null

    try {
      // OSRM expects [lng, lat] format
      const startLngLat = `${start[1]},${start[0]}`
      const endLngLat = `${end[1]},${end[0]}`

      // Try OSRM with CORS proxy
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://router.project-osrm.org/route/v1/driving/${startLngLat};${endLngLat}`,
        {
          params: {
            overview: 'full',
            geometries: 'geojson',
            steps: true,
            annotations: 'distance,duration'
          },
          timeout: 8000
        }
      ).catch(async (err) => {
        // Fallback to direct OSRM if proxy fails
        console.log('CORS proxy failed, trying direct OSRM...')
        return axios.get(
          `https://router.project-osrm.org/route/v1/driving/${startLngLat};${endLngLat}`,
          {
            params: {
              overview: 'full',
              geometries: 'geojson',
              steps: true,
              annotations: 'distance,duration'
            },
            timeout: 8000
          }
        )
      })

      if (response.data.code !== 'Ok') {
        console.error('OSRM error:', response.data.message)
        return null
      }

      const route = response.data.routes[0]
      if (!route) return null

      // Convert GeoJSON coordinates [lng, lat] to Leaflet format [lat, lng]
      const coordinates = route.geometry.coordinates.map(
        (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
      )

      // Extract steps with instructions
      const steps: RouteStep[] = []
      if (route.legs) {
        route.legs.forEach((leg: any) => {
          if (leg.steps) {
            leg.steps.forEach((step: any) => {
              steps.push({
                distance: Math.round(step.distance),
                duration: Math.round(step.duration),
                instruction: step.maneuver?.instruction || 'Continuer',
                name: step.name || 'Route'
              })
            })
          }
        })
      }

      return {
        coordinates,
        distance: Math.round(route.distance), // meters
        duration: Math.round(route.duration), // seconds
        steps
      }
    } catch (error) {
      console.error('Routing error:', error)
      return null
    }
  },

  /**
   * Format distance to readable string
   */
  formatDistance: (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`
    }
    return `${(meters / 1000).toFixed(1)} km`
  },

  /**
   * Format duration to readable string
   */
  formatDuration: (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}min`
    }
    return `${minutes} min`
  }
}


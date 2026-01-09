// Service pour gérer les mises à jour de position en temps réel
export interface PositionUpdate {
  ride_id: number
  latitude: number
  longitude: number
  speed?: number
  heading?: number
  timestamp: number
}

export interface RideTracking {
  ride_id: number
  current_position: {
    lat: number
    lng: number
    timestamp: number
  }
  eta?: number // Estimated time of arrival in seconds
  distance_remaining?: number // in km
}

class RealtimeTrackingService {
  private wsUrl = import.meta.env.VITE_WS_BASE_URL || 'ws://127.0.0.1:8000'
  private socket: WebSocket | null = null
  private listeners: Map<number, ((data: RideTracking) => void)[]> = new Map()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 2000

  /**
   * Subscribe to real-time tracking for a specific ride
   */
  subscribe(rideId: number, callback: (data: RideTracking) => void) {
    if (!this.listeners.has(rideId)) {
      this.listeners.set(rideId, [])
    }
    this.listeners.get(rideId)!.push(callback)

    // Connect if not already connected
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      this.connect(rideId)
    }

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(rideId)
      if (callbacks) {
        const index = callbacks.indexOf(callback)
        if (index > -1) {
          callbacks.splice(index, 1)
        }
      }
    }
  }

  /**
   * Connect to WebSocket server
   */
  private connect(rideId: number) {
    try {
      const token = localStorage.getItem('token')
      const wsUrl = `${this.wsUrl.replace('http', 'ws')}/tracking?ride_id=${rideId}&token=${token}`
      
      this.socket = new WebSocket(wsUrl)

      this.socket.onopen = () => {
        console.log('WebSocket connected for real-time tracking')
        this.reconnectAttempts = 0
      }

      this.socket.onmessage = (event) => {
        try {
          const data: RideTracking = JSON.parse(event.data)
          
          // Call all listeners for this ride
          const callbacks = this.listeners.get(data.ride_id)
          if (callbacks) {
            callbacks.forEach(callback => callback(data))
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      this.socket.onclose = () => {
        console.log('WebSocket disconnected')
        this.attemptReconnect(rideId)
      }
    } catch (error) {
      console.error('WebSocket connection error:', error)
      this.attemptReconnect(rideId)
    }
  }

  /**
   * Attempt to reconnect with exponential backoff
   */
  private attemptReconnect(rideId: number) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
      console.log(`Attempting to reconnect in ${delay}ms...`)
      
      setTimeout(() => {
        this.connect(rideId)
      }, delay)
    } else {
      console.error('Max reconnection attempts reached')
    }
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close()
      this.socket = null
    }
    this.listeners.clear()
  }

  /**
   * Emit driver position update (for drivers)
   */
  updatePosition(update: PositionUpdate) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'position_update',
        data: update
      }))
    }
  }
}

export const realtimeTrackingService = new RealtimeTrackingService()

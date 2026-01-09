import axiosClient from './axiosClient'
import { Ride, CreateRideForm, RideDetails, MyRide, Booking } from '../types'

// Rides API endpoints
export const ridesApi = {
  // Get all available rides
  getRides: async (params?: {
    search?: string
    date?: string
    min_price?: number
    max_price?: number
    min_seats?: number
  }): Promise<Ride[]> => {
    const response = await axiosClient.get('/rides', { params })
    return response.data
  },
  
  // Get ride details
  getRideDetails: async (rideId: number): Promise<RideDetails> => {
    const response = await axiosClient.get(`/rides/${rideId}`)
    return response.data
  },

  // Get my rides (as driver)
  getMyRides: async (): Promise<MyRide[]> => {
    const response = await axiosClient.get('/my-rides')
    return response.data
  },

  // Get my bookings (as passenger)
  getMyBookings: async (): Promise<Booking[]> => {
    const response = await axiosClient.get('/my-bookings')
    return response.data
  },
  
  // Create new ride
  createRide: async (data: CreateRideForm): Promise<Ride> => {
    // Convert string values to numbers
    const payload = {
      ...data,
      price_per_seat: parseFloat(data.price_per_seat),
      available_seats: parseInt(data.available_seats),
      start_lat: data.start_lat ? parseFloat(data.start_lat.toString()) : null,
      start_lng: data.start_lng ? parseFloat(data.start_lng.toString()) : null,
      end_lat: data.end_lat ? parseFloat(data.end_lat.toString()) : null,
      end_lng: data.end_lng ? parseFloat(data.end_lng.toString()) : null,
    }
    const response = await axiosClient.post('/rides', payload)
    return response.data
  },
  
  // Book a ride
  bookRide: async (rideId: number, seatsBooked?: number): Promise<void> => {
    await axiosClient.post(`/rides/${rideId}/book`, { seats_booked: seatsBooked })
  },

  // Cancel a booking
  cancelBooking: async (rideId: number): Promise<void> => {
    await axiosClient.post(`/rides/${rideId}/cancel`)
  }
}
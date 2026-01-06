// Enums
export type VehicleType = 'car' | 'van' | 'suv'
export type VerificationStatus = 'verified' | 'pending' | 'unverified'
export type RideStatus = 'active' | 'completed' | 'cancelled'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

// Vehicle Management Types
export interface Vehicle {
  id: number
  user_id: number
  brand: string
  model: string
  year: number
  color: string
  license_plate: string
  seats: number
  vehicle_type: VehicleType
  verification_status: VerificationStatus
  photos: string[]
  created_at: string
  updated_at: string
}

// Rides Types
export interface Ride {
  id: number
  user_id: number
  car_id: number
  start_location: string
  end_location: string
  ride_date: string
  ride_time: string
  price_per_seat: number
  available_seats: number
  total_seats: number
  status: RideStatus
  driver: {
    id: number
    name: string
    email: string
  }
  vehicle: {
    brand: string
    model: string
    color: string
    license_plate: string
  }
  created_at: string
}

// Form Types
export interface CreateRideForm {
  car_id: string
  start_location: string
  end_location: string
  ride_date: string
  ride_time: string
  price_per_seat: string
  available_seats: string
}

export interface VehicleForm {
  brand: string
  model: string
  year: string
  color: string
  license_plate: string
  seats: string
  vehicle_type: VehicleType
  photos: File[]
}

// User Profile Types
export interface User {
  id: number
  name: string
  email: string
  phone?: string
  role: 'driver' | 'passenger'
  profile_photo?: string
  bio?: string
  city?: string
  average_rating: number
  total_reviews: number
  created_at: string
  vehicles?: Vehicle[]
  rides?: Ride[]
  bookings?: Booking[]
  reviewsReceived?: Review[]
}

export interface UserProfile {
  user: User
  stats: {
    total_rides_as_driver: number
    total_bookings_as_passenger: number
    completed_rides: number
  }
}

// Review Types
export interface Review {
  id: number
  reviewer_id: number
  reviewee_id: number
  ride_id: number
  rating: number
  comment?: string
  created_at: string
  reviewer?: {
    id: number
    name: string
    profile_photo?: string
  }
}

// Booking Types
export interface Booking {
  id: number
  seats_booked: number
  status: BookingStatus
  ride: {
    id: number
    start_location: string
    end_location: string
    ride_date: string
    ride_time: string
    price_per_seat: number
    status: RideStatus
    driver: {
      id: number
      name: string
      average_rating: number
    }
    vehicle: {
      brand: string
      model: string
    }
  }
  created_at: string
}

// My Ride (as driver) Types
export interface MyRide {
  id: number
  start_location: string
  end_location: string
  ride_date: string
  ride_time: string
  price_per_seat: number
  available_seats: number
  total_seats: number
  status: RideStatus
  vehicle: {
    brand: string
    model: string
  }
  passengers_count: number
  passengers: Array<{
    name: string
    seats: number
  }>
  created_at: string
}

// Detailed Ride Types
export interface RideDetails extends Ride {
  driver: {
    id: number
    name: string
    email: string
    profile_photo?: string
    bio?: string
    city?: string
    average_rating: number
    total_reviews: number
    reviewsReceived?: Review[]
  }
  vehicle: {
    id: number
    brand: string
    model: string
    year: number
    color: string
    license_plate: string
    seats: number
    vehicle_type: VehicleType
    photos: string[]
  }
  passengers: Array<{
    id: number
    name: string
    seats_booked: number
  }>
}
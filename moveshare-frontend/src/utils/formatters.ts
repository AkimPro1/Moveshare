import { VehicleType, VerificationStatus } from '../types'

// Date formatting
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Time formatting
export const formatTime = (time: string): string => {
  return time.slice(0, 5) // HH:MM
}

// Price formatting
export const formatPrice = (price: number | string | null | undefined): string => {
  if (price === null || price === undefined) return '0.00 €'
  const num = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(num)) return '0.00 €'
  return `${num.toFixed(2)} €`
}

// Vehicle type display
export const getVehicleTypeLabel = (type: VehicleType): string => {
  const labels: Record<VehicleType, string> = {
    car: 'Voiture',
    van: 'Van',
    suv: 'SUV'
  }
  return labels[type]
}

// Verification status display
export const getVerificationStatusLabel = (status: VerificationStatus): string => {
  const labels: Record<VerificationStatus, string> = {
    verified: 'Véhicule vérifié',
    pending: 'En attente de vérification',
    unverified: 'Non vérifié'
  }
  return labels[status]
}
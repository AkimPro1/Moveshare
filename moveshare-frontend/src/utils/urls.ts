/**
 * Utility functions for handling API URLs and file paths
 */

const API_BASE = 'http://127.0.0.1:8000'

/**
 * Build full URL for uploaded files
 * @param photoPath - Path from API response (e.g., "/api/files/vehicles/xyz.jpg")
 * @returns Full URL
 */
export function getImageUrl(photoPath: string): string {
  if (!photoPath) return ''
  
  // If it's already a full URL, return as-is
  if (photoPath.startsWith('http')) {
    return photoPath
  }
  
  // If it's a relative path without /api/, prepend base
  if (!photoPath.startsWith('/api/')) {
    return `${API_BASE}/api/files/${photoPath}`
  }
  
  // If it already has /api/, just prepend base
  return `${API_BASE}${photoPath}`
}

/**
 * Get image URL for vehicle photos
 */
export function getVehicleImageUrl(photoPath: string): string {
  return getImageUrl(photoPath)
}

/**
 * Get image URL for profile photos
 */
export function getProfileImageUrl(photoPath: string): string {
  return getImageUrl(photoPath)
}

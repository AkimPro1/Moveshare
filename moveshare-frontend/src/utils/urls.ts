/**
 * Utility functions for handling API URLs and file paths
 */

// API Base URL
const API_BASE = 'http://127.0.0.1:8000'

/**
 * Build full URL for uploaded files
 * Expects paths like: "/api/files/vehicles/abc.jpg"
 * Returns: "http://127.0.0.1:8000/api/files/vehicles/abc.jpg"
 */
export function getImageUrl(photoPath: string): string {
  if (!photoPath || typeof photoPath !== 'string') {
    return ''
  }
  
  // Trim and normalize slashes
  let path = photoPath.trim().replace(/\\/g, '/')

  // If it's already a full URL with protocol, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  // Ensure path starts with /
  if (!path.startsWith('/')) {
    path = '/' + path
  }

  // Construct full URL
  return `${API_BASE}${path}`
}

/**
 * Get image URL for vehicle photos
 * Expects array of photo paths from backend
 */
export function getVehicleImageUrl(photoPath: string | null | undefined): string {
  if (!photoPath) {
    return ''
  }
  return getImageUrl(photoPath)
}

/**
 * Get image URL for profile/user photos
 */
export function getProfileImageUrl(photoPath: string | null | undefined): string {
  if (!photoPath) {
    return ''
  }
  return getImageUrl(photoPath)
}

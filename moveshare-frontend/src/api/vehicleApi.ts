import axiosClient from './axiosClient'
import { Vehicle } from '../types'

// Vehicle API endpoints
export const vehicleApi = {
  // Get all vehicles for current user
  getVehicles: async (): Promise<Vehicle[]> => {
    const response = await axiosClient.get('/vehicles')
    return response.data
  },
  
  // Create new vehicle
  createVehicle: async (data: FormData): Promise<Vehicle> => {
    const response = await axiosClient.post('/vehicles', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },
  
  // Update vehicle
  updateVehicle: async (id: number, data: FormData): Promise<Vehicle> => {
    const response = await axiosClient.post(`/vehicles/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },
  
  // Delete vehicle
  deleteVehicle: async (id: number): Promise<void> => {
    await axiosClient.delete(`/vehicles/${id}`)
  }
}
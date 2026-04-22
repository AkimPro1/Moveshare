
import axiosClient from './axiosClient'

export const adminApi = {
    deleteVehicle: async (vehicleId: number) => {
      const response = await axiosClient.delete(`/admin/vehicles/${vehicleId}`)
      return response.data
    },
  getStats: async () => {
    const response = await axiosClient.get('/admin/stats')
    return response.data
  },

  getUsers: async (page = 1) => {
    const response = await axiosClient.get(`/admin/users?page=${page}`)
    return response.data
  },

  deleteUser: async (userId: number) => {
    const response = await axiosClient.delete(`/admin/users/${userId}`)
    return response.data
  },

  toggleAdmin: async (userId: number) => {
    const response = await axiosClient.post(`/admin/users/${userId}/toggle-admin`)
    return response.data
  },

  getVehicles: async (page = 1) => {
    const response = await axiosClient.get(`/admin/vehicles?page=${page}`)
    return response.data
  },

  verifyVehicle: async (vehicleId: number, status: 'verified' | 'pending' | 'unverified') => {
    const response = await axiosClient.post(`/admin/vehicles/${vehicleId}/verify`, { status })
    return response.data
  },

  getRides: async (page = 1) => {
    const response = await axiosClient.get(`/admin/rides?page=${page}`)
    return response.data
  },

  cancelRide: async (rideId: number) => {
    const response = await axiosClient.post(`/admin/rides/${rideId}/cancel`)
    return response.data
  },

  deleteRide: async (rideId: number) => {
    const response = await axiosClient.delete(`/admin/rides/${rideId}`)
    return response.data
  },

  getReviews: async (page = 1) => {
    const response = await axiosClient.get(`/admin/reviews?page=${page}`)
    return response.data
  },

  deleteReview: async (reviewId: number) => {
    const response = await axiosClient.delete(`/admin/reviews/${reviewId}`)
    return response.data
  }
}

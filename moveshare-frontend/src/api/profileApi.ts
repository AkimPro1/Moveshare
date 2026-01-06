import axiosClient from './axiosClient'
import { UserProfile, User } from '../types'

// Profile API endpoints
export const profileApi = {
  // Get current user's profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await axiosClient.get('/profile')
    return response.data
  },

  // Get specific user's profile (public)
  getUserProfile: async (userId: number): Promise<{ user: User; reviews: any[]; stats: any }> => {
    const response = await axiosClient.get(`/users/${userId}`)
    return response.data
  },

  // Update current user's profile
  updateProfile: async (data: FormData): Promise<{ message: string; user: User }> => {
    const response = await axiosClient.post('/profile', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }
}
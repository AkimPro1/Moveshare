import axiosClient from './axiosClient'
import { Review } from '../types'

// Review API endpoints
export const reviewApi = {
  // Get reviews for a user
  getUserReviews: async (userId: number): Promise<Review[]> => {
    const response = await axiosClient.get(`/users/${userId}/reviews`)
    return response.data
  },

  // Create a review
  createReview: async (data: {
    reviewee_id: number
    ride_id: number
    rating: number
    comment?: string
  }): Promise<{ message: string; review: Review }> => {
    const response = await axiosClient.post('/reviews', data)
    return response.data
  },

  // Delete a review
  deleteReview: async (reviewId: number): Promise<{ message: string }> => {
    const response = await axiosClient.delete(`/reviews/${reviewId}`)
    return response.data
  }
}
import axiosClient from './axiosClient'

export type PaymentMethod = 'flooz' | 'mixx' | 'card' | 'wallet'

export interface PaymentRequest {
  booking_id: number
  amount: number
  payment_method: PaymentMethod
  phone_number?: string
}

export const paymentApi = {
  processPayment: async (data: PaymentRequest) => {
    const response = await axiosClient.post('/payments/process', data)
    return response.data
  },

  getHistory: async () => {
    const response = await axiosClient.get('/payments/history')
    return response.data
  },

  cancelPayment: async (bookingId: number) => {
    const response = await axiosClient.post(`/payments/${bookingId}/cancel`)
    return response.data
  }
}

import axios from 'axios'

export interface GeocodingResult {
  lat: number
  lon: number
  display_name: string
}

export const geocodingService = {
  /**
   * Search for coordinates by address string
   */
  search: async (query: string): Promise<GeocodingResult | null> => {
    if (!query || query.length < 3) return null
    
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: query,
          format: 'json',
          limit: 1,
          addressdetails: 1
        },
        headers: {
          'Accept-Language': 'fr'
        }
      })
      
      if (response.data && response.data.length > 0) {
        const result = response.data[0]
        return {
          lat: parseFloat(result.lat),
          lon: parseFloat(result.lon),
          display_name: result.display_name
        }
      }
      return null
    } catch (error) {
      console.error('Geocoding error:', error)
      return null
    }
  },

  /**
   * Get suggestions for address auto-completion
   */
  getSuggestions: async (query: string): Promise<GeocodingResult[]> => {
    if (!query || query.length < 3) return []
    
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: query,
          format: 'json',
          limit: 5,
          addressdetails: 1,
          countrycodes: 'tg,bj,ci,sn' 
        },
        headers: {
          'Accept-Language': 'fr'
        }
      })
      
      return (response.data || []).map((result: any) => ({
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        display_name: result.display_name
      }))
    } catch (error) {
      console.error('Autocomplete error:', error)
      return []
    }
  }
}

import { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Loader2 } from 'lucide-react'
import { geocodingService, GeocodingResult } from '../api/geocodingService'
import './AddressAutocomplete.css'

interface AddressAutocompleteProps {
  label: string
  placeholder?: string
  value: string
  onChange: (address: string, lat?: number, lon?: number) => void
  icon?: React.ReactNode
  required?: boolean
}

export default function AddressAutocomplete({ 
  label, 
  placeholder, 
  value, 
  onChange,
  icon,
  required 
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update internal query when prop value changes (e.g. form reset)
  useEffect(() => {
    setQuery(value)
  }, [value])

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 3 && query !== value) {
        setLoading(true)
        const results = await geocodingService.getSuggestions(query)
        setSuggestions(results)
        setShowSuggestions(true)
        setLoading(false)
      } else {
        setSuggestions([])
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query, value])

  const handleSelect = (s: GeocodingResult) => {
    setQuery(s.display_name)
    onChange(s.display_name, s.lat, s.lon)
    setShowSuggestions(false)
  }

  return (
    <div className="address-autocomplete" ref={containerRef}>
      <label className="form-label">{label}</label>
      <div className="input-wrapper">
        <div className="input-icon">
          {icon || <MapPin style={{ width: 18, height: 18 }} />}
        </div>
        <input
          type="text"
          className="form-input with-icon"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            // Only call onChange with text, let parent handle coordinate clearing
            // This will be updated with coordinates when user selects from suggestions
          }}
          onFocus={() => query.length >= 3 && setShowSuggestions(true)}
          required={required}
        />
        {loading && (
          <div className="input-loader">
            <Loader2 className="animate-spin" style={{ width: 16, height: 16 }} />
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => handleSelect(s)} className="suggestion-item">
              <MapPin style={{ width: 14, height: 14, flexShrink: 0 }} />
              <span className="suggestion-text">{s.display_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

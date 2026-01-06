import React from 'react'
import './Select.css'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  fullWidth?: boolean
  options?: { value: string; label: string }[]
  children?: React.ReactNode
}

export default function Select({
  label,
  error,
  fullWidth = true,
  options,
  children,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className={`ms-select-wrapper ${fullWidth ? 'ms-select-full' : ''}`}>
      {label && (
        <label htmlFor={selectId} className="ms-select-label">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`ms-select ${error ? 'ms-select-error' : ''} ${className}`}
        {...props}
      >
        {options ? (
          options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          children
        )}
      </select>
      {error && <span className="ms-select-error-text">{error}</span>}
    </div>
  )
}
import React from 'react'
import './Input.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  fullWidth?: boolean
}

export default function Input({
  label,
  error,
  icon,
  fullWidth = true,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className={`ms-input-wrapper ${fullWidth ? 'ms-input-full' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="ms-input-label">
          {label}
        </label>
      )}
      <div className="ms-input-container">
        {icon && <span className="ms-input-icon">{icon}</span>}
        <input
          id={inputId}
          className={`ms-input ${icon ? 'ms-input-with-icon' : ''} ${error ? 'ms-input-error' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="ms-input-error-text">{error}</span>}
    </div>
  )
}
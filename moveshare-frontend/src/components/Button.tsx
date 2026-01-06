import React from 'react'
import './Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const classes = [
    'ms-button',
    `ms-button-${variant}`,
    `ms-button-${size}`,
    fullWidth && 'ms-button-full',
    loading && 'ms-button-loading',
    className
  ].filter(Boolean).join(' ')

  return (
    <button 
      className={classes} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="ms-button-spinner" />}
      {icon && <span className="ms-button-icon">{icon}</span>}
      {children}
    </button>
  )
}
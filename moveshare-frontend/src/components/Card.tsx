import React from 'react'
import './Card.css'

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
}

export default function Card({ 
  children, 
  className = '', 
  hoverable = false,
  onClick 
}: CardProps) {
  return (
    <div 
      className={`ms-card ${hoverable ? 'ms-card-hoverable' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}
import React from 'react'
import { motion } from 'framer-motion'
import './Card.css'

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
  delay?: number
}

export default function Card({ 
  children, 
  className = '', 
  hoverable = false,
  onClick,
  delay = 0
}: CardProps) {
  return (
    <motion.div 
      className={`ms-card ${hoverable ? 'ms-card-hoverable' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      whileHover={hoverable ? { 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }
      } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
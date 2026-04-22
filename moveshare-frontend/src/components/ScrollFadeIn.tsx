import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface ScrollFadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  className?: string
}

/**
 * Composant wrapper qui anime ses enfants avec un fade-in au scroll
 * Supporte différentes directions d'apparition
 */
export default function ScrollFadeIn({ 
  children, 
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = ''
}: ScrollFadeInProps) {
  const { elementRef, isVisible } = useScrollAnimation()

  // Calcul du mouvement initial basé sur la direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 40, x: 0 }
      case 'down':
        return { y: -40, x: 0 }
      case 'left':
        return { x: 40, y: 0 }
      case 'right':
        return { x: -40, y: 0 }
      case 'none':
      default:
        return { x: 0, y: 0 }
    }
  }

  const initial = getInitialPosition()

  return (
    <motion.div
      ref={elementRef}
      initial={{ 
        opacity: 0,
        ...initial
      }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : initial.x,
        y: isVisible ? 0 : initial.y
      }}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1] // Courbe d'easing personnalisée pour plus de fluidité
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

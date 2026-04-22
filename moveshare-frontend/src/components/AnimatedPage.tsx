import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const animations = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.98
  },
}

interface Props {
  children: ReactNode
}

export default function AnimatedPage({ children }: Props) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ 
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1] // Courbe d'easing personnalisée pour plus de fluidité
      }}
    >
      {children}
    </motion.div>
  )
}

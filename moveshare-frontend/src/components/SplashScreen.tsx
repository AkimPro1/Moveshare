import { useEffect, useState } from 'react'
import { Car } from 'lucide-react'
import './SplashScreen.css'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Show splash for 2 seconds then start exit animation
    const timer = setTimeout(() => {
      setIsExiting(true)
      // Wait for exit animation to complete (0.5s)
      setTimeout(onComplete, 500)
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`ms-splash-screen ${isExiting ? 'ms-splash-exit' : ''}`}>
      <div className="ms-splash-content">
        <div className="ms-splash-logo">
          <Car size={64} className="ms-splash-icon" />
          <h1 className="ms-splash-title">MoveShare</h1>
        </div>
        <div className="ms-splash-loader">
          <div className="ms-splash-loader-bar"></div>
        </div>
      </div>
    </div>
  )
}

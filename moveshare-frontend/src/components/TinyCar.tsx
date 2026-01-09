import { useEffect, useRef, useState } from 'react'
import './TinyCar.css'

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default function TinyCar() {
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight * 0.8 })
  const [rotation, setRotation] = useState(45)
  const [isDragging, setIsDragging] = useState(false)
  const lastPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight * 0.8 })
  const dragOffset = useRef({ x: 0, y: 0 })

  // Automatic movement logic
  useEffect(() => {
    if (isDragging) return
    let cancelled = false

    const move = () => {
      if (cancelled || isDragging) return
      
      const vw = window.innerWidth
      const vh = window.innerHeight
      const margin = 120
      
      const nextX = rand(margin, vw - margin)
      const nextY = rand(margin, vh - margin)

      const dx = nextX - lastPos.current.x
      const dy = nextY - lastPos.current.y
      const angleRad = Math.atan2(dy, dx)
      const angleDeg = (angleRad * 180) / Math.PI

      setRotation(angleDeg)
      setPos({ x: nextX, y: nextY })
      lastPos.current = { x: nextX, y: nextY }

      const nextIn = rand(5000, 10000)
      setTimeout(move, nextIn)
    }

    const initial = setTimeout(move, 2000)
    return () => {
      cancelled = true
      clearTimeout(initial)
    }
  }, [isDragging])

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    dragOffset.current = {
      x: e.clientX - (rect.left + rect.width / 2),
      y: e.clientY - (rect.top + rect.height / 2)
    }
    // Set cursor to grabbing
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    
    const nextX = e.clientX - dragOffset.current.x
    const nextY = e.clientY - dragOffset.current.y
    
    // Calculate rotation during drag to look at cursor movement
    const dx = nextX - lastPos.current.x
    const dy = nextY - lastPos.current.y
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
      const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI
      setRotation(angleDeg)
    }

    setPos({ x: nextX, y: nextY })
    lastPos.current = { x: nextX, y: nextY }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const style = {
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotateX(65deg) rotateZ(${rotation}deg)`,
    transition: isDragging ? 'none' : 'transform 4.5s cubic-bezier(0.45, 0.05, 0.55, 0.95)',
    cursor: isDragging ? 'grabbing' : 'grab'
  }

  return (
    <div className="tiny-car-container" aria-hidden>
      <div 
        className={`tiny-car-3d ${isDragging ? 'dragging' : ''}`} 
        style={style}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Shadow */}
        <div className="car-shadow-3d"></div>

        {/* Main Body (Base) */}
        <div className="car-base">
          <div className="face front">
            <div className="headlight l"></div>
            <div className="headlight r"></div>
          </div>
          <div className="face back"></div>
          <div className="face left"></div>
          <div className="face right"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>

        {/* Cabin (Top Part) */}
        <div className="car-cabin">
          <div className="face front"><div className="window"></div></div>
          <div className="face back"><div className="window"></div></div>
          <div className="face left"><div className="window"></div></div>
          <div className="face right"><div className="window"></div></div>
          <div className="face top"></div>
        </div>

        {/* Wheels */}
        <div className="wheel-3d fl"></div>
        <div className="wheel-3d fr"></div>
        <div className="wheel-3d bl"></div>
        <div className="wheel-3d br"></div>
      </div>
    </div>
  )
}

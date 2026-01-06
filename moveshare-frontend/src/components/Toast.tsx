import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import './Toast.css'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  id: string
  type: ToastType
  message: string
  onClose: (id: string) => void
  duration?: number
}

export default function Toast({ id, type, message, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose])

  const icons = {
    success: <CheckCircle style={{ width: 20, height: 20 }} />,
    error: <AlertCircle style={{ width: 20, height: 20 }} />,
    info: <Info style={{ width: 20, height: 20 }} />,
    warning: <AlertTriangle style={{ width: 20, height: 20 }} />
  }

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">{icons[type]}</div>
      <div className="toast-message">{message}</div>
      <button 
        className="toast-close"
        onClick={() => onClose(id)}
        aria-label="Fermer"
      >
        <X style={{ width: 18, height: 18 }} />
      </button>
    </div>
  )
}
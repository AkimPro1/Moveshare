import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ToastProvider } from './components/ToastContainer'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import SplashScreen from './components/SplashScreen'
import AnimatedPage from './components/AnimatedPage'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import CreateRide from './pages/CreateRide'
import RidesList from './pages/RidesList'
import RideDetails from './pages/RideDetails'
import VehicleManagement from './pages/VehicleManagement'
import Profile from './pages/Profile'
import MyRides from './pages/MyRides'
import MyBookings from './pages/MyBookings'
import Entertainment from './pages/Entertainment'
import AdminDashboard from './pages/AdminDashboard'

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
        <Route path="/rides" element={<AnimatedPage><RidesList /></AnimatedPage>} />
        <Route path="/rides/create" element={<AnimatedPage><CreateRide /></AnimatedPage>} />
        <Route path="/rides/:id" element={<AnimatedPage><RideDetails /></AnimatedPage>} />
        <Route path="/my-rides" element={<AnimatedPage><MyRides /></AnimatedPage>} />
        <Route path="/my-bookings" element={<AnimatedPage><MyBookings /></AnimatedPage>} />
        <Route path="/vehicles" element={<AnimatedPage><VehicleManagement /></AnimatedPage>} />
        <Route path="/entertainment" element={<AnimatedPage><Entertainment /></AnimatedPage>} />
        <Route path="/admin" element={<AnimatedPage><AdminDashboard /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  if (showSplash) {
    return (
      <ThemeProvider>
        <SplashScreen onComplete={() => setShowSplash(false)} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Header />
          <AnimatedRoutes />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/ToastContainer'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
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
import TinyCar from './components/TinyCar'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rides" element={<RidesList />} />
        <Route path="/rides/create" element={<CreateRide />} />
        <Route path="/rides/:id" element={<RideDetails />} />
        <Route path="/my-rides" element={<MyRides />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/vehicles" element={<VehicleManagement />} />
        <Route path="/entertainment" element={<Entertainment />} />
        </Routes>
        <TinyCar />
      </BrowserRouter>
    </ToastProvider>
    </ThemeProvider>
  )
}

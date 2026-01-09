import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Car, MapPin, User, LogOut, Settings, Calendar, BookOpen, Menu, X, Sparkles, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import axiosClient from '../api/axiosClient'
import './Header.css'

function initialsFromName(name?: string, email?: string) {
  if (!name && !email) return ''
  const source = (name || email || '').trim()
  const parts = source.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [initials, setInitials] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const hideAuthLink = pathname === '/login' || pathname === '/register'
  const isLoggedIn = !!localStorage.getItem('token')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setInitials(null)
      setUserName(null)
      return
    }

    let cancelled = false
    ;(async () => {
      try {
        const res = await axiosClient.get('/me')
        if (cancelled) return
        const user = res.data
        const name = user?.name
        const email = user?.email
        const init = initialsFromName(name, email)
        setInitials(init || null)
        setUserName(name || email || null)
      } catch (e) {
        setInitials(null)
        setUserName(null)
      }
    })()

    return () => { cancelled = true }
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setInitials(null)
    setUserName(null)
    setShowUserMenu(false)
    navigate('/login')
  }

  return (
    <header className="ms-global-header">
      <div className="ms-container ms-global-inner">
        <Link to="/" className="ms-logo">
          <Car style={{ width: 24, height: 24 }} />
          MoveShare
        </Link>

        {/* Desktop Navigation */}
        {isLoggedIn && !hideAuthLink && (
          <nav className="ms-nav-desktop">
            <Link 
              to="/rides" 
              className={`ms-nav-link ${pathname === '/rides' ? 'active' : ''}`}
            >
              <MapPin style={{ width: 18, height: 18 }} />
              Trajets
            </Link>
            <Link 
              to="/rides/create" 
              className={`ms-nav-link ${pathname === '/rides/create' ? 'active' : ''}`}
            >
              <Car style={{ width: 18, height: 18 }} />
              Proposer
            </Link>
            <Link 
              to="/my-rides" 
              className={`ms-nav-link ${pathname === '/my-rides' ? 'active' : ''}`}
            >
              <Calendar style={{ width: 18, height: 18 }} />
              Mes trajets
            </Link>
            <Link 
              to="/my-bookings" 
              className={`ms-nav-link ${pathname === '/my-bookings' ? 'active' : ''}`}
            >
              <BookOpen style={{ width: 18, height: 18 }} />
              Réservations
            </Link>
            <Link 
              to="/vehicles" 
              className={`ms-nav-link ${pathname === '/vehicles' ? 'active' : ''}`}
            >
              <Settings style={{ width: 18, height: 18 }} />
              Véhicules
            </Link>
            <Link 
              to="/entertainment" 
              className={`ms-nav-link ${pathname === '/entertainment' ? 'active' : ''}`}
            >
              <Sparkles style={{ width: 18, height: 18 }} />
              Divertissement
            </Link>
          </nav>
        )}

        <div className="ms-header-actions">
          {!hideAuthLink && (
            <>
              {/* Theme Toggle */}
              <button
                className="ms-theme-toggle"
                onClick={toggleTheme}
                aria-label="Basculer le thème"
              >
                {theme === 'light' ? (
                  <Moon style={{ width: 20, height: 20 }} />
                ) : (
                  <Sun style={{ width: 20, height: 20 }} />
                )}
              </button>

              {isLoggedIn && initials ? (
                <div className="ms-user-menu">
                  <button 
                    className="ms-avatar-button"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    aria-label="Menu utilisateur"
                  >
                    {initials}
                  </button>
                  
                  {showUserMenu && (
                    <>
                      <div 
                        className="ms-menu-backdrop"
                        onClick={() => setShowUserMenu(false)}
                      />
                      <div className="ms-dropdown-menu">
                        <div className="ms-dropdown-header">
                          <div className="ms-dropdown-avatar">{initials}</div>
                          <div className="ms-dropdown-user-info">
                            <div className="ms-dropdown-user-name">{userName}</div>
                            <div className="ms-dropdown-user-role">Membre</div>
                          </div>
                        </div>
                        
                        <div className="ms-dropdown-divider" />
                        
                        <Link 
                          to="/profile" 
                          className="ms-dropdown-item"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User style={{ width: 18, height: 18 }} />
                          Mon profil
                        </Link>
                        
                        <div className="ms-dropdown-divider" />
                        
                        <button 
                          className="ms-dropdown-item ms-dropdown-item-danger"
                          onClick={handleLogout}
                        >
                          <LogOut style={{ width: 18, height: 18 }} />
                          Déconnexion
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link to="/login" className="ms-login-button">
                  Se connecter
                </Link>
              )}
            </>
          )}

          {/* Mobile Menu Toggle */}
          {isLoggedIn && !hideAuthLink && (
            <button 
              className="ms-mobile-menu-toggle"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Menu"
            >
              {showMobileMenu ? (
                <X style={{ width: 24, height: 24 }} />
              ) : (
                <Menu style={{ width: 24, height: 24 }} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isLoggedIn && !hideAuthLink && showMobileMenu && (
        <>
          <div 
            className="ms-mobile-backdrop"
            onClick={() => setShowMobileMenu(false)}
          />
          <nav className="ms-nav-mobile">
            <Link 
              to="/rides" 
              className={`ms-mobile-nav-link ${pathname === '/rides' ? 'active' : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              <MapPin style={{ width: 20, height: 20 }} />
              Trajets
            </Link>
            <Link 
              to="/rides/create" 
              className={`ms-mobile-nav-link ${pathname === '/rides/create' ? 'active' : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              <Car style={{ width: 20, height: 20 }} />
              Proposer un trajet
            </Link>
            <Link 
              to="/my-rides" 
              className={`ms-mobile-nav-link ${pathname === '/my-rides' ? 'active' : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              <Calendar style={{ width: 20, height: 20 }} />
              Mes trajets
            </Link>
            <Link 
              to="/my-bookings" 
              className={`ms-mobile-nav-link ${pathname === '/my-bookings' ? 'active' : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              <BookOpen style={{ width: 20, height: 20 }} />
              Mes réservations
            </Link>
            <Link 
              to="/vehicles" 
              className={`ms-mobile-nav-link ${pathname === '/vehicles' ? 'active' : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              <Settings style={{ width: 20, height: 20 }} />
              Véhicules
            </Link>
            <Link 
              to="/entertainment" 
              className={`ms-mobile-nav-link ${pathname === '/entertainment' ? 'active' : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              <Sparkles style={{ width: 20, height: 20 }} />
              Divertissement
            </Link>
          </nav>
        </>
      )}
    </header>
  )
}
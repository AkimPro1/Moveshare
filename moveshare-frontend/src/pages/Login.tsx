import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, LogIn } from 'lucide-react'
import axiosClient from '../api/axiosClient'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      const res = await axiosClient.post('/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err: any) {
      const resp = err?.response
      setError(resp?.data?.message || 'Échec de la connexion. Vérifiez vos identifiants.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <div className="login-logo">MoveShare</div>
            <h1>Bienvenue !</h1>
            <p>Connectez-vous pour continuer</p>
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="login-form">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail style={{ width: 18, height: 18 }} />}
              required
              autoComplete="email"
            />

            <Input
              label="Mot de passe"
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock style={{ width: 18, height: 18 }} />}
              required
              autoComplete="current-password"
            />

            <Button 
              type="submit" 
              size="lg" 
              fullWidth
              loading={loading}
              disabled={loading}
            >
              <LogIn style={{ width: 18, height: 18 }} />
              Se connecter
            </Button>
          </form>

          <div className="login-footer">
            <p>
              Pas encore de compte ?{' '}
              <Link to="/register" className="login-link">
                Créer un compte
              </Link>
            </p>
          </div>
        </Card>

        <div className="login-features">
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <div className="feature-text">
              <strong>Voyagez économique</strong>
              <span>Partagez les frais de route</span>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <div className="feature-text">
              <strong>100% sécurisé</strong>
              <span>Profils vérifiés et notés</span>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <div className="feature-text">
              <strong>Communauté active</strong>
              <span>50K+ utilisateurs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Mail, Phone, Lock, UserPlus } from 'lucide-react'
import axiosClient from '../api/axiosClient'
import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'
import Card from '../components/Card'
import './Register.css'

type FormState = {
  name: string
  email: string
  phone: string
  role: 'passenger' | 'driver'
  password: string
  password_confirmation: string
}

export default function Register() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    role: 'passenger',
    password: '',
    password_confirmation: '',
  })
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalError(null)
    setErrors({})
    setLoading(true)

    try {
      const res = await axiosClient.post('/register', form)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err: any) {
      const resp = err?.response
      if (resp?.status === 422 && resp.data?.errors) {
        setErrors(resp.data.errors)
      } else {
        setGlobalError(resp?.data?.message || 'Échec de l\'inscription. Veuillez réessayer.')
      }
    } finally {
      setLoading(false)
    }
  }

  const getFieldError = (field: string): string | undefined => {
    const list = errors[field]
    return list && list.length > 0 ? list[0] : undefined
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <Card className="register-card">
          <div className="register-header">
            <div className="register-logo">MoveShare</div>
            <h1>Créer un compte</h1>
            <p>Rejoignez notre communauté de covoiturage</p>
          </div>

          {globalError && (
            <div className="register-error">
              {globalError}
            </div>
          )}

          <form onSubmit={onSubmit} className="register-form">
            <Input
              label="Nom complet"
              type="text"
              name="name"
              placeholder="Jean Dupont"
              value={form.name}
              onChange={onChange}
              icon={<User style={{ width: 18, height: 18 }} />}
              error={getFieldError('name')}
              required
              autoComplete="name"
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="jean.dupont@email.com"
              value={form.email}
              onChange={onChange}
              icon={<Mail style={{ width: 18, height: 18 }} />}
              error={getFieldError('email')}
              required
              autoComplete="email"
            />

            <Input
              label="Téléphone"
              type="tel"
              name="phone"
              placeholder="06 12 34 56 78"
              value={form.phone}
              onChange={onChange}
              icon={<Phone style={{ width: 18, height: 18 }} />}
              error={getFieldError('phone')}
              autoComplete="tel"
            />

            <Select
              label="Type de compte"
              name="role"
              value={form.role}
              onChange={onChange}
              error={getFieldError('role')}
            >
              <option value="passenger">Passager - Je cherche des trajets</option>
              <option value="driver">Conducteur - Je propose des trajets</option>
            </Select>

            <Input
              label="Mot de passe"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={onChange}
              icon={<Lock style={{ width: 18, height: 18 }} />}
              error={getFieldError('password')}
              required
              autoComplete="new-password"
            />

            <Input
              label="Confirmer le mot de passe"
              type="password"
              name="password_confirmation"
              placeholder="••••••••"
              value={form.password_confirmation}
              onChange={onChange}
              icon={<Lock style={{ width: 18, height: 18 }} />}
              required
              autoComplete="new-password"
            />

            <Button 
              type="submit" 
              size="lg" 
              fullWidth
              loading={loading}
              disabled={loading}
            >
              <UserPlus style={{ width: 18, height: 18 }} />
              Créer mon compte
            </Button>
          </form>

          <div className="register-footer">
            <p>
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="register-link">
                Se connecter
              </Link>
            </p>
          </div>
        </Card>

        <div className="register-benefits">
          <h2>Pourquoi rejoindre MoveShare ?</h2>
          
          <div className="benefit-list">
            <div className="benefit-item">
              <div className="benefit-icon">🚗</div>
              <div className="benefit-content">
                <h3>Économisez sur vos trajets</h3>
                <p>Partagez les frais d'essence et de péage avec d'autres passagers</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🌍</div>
              <div className="benefit-content">
                <h3>Réduisez votre empreinte carbone</h3>
                <p>Contribuez à un transport plus écologique en partageant vos trajets</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">👥</div>
              <div className="benefit-content">
                <h3>Rencontrez de nouvelles personnes</h3>
                <p>Voyagez en bonne compagnie et élargissez votre réseau</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">⭐</div>
              <div className="benefit-content">
                <h3>Confiance et sécurité</h3>
                <p>Profils vérifiés, système de notation et support 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
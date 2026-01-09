import { useState, useEffect } from 'react'
import { User, MapPin, Mail, Phone, Edit2, Camera, Award, Car, Users } from 'lucide-react'
import { profileApi } from '../api/profileApi'
import { UserProfile } from '../types'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'
import StarRating from '../components/StarRating'
import ReviewCard from '../components/ReviewCard'
import './Profile.css'

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    city: ''
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      const data = await profileApi.getProfile()
      setProfile(data)
      setFormData({
        name: data.user.name,
        phone: data.user.phone || '',
        bio: data.user.bio || '',
        city: data.user.city || ''
      })
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erreur lors du chargement du profil. Vérifiez que MySQL est lancé.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)

      const data = new FormData()
      data.append('name', formData.name)
      data.append('phone', formData.phone)
      data.append('bio', formData.bio)
      data.append('city', formData.city)
      
      if (photoFile) {
        data.append('profile_photo', photoFile)
      }

      await profileApi.updateProfile(data)
      await loadProfile()
      setEditMode(false)
      setPhotoFile(null)
      setPhotoPreview(null)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erreur lors de la mise à jour')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="profile-page">
        <div className="ms-container">
          <div className="profile-loading">Chargement...</div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <div className="ms-container">
          <Card className="profile-error">
            <p>Impossible de charger le profil</p>
          </Card>
        </div>
      </div>
    )
  }

  const userInitials = (profile.user.name || 'U').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  const photoUrl = profile.user.profile_photo 
    ? `http://127.0.0.1:8000/storage/${profile.user.profile_photo}` 
    : null

  return (
    <div className="profile-page">
      <div className="ms-container">
        <div className="profile-header">
          <h1>Mon Profil</h1>
          <Button 
            variant="outline" 
            icon={<Edit2 style={{ width: 18, height: 18 }} />}
            onClick={() => setEditMode(true)}
          >
            Modifier
          </Button>
        </div>

        <div className="profile-content">
          <div className="profile-main">
            <Card className="profile-card">
              <div className="profile-header-section">
                <div className="profile-photo-section">
                  {photoUrl ? (
                    <img src={photoUrl} alt={profile.user.name} className="profile-photo" />
                  ) : (
                    <div className="profile-photo profile-photo-fallback">
                      {userInitials}
                    </div>
                  )}
                </div>

                <div className="profile-info">
                  <h2>{profile.user.name}</h2>
                  <div className="profile-rating">
                    <StarRating rating={profile.user.average_rating} size={20} />
                    <span className="profile-rating-text">
                      {profile.user.average_rating.toFixed(1)} ({profile.user.total_reviews} avis)
                    </span>
                  </div>
                  
                  <div className="profile-details">
                    <div className="profile-detail">
                      <Mail style={{ width: 16, height: 16 }} />
                      <span>{profile.user.email}</span>
                    </div>
                    {profile.user.phone && (
                      <div className="profile-detail">
                        <Phone style={{ width: 16, height: 16 }} />
                        <span>{profile.user.phone}</span>
                      </div>
                    )}
                    {profile.user.city && (
                      <div className="profile-detail">
                        <MapPin style={{ width: 16, height: 16 }} />
                        <span>{profile.user.city}</span>
                      </div>
                    )}
                  </div>

                  {profile.user.bio && (
                    <div className="profile-bio">
                      <p>{profile.user.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <div className="profile-stats-grid">
              <Card className="stat-card">
                <div className="stat-icon">
                  <Car style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
                </div>
                <div className="stat-value">{profile.stats.total_rides_as_driver}</div>
                <div className="stat-label">Trajets proposés</div>
              </Card>

              <Card className="stat-card">
                <div className="stat-icon">
                  <Users style={{ width: 32, height: 32, color: 'var(--ms-accent)' }} />
                </div>
                <div className="stat-value">{profile.stats.total_bookings_as_passenger}</div>
                <div className="stat-label">Réservations</div>
              </Card>

              <Card className="stat-card">
                <div className="stat-icon">
                  <Award style={{ width: 32, height: 32, color: 'var(--ms-success)' }} />
                </div>
                <div className="stat-value">{profile.stats.completed_rides}</div>
                <div className="stat-label">Trajets terminés</div>
              </Card>
            </div>
          </div>

          <div className="profile-sidebar">
            <Card className="reviews-section">
              <h3>Avis reçus ({profile.user.total_reviews})</h3>
              
              {profile.user.reviewsReceived && profile.user.reviewsReceived.length > 0 ? (
                <div className="reviews-list">
                  {profile.user.reviewsReceived.map((review: any) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="no-reviews">Aucun avis pour le moment</p>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Modal
        isOpen={editMode}
        onClose={() => {
          setEditMode(false)
          setPhotoFile(null)
          setPhotoPreview(null)
        }}
        title="Modifier mon profil"
      >
        <div className="profile-edit-form">
          {error && (
            <div className="profile-error-message">{error}</div>
          )}

          <div className="profile-photo-upload">
            <div className="photo-upload-preview">
              {photoPreview || photoUrl ? (
                <img 
                  src={photoPreview || photoUrl || ''} 
                  alt="Preview" 
                  className="profile-photo"
                />
              ) : (
                <div className="profile-photo profile-photo-fallback">
                  {userInitials}
                </div>
              )}
            </div>
            <label className="photo-upload-button">
              <Camera style={{ width: 18, height: 18 }} />
              Changer la photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <Input
            label="Nom complet"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Téléphone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            icon={<Phone style={{ width: 18, height: 18 }} />}
          />

          <Input
            label="Ville"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            icon={<MapPin style={{ width: 18, height: 18 }} />}
          />

          <div className="form-group">
            <label className="form-label">Bio</label>
            <textarea
              className="form-textarea"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              maxLength={500}
              placeholder="Parlez-nous un peu de vous..."
            />
            <div className="form-hint">{formData.bio.length}/500 caractères</div>
          </div>

          <div className="modal-actions">
            <Button 
              variant="outline" 
              onClick={() => setEditMode(false)}
              disabled={saving}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleSave}
              loading={saving}
              disabled={saving}
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { Car, Plus, Edit, Trash2, Camera, BadgeCheck } from 'lucide-react'
import { vehicleApi } from '../api/vehicleApi'
import { Vehicle, VehicleForm, VehicleType } from '../types'
import { getVehicleImageUrl } from '../utils/urls'
import { getVehicleTypeLabel, getVerificationStatusLabel } from '../utils/formatters'
import Button from '../components/Button'
import Card from '../components/Card'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Select from '../components/Select'
import './VehicleManagement.css'

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [deletingVehicle, setDeletingVehicle] = useState<Vehicle | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])

  const [form, setForm] = useState<VehicleForm>({
    brand: '',
    model: '',
    year: '',
    color: '',
    license_plate: '',
    seats: '',
    vehicle_type: 'car',
    photos: []
  })

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    try {
      setLoading(true)
      const data = await vehicleApi.getVehicles()
      setVehicles(data)
    } catch (err) {
      console.error('Failed to load vehicles:', err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({
      brand: '',
      model: '',
      year: '',
      color: '',
      license_plate: '',
      seats: '',
      vehicle_type: 'car',
      photos: []
    })
    setPhotoPreviews([])
    setEditingVehicle(null)
  }

  const handleAdd = () => {
    resetForm()
    setShowModal(true)
  }

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setForm({
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year.toString(),
      color: vehicle.color,
      license_plate: vehicle.license_plate,
      seats: vehicle.seats.toString(),
      vehicle_type: vehicle.vehicle_type,
      photos: []
    })
    // Set photo previews with full URLs for existing photos
    setPhotoPreviews(vehicle.photos.map(p => getVehicleImageUrl(p)))
    setShowModal(true)
  }

  const handleDeleteClick = (vehicle: Vehicle) => {
    setDeletingVehicle(vehicle)
    setShowDeleteModal(true)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setForm({ ...form, photos: files })
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file))
    setPhotoPreviews(previews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('brand', form.brand)
      formData.append('model', form.model)
      formData.append('year', form.year)
      formData.append('color', form.color)
      formData.append('license_plate', form.license_plate)
      formData.append('seats', form.seats)
      formData.append('vehicle_type', form.vehicle_type)
      
      if (editingVehicle) {
        formData.append('_method', 'PUT')
      }
      
      form.photos.forEach((photo, index) => {
        formData.append(`photos[${index}]`, photo)
      })

      if (editingVehicle) {
        await vehicleApi.updateVehicle(editingVehicle.id, formData)
      } else {
        await vehicleApi.createVehicle(formData)
      }

      await loadVehicles()
      setShowModal(false)
      resetForm()
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Erreur lors de l\'enregistrement')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingVehicle) return

    try {
      await vehicleApi.deleteVehicle(deletingVehicle.id)
      await loadVehicles()
      setShowDeleteModal(false)
      setDeletingVehicle(null)
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Erreur lors de la suppression')
    }
  }

  const vehicleTypeOptions = [
    { value: 'car', label: 'Voiture' },
    { value: 'van', label: 'Van' },
    { value: 'suv', label: 'SUV' }
  ]

  return (
    <div className="vehicle-management-page">
      <div className="ms-container">
        <div className="vehicle-header">
          <div>
            <h1>Mes véhicules</h1>
            <p>Gérez vos véhicules pour le covoiturage</p>
          </div>
          <Button 
            onClick={handleAdd}
            icon={<Plus style={{ width: 18, height: 18 }} />}
          >
            Ajouter un véhicule
          </Button>
        </div>

        {loading ? (
          <div className="vehicle-loading">
            <div className="spinner"></div>
            <p>Chargement...</p>
          </div>
        ) : vehicles.length === 0 ? (
          <Card className="vehicle-empty">
            <Car style={{ width: 48, height: 48, color: 'var(--ms-muted)' }} />
            <h2>Aucun véhicule</h2>
            <p>Ajoutez votre premier véhicule pour commencer à proposer des trajets</p>
            <Button onClick={handleAdd}>
              Ajouter un véhicule
            </Button>
          </Card>
        ) : (
          <div className="vehicle-grid">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="vehicle-card">
                <div className="vehicle-photos">
                  {vehicle.photos && vehicle.photos.length > 0 ? (
                    <img 
                      src={getVehicleImageUrl(vehicle.photos[0])} 
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="vehicle-photo"
                      onError={(e) => {
                        // Fallback to placeholder on error
                        e.currentTarget.src = ''
                        e.currentTarget.style.display = 'none'
                        const parent = e.currentTarget.parentElement
                        if (parent) {
                          const placeholder = parent.querySelector('.vehicle-photo-placeholder')
                          if (placeholder) placeholder.style.display = 'flex'
                        }
                      }}
                    />
                  ) : null}
                  <div 
                    className="vehicle-photo-placeholder"
                    style={{ display: vehicle.photos && vehicle.photos.length > 0 ? 'none' : 'flex' }}
                  >
                    <Car style={{ width: 40, height: 40, color: 'var(--ms-muted)' }} />
                  </div>
                  {vehicle.verification_status === 'verified' && (
                    <div className="vehicle-verified-badge">
                      <BadgeCheck style={{ width: 16, height: 16 }} />
                    </div>
                  )}
                </div>

                <div className="vehicle-info">
                  <h3 className="vehicle-name">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <div className="vehicle-details-grid">
                    <div className="vehicle-detail-item">
                      <span className="detail-label">Année</span>
                      <span className="detail-value">{vehicle.year}</span>
                    </div>
                    <div className="vehicle-detail-item">
                      <span className="detail-label">Couleur</span>
                      <span className="detail-value">{vehicle.color}</span>
                    </div>
                    <div className="vehicle-detail-item">
                      <span className="detail-label">Immatriculation</span>
                      <span className="detail-value">{vehicle.license_plate}</span>
                    </div>
                    <div className="vehicle-detail-item">
                      <span className="detail-label">Places</span>
                      <span className="detail-value">{vehicle.seats}</span>
                    </div>
                    <div className="vehicle-detail-item">
                      <span className="detail-label">Type</span>
                      <span className="detail-value">{getVehicleTypeLabel(vehicle.vehicle_type)}</span>
                    </div>
                    <div className="vehicle-detail-item">
                      <span className="detail-label">Statut</span>
                      <span className={`detail-value status-${vehicle.verification_status}`}>
                        {getVerificationStatusLabel(vehicle.verification_status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="vehicle-actions">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(vehicle)}
                    icon={<Edit style={{ width: 16, height: 16 }} />}
                  >
                    Modifier
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDeleteClick(vehicle)}
                    icon={<Trash2 style={{ width: 16, height: 16 }} />}
                  >
                    Supprimer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          resetForm()
        }}
        title={editingVehicle ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="vehicle-form">
          <div className="form-grid">
            <Input
              label="Marque"
              placeholder="Toyota"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              required
            />

            <Input
              label="Modèle"
              placeholder="Corolla"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              required
            />

            <Input
              label="Année"
              type="number"
              min="1900"
              max={new Date().getFullYear() + 1}
              placeholder="2020"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              required
            />

            <Input
              label="Couleur"
              placeholder="Blanc"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              required
            />

            <Input
              label="Immatriculation"
              placeholder="AB-123-CD"
              value={form.license_plate}
              onChange={(e) => setForm({ ...form, license_plate: e.target.value })}
              required
            />

            <Input
              label="Nombre de places"
              type="number"
              min="1"
              max="9"
              placeholder="5"
              value={form.seats}
              onChange={(e) => setForm({ ...form, seats: e.target.value })}
              required
            />

            <Select
              label="Type de véhicule"
              options={vehicleTypeOptions}
              value={form.vehicle_type}
              onChange={(e) => setForm({ ...form, vehicle_type: e.target.value as VehicleType })}
            />
          </div>

          <div className="photo-upload-section">
            <label className="photo-upload-label">
              <Camera style={{ width: 18, height: 18 }} />
              Photos du véhicule
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="photo-upload-input"
            />
            {photoPreviews.length > 0 && (
              <div className="photo-previews">
                {photoPreviews.map((preview, index) => (
                  <img 
                    key={index} 
                    src={preview} 
                    alt={`Preview ${index + 1}`}
                    className="photo-preview"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="modal-actions">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setShowModal(false)
                resetForm()
              }}
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              loading={submitting}
              disabled={submitting}
            >
              {editingVehicle ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setDeletingVehicle(null)
        }}
        title="Confirmer la suppression"
        size="sm"
      >
        <div className="delete-confirmation">
          <p>
            Êtes-vous sûr de vouloir supprimer le véhicule{' '}
            <strong>
              {deletingVehicle?.brand} {deletingVehicle?.model}
            </strong> ?
          </p>
          <p className="delete-warning">
            Cette action est irréversible.
          </p>

          <div className="modal-actions">
            <Button 
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false)
                setDeletingVehicle(null)
              }}
            >
              Annuler
            </Button>
            <Button 
              variant="danger"
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
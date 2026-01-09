import { useState } from 'react'
import { MapPin, Edit2 } from 'lucide-react'
import Button from './Button'
import Input from './Input'
import Modal from './Modal'
import './CoordinateVerifier.css'

interface CoordinateVerifierProps {
  address: string
  latitude: number | undefined
  longitude: number | undefined
  onConfirm: (lat: number, lng: number) => void
}

export default function CoordinateVerifier({
  address,
  latitude,
  longitude,
  onConfirm
}: CoordinateVerifierProps) {
  const [showModal, setShowModal] = useState(false)
  const [lat, setLat] = useState(latitude?.toString() || '')
  const [lng, setLng] = useState(longitude?.toString() || '')

  const handleSave = () => {
    if (lat && lng) {
      onConfirm(parseFloat(lat), parseFloat(lng))
      setShowModal(false)
    }
  }

  if (!latitude || !longitude) {
    return (
      <div className="coordinate-verifier warning">
        <MapPin style={{ width: 16, height: 16 }} />
        <span>Sélectionnez une adresse dans la liste</span>
      </div>
    )
  }

  return (
    <>
      <div className="coordinate-verifier">
        <div className="coordinate-display">
          <MapPin style={{ width: 16, height: 16 }} />
          <span className="address">{address}</span>
          <span className="coords">{latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setLat(latitude.toString())
            setLng(longitude.toString())
            setShowModal(true)
          }}
          icon={<Edit2 style={{ width: 14, height: 14 }} />}
        >
          Corriger
        </Button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Corriger les coordonnées"
        size="sm"
      >
        <div className="coords-form">
          <Input
            label="Latitude"
            type="number"
            step="0.0001"
            placeholder="Ex: 6.1256"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <Input
            label="Longitude"
            type="number"
            step="0.0001"
            placeholder="Ex: 1.2320"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
          <p className="help-text">
            💡 Vérifiez les coordonnées sur <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Google Maps</a>
          </p>
          <div className="modal-actions">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={!lat || !lng}>
              Enregistrer
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

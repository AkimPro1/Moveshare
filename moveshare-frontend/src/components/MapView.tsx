import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapView.css'

// Fix for default marker icons in Leaflet with React
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

interface MapViewProps {
  startPos?: [number, number]
  endPos?: [number, number]
  currentPos?: [number, number]
  height?: string
}

export default function MapView({ 
  startPos = [48.8566, 2.3522], // Default Paris
  endPos, 
  currentPos,
  height = '400px'
}: MapViewProps) {
  return (
    <div className="map-view-container" style={{ height }}>
      <MapContainer 
        center={currentPos || startPos} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={startPos}>
          <Popup>Départ</Popup>
        </Marker>

        {endPos && (
          <Marker position={endPos}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {currentPos && (
          <Marker position={currentPos}>
            <Popup>Position actuelle (Véhicule)</Popup>
          </Marker>
        )}

        {startPos && endPos && (
          <Polyline positions={[startPos, endPos]} color="var(--ms-primary)" />
        )}
      </MapContainer>
    </div>
  )
}

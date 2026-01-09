import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl } from 'react-leaflet'
import { useState, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapboxView.css'
import { routingService, RouteResponse } from '../api/routingService'

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

interface MapboxViewProps {
  startPos?: [number, number]
  endPos?: [number, number]
  currentPos?: [number, number]
  height?: string
  zoom?: number
  onReady?: () => void
}

export default function MapboxView({
  startPos = [48.8566, 2.3522], // Paris [lat, lng]
  endPos = [45.7640, 4.8357], // Lyon [lat, lng]
  currentPos,
  height = '400px',
  zoom = 12,
  onReady
}: MapboxViewProps) {
  const [route, setRoute] = useState<RouteResponse | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch route when start and end positions change
  useEffect(() => {
    if (startPos && endPos && (startPos[0] !== endPos[0] || startPos[1] !== endPos[1])) {
      console.log('🛣️ Loading route from', startPos, 'to', endPos)
      loadRoute()
    }
  }, [startPos, endPos])

  const loadRoute = async () => {
    if (!startPos || !endPos) return
    
    setLoading(true)
    try {
      const result = await routingService.getRoute(startPos, endPos)
      console.log('✅ Route loaded:', result)
      setRoute(result)
    } catch (error) {
      console.error('❌ Error loading route:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mapbox-view-container" style={{ height }}>
      {loading && (
        <div className="route-loading">
          <div className="spinner-small"></div>
          <span>Calcul du meilleur chemin...</span>
        </div>
      )}
      <MapContainer
        center={currentPos || startPos}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        maxZoom={22}
        minZoom={2}
      >
        {/* Couches avec sélecteur */}
        <LayersControl position="topright">
          {/* SATELLITE AVEC LABELS */}
          <LayersControl.BaseLayer checked name="🛰️ Satellite HD">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEE, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              maxNativeZoom={18}
              minZoom={0}
            />
          </LayersControl.BaseLayer>

          {/* SATELLITE AVEC LABELS DESUS */}
          <LayersControl.BaseLayer name="🛰️ Satellite + Labels">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri"
              maxNativeZoom={18}
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay name="Labels (Satellite)">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri"
              maxNativeZoom={18}
            />
          </LayersControl.Overlay>

          {/* CARTE STANDARD */}
          <LayersControl.BaseLayer name="🗺️ Carte Standard">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              maxNativeZoom={19}
              minZoom={0}
            />
          </LayersControl.BaseLayer>

          {/* CARTE DETAILLEE (Style de Google) */}
          <LayersControl.BaseLayer name="🗺️ Détaillée">
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}.png"
              attribution='&copy; Stadia Maps, &copy; OpenStreetMap contributors'
              maxNativeZoom={20}
              minZoom={0}
            />
          </LayersControl.BaseLayer>

          {/* TERRAIN / TOPOGRAPHIQUE */}
          <LayersControl.BaseLayer name="🏔️ Terrain">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
              maxNativeZoom={17}
              minZoom={0}
            />
          </LayersControl.BaseLayer>

          {/* THEME SOMBRE */}
          <LayersControl.BaseLayer name="🌙 Sombre">
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png"
              attribution='&copy; Stadia Maps, &copy; OpenStreetMap contributors'
              maxNativeZoom={20}
              minZoom={0}
            />
          </LayersControl.BaseLayer>

          {/* COUCHE HYBRIDE (Satellite + Nom) */}
          <LayersControl.BaseLayer name="🔀 Hybride">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
              maxNativeZoom={19}
              minZoom={0}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Marqueur de départ */}
        <Marker position={startPos} icon={DefaultIcon}>
          <Popup className="custom-popup">
            <div style={{ textAlign: 'center' }}>
              <strong>📍 Point de départ</strong>
              <br />
              <small style={{ fontSize: '11px' }}>
                Lat: {startPos[0].toFixed(6)}<br />
                Lng: {startPos[1].toFixed(6)}
              </small>
            </div>
          </Popup>
        </Marker>

        {/* Marqueur de destination */}
        {endPos && (
          <Marker position={endPos} icon={DefaultIcon}>
            <Popup className="custom-popup">
              <div style={{ textAlign: 'center' }}>
                <strong>🏁 Destination</strong>
                <br />
                <small style={{ fontSize: '11px' }}>
                  Lat: {endPos[0].toFixed(6)}<br />
                  Lng: {endPos[1].toFixed(6)}
                </small>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marqueur de position actuelle */}
        {currentPos && (
          <Marker position={currentPos} icon={DefaultIcon}>
            <Popup className="custom-popup">
              <div style={{ textAlign: 'center' }}>
                <strong>🔵 Position actuelle</strong>
                <br />
                <small style={{ fontSize: '11px' }}>
                  Lat: {currentPos[0].toFixed(6)}<br />
                  Lng: {currentPos[1].toFixed(6)}
                </small>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Itinéraire optimisé (meilleur chemin comme Google Maps) */}
        {route && route.coordinates.length > 0 ? (
          <Polyline 
            positions={route.coordinates} 
            color="#0066cc" 
            weight={4} 
            opacity={0.85}
          />
        ) : startPos && endPos && (
          // Fallback to straight line if routing fails
          <Polyline 
            positions={[startPos, endPos]} 
            color="#0066cc" 
            weight={4} 
            opacity={0.85}
            dashArray="8, 4"
          />
        )}
      </MapContainer>
      
      {/* Info au bas de la carte */}
      <div className="mapbox-info">
        <small>
          💡 <strong>Conseil:</strong> Utilisez "Satellite + Labels" pour voir les détails avec noms des lieux • 
          🔍 Zoomez jusqu'à 22x pour ultra-détail • 
          🎛️ Changez de couche en haut à droite
        </small>
      </div>
    </div>
  )
}

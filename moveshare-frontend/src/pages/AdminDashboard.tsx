import { useState, useEffect } from 'react'
import { 
  Users, Car, MapPin, TrendingUp, AlertCircle, 
  CheckCircle, XCircle, Shield, ShieldAlert, Trash2, 
  MessageSquare, ChevronLeft, ChevronRight, Eye, Star
} from 'lucide-react'
import { adminApi } from '../api/adminApi'
import Card from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'
import StarRating from '../components/StarRating'
import { formatDate, formatTime, formatPrice } from '../utils/formatters'
import { getVehicleImageUrl } from '../utils/urls'
import './AdminDashboard.css'

type Tab = 'stats' | 'users' | 'vehicles' | 'rides' | 'reviews'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('stats')
  const [stats, setStats] = useState<any>(null)
  const [data, setData] = useState<any[]>([])
  const [pagination, setPagination] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Modals
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [activeTab, currentPage])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('Token d\'authentification manquant. Veuillez vous reconnecter.')
    }
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      if (activeTab === 'stats') {
        const statsData = await adminApi.getStats()
        setStats(statsData)
      } else {
        let res: any
        switch(activeTab) {
          case 'users': res = await adminApi.getUsers(currentPage); break
          case 'vehicles': res = await adminApi.getVehicles(currentPage); break
          case 'rides': res = await adminApi.getRides(currentPage); break
          case 'reviews': res = await adminApi.getReviews(currentPage); break
          default: throw new Error('Onglet invalide')
        }
        setData(res?.data || [])
        setPagination({
          current_page: res?.current_page || 1,
          last_page: res?.last_page || 1,
          total: res?.total || 0,
          from: res?.from || 0,
          to: res?.to || 0
        })
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erreur lors du chargement des données')
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handleToggleAdmin = async (userId: number) => {
    if (!confirm('Voulez-vous vraiment changer les droits administrateur ?')) return
    try {
      await adminApi.toggleAdmin(userId)
      loadData()
    } catch (err: any) { alert(err?.response?.data?.message || 'Erreur') }
  }

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('ATTENTION: Supprimer cet utilisateur supprimera toutes ses données (véhicules, trajets, etc). Continuer ?')) return
    try {
      await adminApi.deleteUser(userId)
      loadData()
    } catch (err: any) { alert(err?.response?.data?.message || 'Erreur') }
  }

  const handleDeleteVehicle = async (vehicleId: number) => {
    if (!confirm('Supprimer définitivement ce véhicule ?')) return
    try {
      await adminApi.deleteVehicle(vehicleId)
      loadData()
      if (selectedVehicle && selectedVehicle.id === vehicleId) setSelectedVehicle(null)
    } catch (err: any) { alert(err?.response?.data?.message || 'Erreur') }
  }

  const handleVerifyVehicle = async (vehicleId: number, status: 'verified' | 'unverified') => {
    try {
      await adminApi.verifyVehicle(vehicleId, status)
      loadData()
      if (selectedVehicle) setSelectedVehicle(null)
    } catch (err: any) { alert(err?.response?.data?.message || 'Erreur') }
  }

  const handleCancelRide = async (rideId: number) => {
    if (!confirm('Voulez-vous vraiment annuler ce trajet ?')) return
    try {
      await adminApi.cancelRide(rideId)
      loadData()
    } catch (err: any) { alert(err?.response?.data?.message || 'Erreur') }
  }

  const handleDeleteRide = async (rideId: number) => {
    if (!confirm('Supprimer définitivement ce trajet ?')) return
    try {
      await adminApi.deleteRide(rideId)
      loadData()
    } catch (err: any) { alert(err?.response?.data?.message || 'Erreur') }
  }

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm('Supprimer cet avis ?')) return
    try {
      await adminApi.deleteReview(reviewId)
      loadData()
    } catch (err: any) { alert(err?.response?.data?.message || 'Erreur') }
  }

  const PaginationControls = () => {
    if (!pagination || pagination.last_page <= 1) return null
    return (
      <div className="admin-pagination">
        <span className="pagination-info">
          Affichage {pagination.from}-{pagination.to} sur {pagination.total}
        </span>
        <div className="pagination-buttons">
          <Button 
            variant="ghost" 
            size="sm" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            <ChevronLeft size={18} /> Précédent
          </Button>
          <div className="pagination-pages">
            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(p => (
              <button 
                key={p} 
                className={`page-num ${p === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            disabled={currentPage === pagination.last_page}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Suivant <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="ms-container">
        <div className="admin-header">
          <div className="header-title-row">
            <h1>Administration</h1>
            <div className="admin-badge">Mode Administrateur</div>
          </div>
          <div className="admin-tabs">
            <button className={`admin-tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => handleTabChange('stats')}>
              <TrendingUp size={18} /> Vue d'ensemble
            </button>
            <button className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => handleTabChange('users')}>
              <Users size={18} /> Utilisateurs
            </button>
            <button className={`admin-tab ${activeTab === 'vehicles' ? 'active' : ''}`} onClick={() => handleTabChange('vehicles')}>
              <Car size={18} /> Véhicules
            </button>
            <button className={`admin-tab ${activeTab === 'rides' ? 'active' : ''}`} onClick={() => handleTabChange('rides')}>
              <MapPin size={18} /> Trajets
            </button>
            <button className={`admin-tab ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => handleTabChange('reviews')}>
              <MessageSquare size={18} /> Avis
            </button>
          </div>
        </div>

        {error && <div className="admin-error-banner"><AlertCircle size={20} /> {error}</div>}

        <div className="admin-content">
          {loading ? (
            <div className="admin-loading-state">
              <div className="spinner"></div>
              <p>Chargement des données administratives...</p>
            </div>
          ) : (
            <>
              {activeTab === 'stats' && stats && (
                <div className="admin-stats-layout">
                  <div className="admin-stats-grid">
                    <Card className="admin-stat-card">
                      <div className="stat-icon users"><Users size={24} /></div>
                      <div className="stat-info">
                        <span className="stat-label">Utilisateurs</span>
                        <span className="stat-value">{stats.users_count}</span>
                      </div>
                    </Card>
                    <Card className="admin-stat-card">
                      <div className="stat-icon vehicles"><Car size={24} /></div>
                      <div className="stat-info">
                        <span className="stat-label">Véhicules</span>
                        <span className="stat-value">{stats.vehicles_count}</span>
                        {stats.pending_vehicles > 0 && <span className="stat-badge warning">{stats.pending_vehicles} en attente</span>}
                      </div>
                    </Card>
                    <Card className="admin-stat-card">
                      <div className="stat-icon rides"><MapPin size={24} /></div>
                      <div className="stat-info">
                        <span className="stat-label">Trajets</span>
                        <span className="stat-value">{stats.rides_count}</span>
                      </div>
                    </Card>
                    <Card className="admin-stat-card">
                      <div className="stat-icon revenue"><TrendingUp size={24} /></div>
                      <div className="stat-info">
                        <span className="stat-label">Revenus globaux</span>
                        <span className="stat-value">{formatPrice(stats.total_revenue)}</span>
                      </div>
                    </Card>
                  </div>
                  
                  <Card className="admin-welcome-card">
                    <h3>Actions rapides</h3>
                    <div className="quick-actions">
                      <Button variant="outline" size="sm" onClick={() => handleTabChange('vehicles')}>
                        <AlertCircle size={16} /> Valider les {stats.pending_vehicles} véhicules en attente
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleTabChange('reviews')}>
                        <MessageSquare size={16} /> Modérer les avis récents
                      </Button>
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="admin-table-container">
                  <Card className="admin-table-card">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Utilisateur</th>
                          <th>Contact</th>
                          <th>Rôle</th>
                          <th>Statut Admin</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length === 0 ? (
                          <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>Aucune donnée</td></tr>
                        ) : (
                          data.map(user => (
                            <tr key={user.id}>
                              <td>
                                <div className="user-cell">
                                  <div className="user-avatar-tiny">{user.name[0]}</div>
                                  <span className="user-name">{user.name}</span>
                                </div>
                              </td>
                              <td>
                                <div className="contact-cell">
                                  <span className="email-small">{user.email}</span>
                                  <span className="phone-small">{user.phone}</span>
                                </div>
                              </td>
                              <td><span className={`badge role-${user.role}`}>{user.role}</span></td>
                              <td>
                                <button 
                                  className={`admin-toggle ${user.is_admin ? 'on' : 'off'}`}
                                  onClick={() => handleToggleAdmin(user.id)}
                                >
                                  {user.is_admin ? <Shield size={14} /> : <ShieldAlert size={14} />}
                                  {user.is_admin ? 'Admin' : 'Utilisateur'}
                                </button>
                              </td>
                              <td className="text-right">
                                <Button variant="ghost" size="sm" className="text-danger" onClick={() => handleDeleteUser(user.id)}>
                                  <Trash2 size={18} />
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </Card>
                  <PaginationControls />
                </div>
              )}

              {activeTab === 'vehicles' && (
                <div className="admin-table-container">
                  <Card className="admin-table-card">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Propriétaire</th>
                          <th>Véhicule</th>
                          <th>Plaque</th>
                          <th>Statut</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length === 0 ? (
                          <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>Aucune donnée</td></tr>
                        ) : (
                          data.map(v => (
                            <tr key={v.id}>
                              <td>{v.user?.name}</td>
                              <td>{v.brand} {v.model} ({v.year})</td>
                              <td><code>{v.license_plate}</code></td>
                              <td>
                                <span className={`badge status-${v.verification_status}`}>
                                  {v.verification_status}
                                </span>
                              </td>
                              <td className="text-right">
                                <div className="action-row">
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedVehicle(v)}>
                                    <Eye size={18} />
                                  </Button>
                                  {v.verification_status !== 'verified' && (
                                    <Button variant="ghost" size="sm" className="text-success" onClick={() => handleVerifyVehicle(v.id, 'verified')} title="Valider">
                                      <CheckCircle size={18} />
                                    </Button>
                                  )}
                                  {v.verification_status === 'verified' && (
                                    <Button variant="ghost" size="sm" className="text-warning" onClick={() => handleVerifyVehicle(v.id, 'unverified')} title="Rejeter">
                                      <XCircle size={18} />
                                    </Button>
                                  )}
                                  <Button variant="ghost" size="sm" className="text-danger" onClick={() => handleDeleteVehicle(v.id)} title="Supprimer">
                                    <Trash2 size={18} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </Card>
                  <PaginationControls />
                </div>
              )}

              {activeTab === 'rides' && (
                <div className="admin-table-container">
                  <Card className="admin-table-card">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Conducteur</th>
                          <th>Trajet</th>
                          <th>Date / Heure</th>
                          <th>Prix</th>
                          <th>Statut</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length === 0 ? (
                          <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>Aucune donnée</td></tr>
                        ) : (
                          data.map(r => (
                            <tr key={r.id}>
                              <td>{r.driver?.name}</td>
                              <td><div className="route-cell">{r.start_location} → {r.end_location}</div></td>
                              <td>{formatDate(r.ride_date)} {formatTime(r.ride_time)}</td>
                              <td>{formatPrice(r.price_per_seat)}</td>
                              <td><span className={`badge status-${r.status}`}>{r.status}</span></td>
                              <td className="text-right">
                                <div className="action-row">
                                  {r.status === 'active' && (
                                    <Button variant="ghost" size="sm" className="text-warning" onClick={() => handleCancelRide(r.id)} title="Annuler">
                                      <XCircle size={18} />
                                    </Button>
                                  )}
                                  <Button variant="ghost" size="sm" className="text-danger" onClick={() => handleDeleteRide(r.id)}>
                                    <Trash2 size={18} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </Card>
                  <PaginationControls />
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="admin-table-container">
                  <Card className="admin-table-card">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>De → Pour</th>
                          <th>Note</th>
                          <th>Commentaire</th>
                          <th>Date</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length === 0 ? (
                          <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>Aucune donnée</td></tr>
                        ) : (
                          data.map(rev => (
                            <tr key={rev.id}>
                              <td>
                                <div className="review-users">
                                  <span className="user-from">{rev.reviewer?.name}</span>
                                  <span className="arrow">→</span>
                                  <span className="user-to">{rev.reviewee?.name}</span>
                                </div>
                              </td>
                              <td><StarRating rating={rev.rating} size={14} /></td>
                              <td><div className="comment-preview" title={rev.comment}>{rev.comment}</div></td>
                              <td>{formatDate(rev.created_at)}</td>
                              <td className="text-right">
                                <Button variant="ghost" size="sm" className="text-danger" onClick={() => handleDeleteReview(rev.id)}>
                                  <Trash2 size={18} />
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </Card>
                  <PaginationControls />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Vehicle Inspection Modal */}
      <Modal
        isOpen={!!selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        title="Inspection du véhicule"
      >
        {selectedVehicle && (
          <div className="vehicle-inspection">
            <div className="inspection-photos">
              {selectedVehicle.photos && Array.isArray(selectedVehicle.photos) && selectedVehicle.photos.length > 0 ? (
                <div className="photos-grid">
                  {selectedVehicle.photos.map((p: string, i: number) => {
                    const imageUrl = getVehicleImageUrl(p)
                    return (
                      <img 
                        key={i} 
                        src={imageUrl} 
                        alt={`Vehicule ${i}`} 
                        className="inspection-photo"
                        onError={(e) => {
                          e.currentTarget.style.border = '2px solid red'
                          e.currentTarget.alt = 'Image non trouvée'
                        }}
                      />
                    )
                  })}
                </div>
              ) : (
                <div className="no-photos">
                  Aucune photo disponible
                </div>
              )}
            </div>
            <div className="inspection-details">
              <h3>{selectedVehicle.brand} {selectedVehicle.model}</h3>
              <p>Propriétaire: <strong>{selectedVehicle.user?.name}</strong></p>
              <div className="inspection-grid">
                <div className="inspection-item"><span>Année:</span> {selectedVehicle.year}</div>
                <div className="inspection-item"><span>Plaque:</span> {selectedVehicle.license_plate}</div>
                <div className="inspection-item"><span>Places:</span> {selectedVehicle.seats}</div>
                <div className="inspection-item"><span>Couleur:</span> {selectedVehicle.color}</div>
              </div>
            </div>
            <div className="modal-footer">
              <Button variant="outline" onClick={() => setSelectedVehicle(null)}>Fermer</Button>
              <div className="footer-actions">
                <Button variant="outline" className="text-danger" onClick={() => handleDeleteVehicle(selectedVehicle.id)}>
                  Supprimer
                </Button>
                {selectedVehicle.verification_status !== 'verified' && (
                  <Button className="text-success" onClick={() => handleVerifyVehicle(selectedVehicle.id, 'verified')}>
                    Valider le véhicule
                  </Button>
                )}
                {selectedVehicle.verification_status === 'verified' && (
                  <Button variant="outline" className="text-warning" onClick={() => handleVerifyVehicle(selectedVehicle.id, 'unverified')}>
                    Rejeter
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

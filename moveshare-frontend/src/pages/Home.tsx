import { Link } from 'react-router-dom'
import { 
  ShieldCheck, 
  Users, 
  Star, 
  Clock, 
  WalletMinimal, 
  Headphones,
  Award,
  Check,
  MapPin,
  Car,
  BadgeCheck
} from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import './Home.css'

export default function Home() {
  return (
    <main className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url('/assets/app.jpg')` }}
        >
          <div className="hero-overlay">
            <div className="ms-container">
              <div className="hero-content">
                <h1 className="hero-title">
                  Voyagez malin, économisez et rencontrez
                </h1>
                <p className="hero-subtitle">
                  La plateforme de covoiturage de confiance qui connecte 
                  conducteurs et passagers pour des trajets sûrs et économiques
                </p>
                <div className="hero-ctas">
                  <Button size="lg" onClick={() => window.location.href = '/rides'}>
                    Trouver un trajet
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => window.location.href = '/rides/create'}>
                    Proposer un trajet
                  </Button>
                </div>
                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-number">50K+</div>
                    <div className="stat-label">Utilisateurs actifs</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">200K+</div>
                    <div className="stat-label">Trajets réalisés</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">4.8/5</div>
                    <div className="stat-label">Note moyenne</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="trust-section">
        <div className="ms-container">
          <div className="trust-badges">
            <div className="trust-badge">
              <ShieldCheck style={{ width: 24, height: 24, color: 'var(--ms-success)' }} />
              <span>Paiements sécurisés</span>
            </div>
            <div className="trust-badge">
              <BadgeCheck style={{ width: 24, height: 24, color: 'var(--ms-success)' }} />
              <span>Conducteurs vérifiés</span>
            </div>
            <div className="trust-badge">
              <Award style={{ width: 24, height: 24, color: 'var(--ms-success)' }} />
              <span>Service primé 2024</span>
            </div>
            <div className="trust-badge">
              <Headphones style={{ width: 24, height: 24, color: 'var(--ms-success)' }} />
              <span>Support 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="features-section">
        <div className="ms-container">
          <div className="section-header">
            <h2>Pourquoi choisir MoveShare ?</h2>
            <p>La solution de covoiturage qui fait la différence</p>
          </div>

          <div className="features-grid">
            <Card className="feature-card">
              <div className="feature-icon">
                <WalletMinimal style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
              </div>
              <h3>Économisez jusqu'à 70%</h3>
              <p>
                Réduisez vos frais de transport en partageant les coûts avec d'autres passagers. 
                En moyenne, nos utilisateurs économisent 200€ par mois.
              </p>
            </Card>

            <Card className="feature-card">
              <div className="feature-icon">
                <ShieldCheck style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
              </div>
              <h3>Sécurité maximale</h3>
              <p>
                Tous nos conducteurs sont vérifiés avec permis de conduire validé, 
                assurance contrôlée et évaluations des passagers.
              </p>
            </Card>

            <Card className="feature-card">
              <div className="feature-icon">
                <Clock style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
              </div>
              <h3>Réservation instantanée</h3>
              <p>
                Trouvez et réservez votre trajet en quelques clics. 
                Confirmation immédiate et communication directe avec le conducteur.
              </p>
            </Card>

            <Card className="feature-card">
              <div className="feature-icon">
                <Users style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
              </div>
              <h3>Communauté bienveillante</h3>
              <p>
                Rejoignez une communauté de 50 000+ voyageurs qui partagent 
                vos valeurs de convivialité et d'écologie.
              </p>
            </Card>

            <Card className="feature-card">
              <div className="feature-icon">
                <Star style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
              </div>
              <h3>Système de notation</h3>
              <p>
                Évaluez et soyez évalué après chaque trajet. 
                La transparence et la confiance au cœur de notre service.
              </p>
            </Card>

            <Card className="feature-card">
              <div className="feature-icon">
                <Headphones style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
              </div>
              <h3>Support dédié</h3>
              <p>
                Notre équipe est disponible 24/7 pour répondre à vos questions 
                et résoudre tout problème rapidement.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works-section">
        <div className="ms-container">
          <div className="section-header">
            <h2>Comment ça marche ?</h2>
            <p>Trois étapes simples pour commencer votre voyage</p>
          </div>

          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Créez votre compte</h3>
                <p>
                  Inscription gratuite en 2 minutes. Ajoutez vos informations 
                  et vérifiez votre identité pour plus de sécurité.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Recherchez ou proposez un trajet</h3>
                <p>
                  Utilisez notre moteur de recherche pour trouver un trajet 
                  ou publiez le vôtre en quelques clics.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Voyagez et évaluez</h3>
                <p>
                  Rencontrez votre co-voyageur, profitez du trajet et 
                  laissez une évaluation pour aider la communauté.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="ms-container">
          <div className="section-header">
            <h2>Ce que disent nos utilisateurs</h2>
            <p>Des milliers de voyageurs satisfaits</p>
          </div>

          <div className="testimonials-grid">
            <Card className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: 16, height: 16, fill: 'var(--ms-warning)', color: 'var(--ms-warning)' }} />
                ))}
              </div>
              <p className="testimonial-text">
                "J'utilise MoveShare depuis 6 mois pour mes trajets quotidiens. 
                J'ai économisé plus de 1200€ et rencontré des personnes formidables !"
              </p>
              <div className="testimonial-author">
                <img 
                  src="https://images.unsplash.com/photo-1689866500039-d39974ab71dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxMnx8eW91bmclMjB3b21hbiUyMHBhc3NlbmdlciUyMGhhcHB5JTIwaW4lMjBjYXIlMjByaWRlfGVufDB8MXx8fDE3NjYwNDc0ODF8MA&ixlib=rb-4.1.0&q=85" 
                  alt="Photo de Sarah M. - Aly Ramirez on Unsplash"
                  className="author-photo"
                />
                <div>
                  <div className="author-name">Sarah M.</div>
                  <div className="author-role">Passagère régulière</div>
                </div>
              </div>
            </Card>

            <Card className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: 16, height: 16, fill: 'var(--ms-warning)', color: 'var(--ms-warning)' }} />
                ))}
              </div>
              <p className="testimonial-text">
                "En tant que conducteur, MoveShare me permet de rentabiliser mes trajets 
                professionnels. L'application est intuitive et le support client excellent."
              </p>
              <div className="testimonial-author">
                <img 
                  src="https://images.pexels.com/photos/16702626/pexels-photo-16702626.jpeg" 
                  alt="Photo de Marc D. - Murat IŞIK on Pexels"
                  className="author-photo"
                />
                <div>
                  <div className="author-name">Marc D.</div>
                  <div className="author-role">Conducteur vérifié</div>
                </div>
              </div>
            </Card>

            <Card className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: 16, height: 16, fill: 'var(--ms-warning)', color: 'var(--ms-warning)' }} />
                ))}
              </div>
              <p className="testimonial-text">
                "La sécurité est ma priorité et MoveShare la prend au sérieux. 
                Conducteurs vérifiés, assurance et système de notation transparent."
              </p>
              <div className="testimonial-author">
                <img 
                  src="https://images.unsplash.com/photo-1602003355524-184dbe828b18?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHx5b3VuZyUyMHdvbWFuJTIwcGFzc2VuZ2VyJTIwaGFwcHklMjBpbiUyMGNhciUyMHJpZGV8ZW58MHwxfHx8MTc2NjA0NzQ4MXww&ixlib=rb-4.1.0&q=85" 
                  alt="Photo de Julie L. - Ko Towson on Unsplash"
                  className="author-photo"
                />
                <div>
                  <div className="author-name">Julie L.</div>
                  <div className="author-role">Utilisatrice depuis 2023</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="ms-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Users style={{ width: 40, height: 40 }} />
              </div>
              <div className="stat-value">50,000+</div>
              <div className="stat-description">Utilisateurs actifs</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Car style={{ width: 40, height: 40 }} />
              </div>
              <div className="stat-value">200,000+</div>
              <div className="stat-description">Trajets réalisés</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <MapPin style={{ width: 40, height: 40 }} />
              </div>
              <div className="stat-value">150+</div>
              <div className="stat-description">Villes couvertes</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Star style={{ width: 40, height: 40 }} />
              </div>
              <div className="stat-value">4.8/5</div>
              <div className="stat-description">Note moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY SECTION */}
      <section className="safety-section">
        <div className="ms-container">
          <div className="safety-content">
            <div className="safety-text">
              <h2>Votre sécurité, notre priorité</h2>
              <p className="safety-intro">
                Chez MoveShare, nous mettons tout en œuvre pour garantir 
                des trajets sûrs et sereins à tous nos utilisateurs.
              </p>
              
              <div className="safety-features">
                <div className="safety-feature">
                  <Check style={{ width: 20, height: 20, color: 'var(--ms-success)' }} />
                  <span>Vérification d'identité obligatoire pour tous les conducteurs</span>
                </div>
                <div className="safety-feature">
                  <Check style={{ width: 20, height: 20, color: 'var(--ms-success)' }} />
                  <span>Contrôle des permis de conduire et assurances</span>
                </div>
                <div className="safety-feature">
                  <Check style={{ width: 20, height: 20, color: 'var(--ms-success)' }} />
                  <span>Système de notation et avis vérifiés</span>
                </div>
                <div className="safety-feature">
                  <Check style={{ width: 20, height: 20, color: 'var(--ms-success)' }} />
                  <span>Paiements sécurisés via notre plateforme</span>
                </div>
                <div className="safety-feature">
                  <Check style={{ width: 20, height: 20, color: 'var(--ms-success)' }} />
                  <span>Support client disponible 24/7</span>
                </div>
                <div className="safety-feature">
                  <Check style={{ width: 20, height: 20, color: 'var(--ms-success)' }} />
                  <span>Assurance trajet incluse pour tous les passagers</span>
                </div>
              </div>
            </div>

            <div className="safety-image">
              <img 
                src="https://images.pexels.com/photos/7464537/pexels-photo-7464537.jpeg" 
                alt="Groupe d'amis heureux dans une voiture - RDNE Stock project on Pexels"
                className="safety-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="ms-container">
          <Card className="cta-card">
            <h2>Prêt à commencer votre voyage ?</h2>
            <p>
              Rejoignez des milliers d'utilisateurs qui voyagent malin et économique
            </p>
            <div className="cta-buttons">
              <Button size="lg" onClick={() => window.location.href = '/register'}>
                Créer un compte gratuit
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = '/rides'}>
                Découvrir les trajets
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="ms-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>MoveShare</h3>
              <p>La plateforme de covoiturage de confiance</p>
            </div>

            <div className="footer-section">
              <h4>Liens rapides</h4>
              <ul>
                <li><Link to="/rides">Trouver un trajet</Link></li>
                <li><Link to="/rides/create">Proposer un trajet</Link></li>
                <li><Link to="/vehicles">Mes véhicules</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>À propos</h4>
              <ul>
                <li><a href="#about">Qui sommes-nous</a></li>
                <li><a href="#safety">Sécurité</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Légal</h4>
              <ul>
                <li><a href="#terms">Conditions d'utilisation</a></li>
                <li><a href="#privacy">Politique de confidentialité</a></li>
                <li><a href="#cookies">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 MoveShare. </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
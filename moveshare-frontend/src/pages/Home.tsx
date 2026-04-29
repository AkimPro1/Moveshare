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
import ScrollFadeIn from '../components/ScrollFadeIn'
import './Home.css'

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-overlay">
            <div className="ms-container hero-shell">
              <div className="hero-content">
                
                <h1 className="hero-title">
                  <span className="hero-title-typewriter">
                    Le covoiturage qui donne envie de partir avant meme de monter a bord
                  </span>
                </h1>
                <p className="hero-subtitle">
                  MoveShare connecte passagers et conducteurs autour de trajets elegants, fiables
                  et confortables. Une experience moderne, rassurante et memorable.
                </p>
                <div className="hero-ctas">
                  <Button size="lg" onClick={() => window.location.href = '/rides'}>
                    Trouver un trajet
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => window.location.href = '/rides/create'}>
                    Proposer un trajet
                  </Button>
                </div>
                <div className="hero-highlights">
                  <div className="hero-highlight">
                    <BadgeCheck style={{ width: 18, height: 18 }} />
                    Conducteurs verifies
                  </div>
                  <div className="hero-highlight">
                    <ShieldCheck style={{ width: 18, height: 18 }} />
                    Paiement securise
                  </div>
                  <div className="hero-highlight">
                    <Clock style={{ width: 18, height: 18 }} />
                    Reservation rapide
                  </div>
                </div>
                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-number">50K+</div>
                    <div className="stat-label">Utilisateurs actifs</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">200K+</div>
                    <div className="stat-label">Trajets realises</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">4.8/5</div>
                    <div className="stat-label">Note moyenne</div>
                  </div>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-orb hero-orb-one" />
                <div className="hero-orb hero-orb-two" />

                <div className="hero-card hero-card-top">
                  <span>Depart populaire</span>
                  <strong>Cotonou - Parakou</strong>
                  <p></p>
                </div>

                <div className="hero-main-car">
                  <img
                    src="/assets/hero-land-cruiser.png"
                    alt="SUV premium MoveShare"
                    className="hero-main-car-image"
                  />
                </div>

                <div className="hero-card hero-card-side">
                  <span></span>
                  <strong>Van confort MoveShare</strong>
                  <p>Ideal pour les groupes</p>
                  <img
                    src="/assets/hero-van.png"
                    alt="Van MoveShare"
                    className="hero-side-car-image"
                  />
                </div>

                <div className="hero-card hero-card-bottom">
                  <span></span>
                  <strong>Confort, style, confiance</strong>
                  <p>Des trajets qui rassurent autant qu'ils impressionnent.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="ms-container">
          <div className="showcase-panel">
            <div className="showcase-copy">
              <span className="showcase-kicker">Collection MoveShare</span>
              <h2>Des vehicules qui inspirent confiance des le premier regard</h2>
              <p>
                Une vitrine moderne inspiree des plateformes premium : silhouettes fortes, lumiere,
                mouvement et vehicules mis en scene pour marquer les visiteurs.
              </p>
            </div>

            <div className="showcase-gallery">
              <div className="showcase-tile showcase-tile-large showcase-tile-copy">
                <div className="showcase-user-visual">
                  <img src="/assets/showcase-user-phone.png" alt="Utilisatrice MoveShare montrant l'application" />
                </div>
                <div className="showcase-user-copy">
                  <span className="showcase-tile-kicker">Temoignage client</span>
                  <h2>Avec MoveShare, je reserve vite et je voyage l'esprit tranquille.</h2>
                 
                  <div className="showcase-user-meta">
                    
                  </div>
                </div>
              </div>
              <div className="showcase-tile">
                <img src="/assets/hero-van.png" alt="Van premium MoveShare" className="showcase-car-image" />
              </div>
              <div className="showcase-tile showcase-tile-floating">
                <img src="/assets/hero-land-cruiser.png" alt="SUV premium noir" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="ms-container">
          <div className="trust-badges">
            <div className="trust-badge">
              <ShieldCheck style={{ width: 24, height: 24, color: 'var(--ms-success)' }} />
              <span>Paiements securises</span>
            </div>
            <div className="trust-badge">
              <BadgeCheck style={{ width: 24, height: 24, color: 'var(--ms-success)' }} />
              <span>Conducteurs verifies</span>
            </div>
            <div className="trust-badge">
              <Award style={{ width: 24, height: 24, color: 'var(--ms-success)' }} />
              <span>Service prime 2024</span>
            </div>
            <div className="trust-badge">
              <Headphones style={{ width: 24, height: 24, color: 'var(--ms-success)' }} />
              <span>Support 24/7</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="ms-container">
          <ScrollFadeIn direction="up">
            <div className="section-header">
              <h2>Pourquoi choisir MoveShare ?</h2>
              <p>La solution de covoiturage qui fait la difference</p>
            </div>
          </ScrollFadeIn>

          <div className="features-grid">
            <ScrollFadeIn delay={0.1}>
              <Card className="feature-card" hoverable>
                <div className="feature-icon">
                  <WalletMinimal style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
                </div>
                <h3>Economisez jusqu'a 70%</h3>
                <p>
                  Reduisez vos frais de transport en partageant les couts avec d'autres passagers.
                  En moyenne, nos utilisateurs economisent 200EUR par mois.
                </p>
              </Card>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.2}>
              <Card className="feature-card" hoverable>
                <div className="feature-icon">
                  <ShieldCheck style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
                </div>
                <h3>Securite maximale</h3>
                <p>
                  Tous nos conducteurs sont verifies avec permis de conduire valide,
                  assurance controlee et evaluations des passagers.
                </p>
              </Card>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.3}>
              <Card className="feature-card" hoverable>
                <div className="feature-icon">
                  <Clock style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
                </div>
                <h3>Reservation instantanee</h3>
                <p>
                  Trouvez et reservez votre trajet en quelques clics.
                  Confirmation immediate et communication directe avec le conducteur.
                </p>
              </Card>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.1}>
              <Card className="feature-card" hoverable>
                <div className="feature-icon">
                  <Users style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
                </div>
                <h3>Communaute bienveillante</h3>
                <p>
                  Rejoignez une communaute de 50 000+ voyageurs qui partagent
                  vos valeurs de convivialite et d'ecologie.
                </p>
              </Card>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.2}>
              <Card className="feature-card" hoverable>
                <div className="feature-icon">
                  <Star style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
                </div>
                <h3>Systeme de notation</h3>
                <p>
                  Evaluez et soyez evalue apres chaque trajet.
                  La transparence et la confiance au coeur de notre service.
                </p>
              </Card>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.3}>
              <Card className="feature-card" hoverable>
                <div className="feature-icon">
                  <Headphones style={{ width: 32, height: 32, color: 'var(--ms-primary)' }} />
                </div>
                <h3>Support dedie</h3>
                <p>
                  Notre equipe est disponible 24/7 pour repondre a vos questions
                  et resoudre tout probleme rapidement.
                </p>
              </Card>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="ms-container">
          <ScrollFadeIn direction="up">
            <div className="section-header">
              <h2>Comment ca marche ?</h2>
              <p>Trois etapes simples pour commencer votre voyage</p>
            </div>
          </ScrollFadeIn>

          <div className="steps-container">
            <ScrollFadeIn delay={0.1} direction="up">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Creez votre compte</h3>
                  <p>
                    Inscription gratuite en 2 minutes. Ajoutez vos informations
                    et verifiez votre identite pour plus de securite.
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.2} direction="up">
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Recherchez ou proposez un trajet</h3>
                  <p>
                    Utilisez notre moteur de recherche pour trouver un trajet
                    ou publiez le votre en quelques clics.
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.3} direction="up">
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Voyagez et evaluez</h3>
                  <p>
                    Rencontrez votre co-voyageur, profitez du trajet et
                    laissez une evaluation pour aider la communaute.
                  </p>
                </div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="ms-container">
          <ScrollFadeIn direction="up">
            <div className="section-header">
              <h2>Ce que disent nos utilisateurs</h2>
              <p>Des milliers de voyageurs satisfaits</p>
            </div>
          </ScrollFadeIn>

          <div className="testimonials-grid">
            <ScrollFadeIn delay={0.1}>
              <Card className="testimonial-card" hoverable>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} style={{ width: 16, height: 16, fill: 'var(--ms-warning)', color: 'var(--ms-warning)' }} />
                  ))}
                </div>
                <p className="testimonial-text">
                  "J'utilise MoveShare depuis 6 mois pour mes trajets quotidiens.
                  J'ai economise plus de 1200EUR et rencontre des personnes formidables !"
                </p>
                <div className="testimonial-author">
                  <img
                    src="https://images.unsplash.com/photo-1689866500039-d39974ab71dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxMnx8eW91bmclMjB3b21hbiUyMHBhc3NlbmdlciUyMGhhcHB5JTIwaW4lMjBjYXIlMjByaWRlfGVufDB8MXx8fDE3NjYwNDc0ODF8MA&ixlib=rb-4.1.0&q=85"
                    alt="Photo de Sarah M."
                    className="author-photo"
                  />
                  <div>
                    <div className="author-name">Sarah M.</div>
                    <div className="author-role">Passagere reguliere</div>
                  </div>
                </div>
              </Card>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.2}>
              <Card className="testimonial-card" hoverable>
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
                    alt="Photo de Marc D."
                    className="author-photo"
                  />
                  <div>
                    <div className="author-name">Marc D.</div>
                    <div className="author-role">Conducteur verifie</div>
                  </div>
                </div>
              </Card>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.3}>
              <Card className="testimonial-card" hoverable>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} style={{ width: 16, height: 16, fill: 'var(--ms-warning)', color: 'var(--ms-warning)' }} />
                  ))}
                </div>
                <p className="testimonial-text">
                  "La securite est ma priorite et MoveShare la prend au serieux.
                  Conducteurs verifies, assurance et systeme de notation transparent."
                </p>
                <div className="testimonial-author">
                  <img
                    src="https://images.unsplash.com/photo-1602003355524-184dbe828b18?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHx5b3VuZyUyMHdvbWFuJTIwcGFzc2VuZ2VyJTIwaGFwcHklMjBpbiUyMGNhciUyMHJpZGV8ZW58MHwxfHx8MTc2NjA0NzQ4MXww&ixlib=rb-4.1.0&q=85"
                    alt="Photo de Julie L."
                    className="author-photo"
                  />
                  <div>
                    <div className="author-name">Julie L.</div>
                    <div className="author-role">Utilisatrice depuis 2023</div>
                  </div>
                </div>
              </Card>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="ms-container">
          <div className="stats-grid">
            <ScrollFadeIn delay={0.1} direction="up">
              <div className="stat-card">
                <div className="stat-icon">
                  <Users style={{ width: 40, height: 40 }} />
                </div>
                <div className="stat-value">50,000+</div>
                <div className="stat-description">Utilisateurs actifs</div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.2} direction="up">
              <div className="stat-card">
                <div className="stat-icon">
                  <Car style={{ width: 40, height: 40 }} />
                </div>
                <div className="stat-value">200,000+</div>
                <div className="stat-description">Trajets realises</div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.3} direction="up">
              <div className="stat-card">
                <div className="stat-icon">
                  <MapPin style={{ width: 40, height: 40 }} />
                </div>
                <div className="stat-value">150+</div>
                <div className="stat-description">Villes couvertes</div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.4} direction="up">
              <div className="stat-card">
                <div className="stat-icon">
                  <Star style={{ width: 40, height: 40 }} />
                </div>
                <div className="stat-value">4.8/5</div>
                <div className="stat-description">Note moyenne</div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      <section className="safety-section">
        <div className="ms-container">
          <div className="safety-content">
            <ScrollFadeIn direction="left">
              <div className="safety-text">
                <h2>Votre securite, notre priorite</h2>
                <p className="safety-intro">
                  Chez MoveShare, nous mettons tout en oeuvre pour garantir
                  des trajets surs et sereins a tous nos utilisateurs.
                </p>

                <div className="safety-features">
                  <div className="safety-feature">
                    <Check style={{ width: 20, height: 20, color: 'var(--ms-success)' }} />
                    <span>Verification d'identite obligatoire pour tous les conducteurs</span>
                  </div>
                  <div className="safety-feature">
                    <Check style={{ width: 20, height: 20, color: 'var(--ms-success)' }} />
                    <span>Controle des permis de conduire et assurances</span>
                  </div>
                  <div className="safety-feature">
                    <Check style={{ width: 20, height: 20, color: 'var(--ms-success)' }} />
                    <span>Systeme de notation et avis verifies</span>
                  </div>
                  <div className="safety-feature">
                    <Check style={{ width: 20, height: 20, color: 'var(--ms-success)' }} />
                    <span>Paiements securises via notre plateforme</span>
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
            </ScrollFadeIn>

            <ScrollFadeIn direction="right" delay={0.2}>
              <div className="safety-image">
                <img
                  src="https://images.pexels.com/photos/7464537/pexels-photo-7464537.jpeg"
                  alt="Groupe d'amis heureux dans une voiture"
                  className="safety-img"
                />
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="ms-container">
          <ScrollFadeIn direction="up" duration={0.8}>
            <Card className="cta-card">
              <h2>Pret a commencer votre voyage ?</h2>
              <p>
                Rejoignez des milliers d'utilisateurs qui voyagent malin et economique
              </p>
              <div className="cta-buttons">
                <Button size="lg" onClick={() => window.location.href = '/register'}>
                  Creer un compte gratuit
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/rides'}>
                  Decouvrir les trajets
                </Button>
              </div>
            </Card>
          </ScrollFadeIn>
        </div>
      </section>

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
                <li><Link to="/vehicles">Mes vehicules</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>A propos</h4>
              <ul>
                <li><a href="#about">Qui sommes-nous</a></li>
                <li><a href="#safety">Securite</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="#terms">Conditions d'utilisation</a></li>
                <li><a href="#privacy">Politique de confidentialite</a></li>
                <li><a href="#cookies">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 MoveShare.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

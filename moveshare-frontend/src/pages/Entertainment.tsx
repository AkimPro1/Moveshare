import { useState } from 'react'
import { BookOpen, Lightbulb, Newspaper, Gamepad2, Film, X } from 'lucide-react'
import { SnakeGame, MatchstickGame, TriviaGame } from '../components/Games'
import '../styles/Entertainment.css'

interface Video {
  id: string
  title: string
  videoId: string
  thumbnail: string
}

interface Story {
  id: string
  title: string
  author: string
  duration: string
  category: string
  content: string
}

interface FunFact {
  id: string
  fact: string
  category: string
}

interface NewsItem {
  id: string
  title: string
  description: string
  source: string
  timestamp: string
  category: string
  fullContent: string
  author: string
}

export default function Entertainment() {
  const [activeTab, setActiveTab] = useState<'youtube' | 'stories' | 'funfacts' | 'news' | 'games'>('youtube')
  const [activeGame, setActiveGame] = useState<'snake' | 'matchstick' | 'trivia' | null>(null)
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  // YouTube videos
  const youtubeVideos: Video[] = [
    {
      id: '1',
      title: 'Road Trip Vlog - Scenic Drives',
      videoId: 'dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
      id: '2',
      title: 'Travel Playlist - Best Songs for Driving',
      videoId: '9bZkp7q19f0',
      thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg'
    },
    {
      id: '3',
      title: 'Car Maintenance Tips',
      videoId: 'jNQXAC9IVRw',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg'
    },
    {
      id: '4',
      title: 'Amazing Road Adventures',
      videoId: 'kJQDjnMrIEU',
      thumbnail: 'https://img.youtube.com/vi/kJQDjnMrIEU/hqdefault.jpg'
    }
  ]

  // Histoires courtes complètes
  const stories: Story[] = [
    {
      id: '1',
      title: 'Le Dernier Voyage',
      author: 'Marie Leclerc',
      duration: '8 min',
      category: 'Fiction',
      content: `Un homme découvre une vieille lettre jaunie dans un coin oublié de la gare de Lyon. Cette lettre, datée de 1982, change complètement le cours de sa vie. Le destinataire, dont le nom est à peine lisible, semble avoir une importance capitale.

L'enveloppe porte le tampon d'une petite ville du sud-ouest: Auch. Sans vraiment savoir pourquoi, cet homme décide de partir à la recherche de l'auteur de cette lettre. Il commence par consulter les archives publiques, puis interroge les habitants des villages environnants.

Chaque étape de son voyage le rapproche de la vérité. À Toulouse, il rencontre une vieille dame qui se souvient d'une histoire d'amour interdit. À Montauban, un ancien journaliste lui parle d'une famille importante qui a quitté la région mystérieusement.

Finalement, après des mois de recherches, il arrive à Auch. Là, il découvre que l'auteur de la lettre était un homme qui n'a jamais osé l'envoyer. Cette lettre contient une confession, un pardon et un amour jamais avoué.

La rencontre avec les descendants de cet homme change à jamais la perspective du voyageur. Il réalise que certaines histoires méritent d'être connues, que certains amours, bien que perdus, restent éternels.

Ce voyage, entrepris sur un coup de tête, devient la plus grande aventure de sa vie et lui enseigne que les histoires du passé peuvent éclairer le chemin du futur.`
    },
    {
      id: '2',
      title: 'Rencontre au Carrefour',
      author: 'Jean Dupont',
      duration: '6 min',
      category: 'Aventure',
      content: `Deux voyageurs se croisent dans un petit café perdu sur la route de Limoges. C'est une journée grise, les nuages menacent et le vent fouette les vitres du café.

Le premier est un homme âgé, usé par les années de voyage. Le second est une jeune femme qui fuit quelque chose, on le voit dans ses yeux inquiets. Ils se retrouvent assis à la même table, presque par hasard.

Ils commencent à parler, d'abord timidement, puis avec une confiance croissante. L'homme raconte ses decades de voyages à travers le monde, ses rencontres extraordinaires, ses déceptions aussi. La jeune femme écoute, captivée par chaque histoire.

À son tour, elle parle de ses rêves, de ses regrets, de cette vie qu'elle n'a jamais osé vivre. Elle confesse que ces derniers mois, elle se sentait perdue, comme si elle avait raté sa vie avant même qu'elle ne commence vraiment.

Mais à travers la conversation avec ce vieil homme, quelque chose change. Elle voit que la vie n'est jamais terminée, qu'il est toujours temps de changer de cap. L'homme, lui, se rend compte que malgré ses voyages, c'est cette simple conversation qui lui donne le sentiment d'avoir vécu quelque chose de profondément humain.

Quand ils se quittent à la sortie du café, ce n'est pas comme deux étrangers qui se quittent. C'est comme deux amis qui se sont rencontrés au bon moment, au bon endroit. Une amitié inattendue, née d'une simple pause sur la route.

Mois après mois, ils continueront à correspondre, partageant leurs vies respectives, leurs nouvelles aventures. Et chaque fois qu'un d'eux passera près de ce petit café, il pensa à cette rencontre qui a tout changé.`
    },
    {
      id: '3',
      title: 'La Carte Perdue',
      author: 'Sophie Martin',
      duration: '7 min',
      category: 'Mystère',
      content: `Un conducteur routier découvre une carte ancienne sous le siège de sa voiture en la nettoyant un dimanche après-midi. Cette carte n'était certainement pas là avant. Elle est marquée de croix rouges à différents endroits, certaines avec des annotations en écriture cursive difficile à lire.

Intrigué, il décide de suivre les croix. La première le mène à une maison abandonnée à la périphérie de Marseille. Là, il découvre des photographies jaunies, des lettres jamais envoyées, les traces d'une vie figée dans le temps.

La deuxième croix le guide vers une petite chapelle en ruines au pied des Alpes. Un endroit où, selon une inscription sur la pierre, un événement important s'est déroulé en 1960. Il trouve des fleurs séchées, des bougies usées, comme si quelqu'un venait régulièrement prier ici.

À chaque nouvelle croix, l'histoire devient plus claire. C'est la vie d'une femme qui a aimé un homme qu'elle ne pouvait pas avoir. Ces lieux sont les endroits témoins de leur histoire impossible, les points de passage d'un amour que le monde n'avait jamais connu.

La dernière croix le mène à un cimetière tranquille. Là, il découvre deux tombes côte à côte, datées de 2015. Après tout ce temps, après une vie séparée, ils ont choisi de reposer ensemble.

En lisant la pierre tombale, il remarque une inscription: "Pour ceux qui cherchent à comprendre notre histoire, sachez que l'amour transcende tout, même la mort elle-même." Et au-dessous, écrit en minuscules: "Si vous trouvez cette carte, vous êtes celui qui devait la trouver."

Le chauffeur garde précieusement cette carte. Il a l'impression d'avoir reçu un héritage, une mission: transmettre cette histoire d'amour à jamais à ceux qui sauront l'apprécier.`
    },
    {
      id: '4',
      title: 'Secrets d\'Autoroute',
      author: 'Pierre Blanc',
      duration: '9 min',
      category: 'Suspense',
      content: `Pendant un long trajet sur l'autoroute A7, un passager calmement assis à l'avant remarque quelque chose d'étrange dans le comportement du chauffeur. Cet homme, apparemment ordinaire, semble tendu, nerveuxà chaque sortie de l'autoroute.

Quand ils s'arrêtent à une aire de repos à Lyon, le passager découvre accidentellement des documents dans la boîte à gants. Des rapports de police, des articles de journaux, des photos. Le cœur du passager s'accélère. Son chauffeur est recherché pour une disparition, celle d'une jeune femme datant de dix ans.

Le passager doit agir avec prudence. Il ne sait pas si le chauffeur est réellement coupable ou victime d'une terrible erreur judiciaire. Il ne sait pas s'il est en danger. Tout ce qu'il sait, c'est qu'il détient maintenant un secret qui pourrait changer des vies.

Durant les heures suivantes, assis dans cette voiture qui roule toujours, il écoute le chauffeur parler. Et graduellement, une histoire différente émerge. Une histoire d'amour, de jalousie, de malentendus et d'une justice imparfaite.

Le chauffeur explique comment il a été accusé à tort, comment les vraies preuves ont été ignorées, comment il a dû fuir car personne ne le croyait. Pendant dix ans, il a roulé, se cachant en plain sight, attendant le jour où quelqu'un l'écouterait vraiment.

Le passager le croit. Ou peut-être veut-il simplement le croire. Ils arrivent à Marseille. Le chauffeur remet tout ce qu'il a entre les mains du passager, confiant qu'enfin, quelqu'un pourrait faire justice.

En descendant de la voiture, le passager sait que sa vie vient de basculer. Il ne peut plus ignorer ce qu'il sait. Il ne peut plus prétendre que cette conversation n'a jamais eu lieu. Désormais, il porte le poids de ce secret, et avec lui, la responsabilité de révéler la vérité.`
    }
  ]

  // Anecdotes amusantes
  const funFacts: FunFact[] = [
    {
      id: '1',
      fact: 'Les poules ne peuvent voir que 100 mètres loin, tandis que les aigles peuvent voir jusqu\'à 8 km!',
      category: 'Animaux'
    },
    {
      id: '2',
      fact: 'Le miel ne se gâte jamais. Des archéologues ont trouvé du miel de 3000 ans encore comestible!',
      category: 'Science'
    },
    {
      id: '3',
      fact: 'Les bananes sont des herbes, pas des fruits... techniquement parlant!',
      category: 'Nature'
    },
    {
      id: '4',
      fact: 'Un escargot peut dormir pendant 3 ans sans problème.',
      category: 'Animaux'
    },
    {
      id: '5',
      fact: 'La Terre est la seule planète nommée d\'après une déesse non-romaine dans le système solaire.',
      category: 'Espace'
    },
    {
      id: '6',
      fact: 'Votre nez peut mémoriser 50 000 odeurs différentes!',
      category: 'Corps Humain'
    },
    {
      id: '7',
      fact: 'Les coraux sont en fait des animaux, pas des plantes.',
      category: 'Océan'
    },
    {
      id: '8',
      fact: 'Un jour sur Vénus dure plus longtemps qu\'une année vénusienne!',
      category: 'Espace'
    }
  ]

  // Actualités MSN avec contenu complet
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Nouvelles règles de transport en 2026',
      description: 'Les autorités annoncent des changements majeurs dans les réglementations de covoiturage...',
      source: 'MSN Actualités',
      timestamp: 'Il y a 2h',
      category: 'Transport',
      author: 'Sophie Bernard',
      fullContent: `Les autorités nationales ont annoncé aujourd'hui une série de changements majeurs dans les réglementations de covoiturage pour améliorer la sécurité et l'équité. Ces nouvelles mesures entreront en vigueur le 1er février 2026 et affecteront tous les services de covoiturage du territoire.

Parmi les principaux changements:
- Obligation d'une vérification d'antécédents plus stricte pour tous les conducteurs
- Mise en place d'un système de notation unifié pour les passagers et les conducteurs
- Augmentation des exigences d'assurance pour les véhicules de covoiturage
- Création d'un fonds de protection pour les utilisateurs en cas de litige

Le ministre des Transports a déclaré: "Ces réglementations garantiront que le covoiturage reste un mode de transport sûr, fiable et équitable pour tous les Français. Nous écoutons les retours des utilisateurs et nous nous engageons à créer un écosystème de transport durable."

Les plateformes de covoiturage disposent de trois mois pour se conformer aux nouvelles normes. Des amendes substantielles ont été prévues pour les contrevenants.`
    },
    {
      id: '2',
      title: 'Technologie autonome: les dernières avancées',
      description: 'Les constructeurs automobiles présentent les véhicules autonomes de nouvelle génération...',
      source: 'MSN Tech',
      timestamp: 'Il y a 4h',
      category: 'Technologie',
      author: 'Jean Moreau',
      fullContent: `Lors d'une conférence de presse tenue à Paris, les plus grands constructeurs automobiles ont présenté les véhicules autonomes de nouvelle génération avec des capacités considérablement améliorées.

Les innovations clés incluent:
- Systèmes d'IA capables de traiter les informations 10 fois plus rapidement que les générations précédentes
- Améliorations majeures en reconnaissance des piétons et des cyclistes
- Intégration seamless avec les infrastructure de villes intelligentes
- Réduction des coûts de production de 30%

Le PDG de TechAuto a déclaré: "Nous sommes à l'aube d'une révolution du transport. Les véhicules autonomes ne sont plus une science-fiction; ils sont une réalité qui transformera le covoiturage au cours des cinq prochaines années."

Les essais pilotes commenceront dans 15 villes françaises en 2026, avec un déploiement complet prévu pour 2028.`
    },
    {
      id: '3',
      title: 'Mobilité verte: l\'électrique gagne du terrain',
      description: 'Les ventes de véhicules électriques ont augmenté de 45% cette année...',
      source: 'MSN Éco',
      timestamp: 'Il y a 6h',
      category: 'Environnement',
      author: 'Marie Dupont',
      fullContent: `Les dernières statistiques publiées par le ministère de l'Écologie montrent que les ventes de véhicules électriques ont augmenté de 45% en 2025, marquant un tournant majeur dans la transition énergétique du transport.

Points clés de ce rapport:
- Plus de 2 millions de véhicules électriques maintenant en circulation en France
- Expansion significative du réseau de recharge: 50 000 bornes disponibles
- Réduction des prix des batteries de 40% sur les deux dernières années
- Subventions gouvernementales pour les véhicules électriques de second marché

Cependant, des défis restent:
- Infrastructure de recharge inégalement distribuée entre les zones rurales et urbaines
- Temps de recharge toujours considéré comme un obstacle par certains conducteurs
- Besoin d'une meilleure coordination entre les différentes plateformes de recharge

Les experts estiment que d'ici 2030, les véhicules électriques représenteront 60% du parc automobile français.`
    },
    {
      id: '4',
      title: 'Sécurité routière: conseils essentiels',
      description: 'Les experts partagent les meilleures pratiques pour rester en sécurité...',
      source: 'MSN Sécurité',
      timestamp: 'Il y a 8h',
      category: 'Sécurité',
      author: 'Marc Leclerc',
      fullContent: `Avec l'augmentation des trajets longue distance, la Sécurité Routière a publié un guide complet des meilleures pratiques pour minimiser les risques.

Recommandations principales:
- Prendre une pause toutes les deux heures lors de trajets longs
- Éviter de voyager entre minuit et 6h du matin si possible
- Utiliser des applications de co-voiturage fiables et vérifiées
- Partager votre itinéraire avec un ami ou un membre de la famille
- Établir une bonne communication avec votre co-conducteur ou vos passagers
- Vérifier l'état du véhicule avant chaque trajet

Pour les voyageurs fréquents:
- Maintenez votre véhicule en bon état de fonctionnement
- Investissez dans une formation de conduite défensive
- Utilisez des systèmes d'alerte de fatigue si disponibles
- Envisagez l'assurance voyage supplémentaire

"La route est un environnement partagé qui demande respect, attention et responsabilité," affirme le directeur de la Sécurité Routière.`
    },
    {
      id: '5',
      title: 'Impact de l\'IA sur les transports',
      description: 'Comment l\'intelligence artificielle révolutionne l\'industrie des transports...',
      source: 'MSN Innovation',
      timestamp: 'Hier',
      category: 'Technologie',
      author: 'Nathalie Bernard',
      fullContent: `Un rapport extensive du centre de recherche sur les transports détaille comment l'intelligence artificielle transforme fondamentalement l'industrie du covoiturage et du transport.

Applications de l'IA en cours de développement:
- Algorithmes de jumelage prédictifs qui optimisent les trajets
- Systèmes de tarification dynamique basés sur la demande réelle
- Prévention des fraudes en temps réel
- Optimisation des itinéraires pour réduire les émissions
- Chatbots de support client disponibles 24/7

Impact économique:
- Augmentation de l'efficacité opérationnelle de 35%
- Réduction des coûts pour les utilisateurs de 20%
- Création de 50 000 nouveaux emplois dans le secteur tech

Défis à relever:
- Préoccupations concernant la vie privée et la collecte de données
- Besoin de réglementation appropriée
- Formation des travailleurs pour adapter à la technologie

Les experts prédisent que l'IA jouera un rôle central dans l'atteinte des objectifs de durabilité dans le transport d'ici 2030.`
    }
  ]

  // Games list
  const games = [
    {
      id: 'snake',
      title: 'Snake Game',
      description: 'Guidez le serpent et mangez la nourriture!',
      emoji: '🐍'
    },
    {
      id: 'matchstick',
      title: 'Jeu des Allumettes',
      description: 'Jouez contre l\'IA pour gagner!',
      emoji: '🔥'
    },
    {
      id: 'trivia',
      title: 'Trivia Quiz',
      description: 'Testez vos connaissances!',
      emoji: '🎯'
    }
  ]

  return (
    <div className="ms-container">
      <div className="entertainment-page">
        {/* Header */}
        <div className="entertainment-header">
          <h1>🎉 Divertissement</h1>
          <p>Prendre une pause et s'amuser pendant vos trajets !</p>
        </div>

        {/* Tabs */}
        <div className="entertainment-tabs">
          <button
            className={`entertainment-tab ${activeTab === 'youtube' ? 'active' : ''}`}
            onClick={() => setActiveTab('youtube')}
          >
            <Film style={{ width: 20, height: 20 }} />
            <span>YouTube</span>
          </button>
          <button
            className={`entertainment-tab ${activeTab === 'stories' ? 'active' : ''}`}
            onClick={() => setActiveTab('stories')}
          >
            <BookOpen style={{ width: 20, height: 20 }} />
            <span>Histoires</span>
          </button>
          <button
            className={`entertainment-tab ${activeTab === 'funfacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('funfacts')}
          >
            <Lightbulb style={{ width: 20, height: 20 }} />
            <span>Anecdotes</span>
          </button>
          <button
            className={`entertainment-tab ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <Newspaper style={{ width: 20, height: 20 }} />
            <span>Actualités</span>
          </button>
          <button
            className={`entertainment-tab ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => setActiveTab('games')}
          >
            <Gamepad2 style={{ width: 20, height: 20 }} />
            <span>Jeux</span>
          </button>
        </div>

        {/* Content */}
        <div className="entertainment-content">
          {/* YouTube Section */}
          {activeTab === 'youtube' && (
            <div className="entertainment-section">
              <h2>🎬 Vidéos YouTube Populaires</h2>
              <div className="entertainment-grid">
                {youtubeVideos.map((video) => (
                  <div key={video.id} className="video-card">
                    <div className="video-thumbnail">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="thumbnail-img"
                      />
                      <div className="play-button">
                        <Film style={{ width: 40, height: 40 }} fill="white" />
                      </div>
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="video-link"
                        title="Regarder dans l'application"
                      >
                        Regarder
                      </button>
                    </div>
                    <div className="video-info">
                      <h3>{video.title}</h3>
                      <p>Cliquez pour regarder dans l'app</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stories Section */}
          {activeTab === 'stories' && (
            <div className="entertainment-section">
              <h2>📖 Histoires Courtes</h2>
              <p className="section-subtitle">Lectures captivantes pour vos trajets (5-10 minutes)</p>
              <div className="stories-grid">
                {stories.map((story) => (
                  <div key={story.id} className="story-card">
                    <div className="story-header">
                      <span className="story-category">{story.category}</span>
                      <span className="story-duration">⏱️ {story.duration}</span>
                    </div>
                    <h3>{story.title}</h3>
                    <p className="story-author">par {story.author}</p>
                    <button 
                      className="read-btn"
                      onClick={() => setSelectedStory(story)}
                    >
                      Lire l'histoire
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fun Facts Section */}
          {activeTab === 'funfacts' && (
            <div className="entertainment-section">
              <h2>💡 Anecdotes Amusantes</h2>
              <p className="section-subtitle">Faits intéressants et blagues du jour</p>
              <div className="funfacts-grid">
                {funFacts.map((item, index) => (
                  <div key={item.id} className="funfact-card">
                    <div className="funfact-number">#{index + 1}</div>
                    <div className="funfact-category">{item.category}</div>
                    <p className="funfact-text">{item.fact}</p>
                    <div className="funfact-icon">✨</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* News Section */}
          {activeTab === 'news' && (
            <div className="entertainment-section">
              <h2>📰 Actualités MSN</h2>
              <p className="section-subtitle">Restez informé avec les dernières actualités</p>
              <div className="news-grid">
                {newsItems.map((news) => (
                  <div key={news.id} className="news-card">
                    <div className="news-header">
                      <span className="news-category">{news.category}</span>
                      <span className="news-time">{news.timestamp}</span>
                    </div>
                    <h3>{news.title}</h3>
                    <p className="news-description">{news.description}</p>
                    <button 
                      className="news-link"
                      onClick={() => setSelectedNews(news)}
                    >
                      Lire plus →
                    </button>
                    <div className="news-source">{news.source}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Games Section */}
          {activeTab === 'games' && (
            <div className="entertainment-section">
              <h2>🎮 Jeux Amusants</h2>
              <div className="entertainment-grid">
                {games.map((game) => (
                  <div key={game.id} className="game-card">
                    <div className="game-icon">{game.emoji}</div>
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                    <button 
                      className="game-button" 
                      onClick={() => setActiveGame(game.id as 'snake' | 'matchstick' | 'trivia')}
                    >
                      Jouer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="entertainment-features">
          <div className="feature-card">
            <Film style={{ width: 32, height: 32 }} />
            <h3>Vidéos YouTube</h3>
            <p>Contenus vidéo directement dans l'app</p>
          </div>
          <div className="feature-card">
            <BookOpen style={{ width: 32, height: 32 }} />
            <h3>Histoires Complètes</h3>
            <p>Lectures captivantes et engageantes</p>
          </div>
          <div className="feature-card">
            <Lightbulb style={{ width: 32, height: 32 }} />
            <h3>Anecdotes Fascinantes</h3>
            <p>Découvrez des faits intéressants</p>
          </div>
          <div className="feature-card">
            <Newspaper style={{ width: 32, height: 32 }} />
            <h3>Actualités Complètes</h3>
            <p>Restez informé en détail</p>
          </div>
          <div className="feature-card">
            <Gamepad2 style={{ width: 32, height: 32 }} />
            <h3>Jeux Interactifs</h3>
            <p>Jeux amusants pour vous divertir</p>
          </div>
        </div>
      </div>

      {/* YouTube Video Player Modal */}
      {selectedVideo && (
        <div className="video-modal">
          <div className="video-player-container">
            <button 
              className="video-close-btn"
              onClick={() => setSelectedVideo(null)}
              title="Fermer"
            >
              <X size={28} />
            </button>
            <h2>{selectedVideo.title}</h2>
            <div className="video-player">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Story Reader Modal */}
      {selectedStory && (
        <div className="story-modal">
          <div className="story-reader-container">
            <button 
              className="story-close-btn"
              onClick={() => setSelectedStory(null)}
              title="Fermer"
            >
              <X size={28} />
            </button>
            <div className="story-reader-header">
              <h2>{selectedStory.title}</h2>
              <p className="reader-meta">par {selectedStory.author} • {selectedStory.duration}</p>
            </div>
            <div className="story-reader-content">
              {selectedStory.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="news-modal">
          <div className="news-detail-container">
            <button 
              className="news-close-btn"
              onClick={() => setSelectedNews(null)}
              title="Fermer"
            >
              <X size={28} />
            </button>
            <div className="news-detail-header">
              <div className="news-detail-meta">
                <span className="news-detail-category">{selectedNews.category}</span>
                <span className="news-detail-time">{selectedNews.timestamp}</span>
              </div>
              <h1>{selectedNews.title}</h1>
              <div className="news-detail-author">
                <span>Par {selectedNews.author}</span>
                <span className="news-detail-source">{selectedNews.source}</span>
              </div>
            </div>
            <div className="news-detail-content">
              {selectedNews.fullContent.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game Modals */}
      {activeGame === 'snake' && <SnakeGame onClose={() => setActiveGame(null)} />}
      {activeGame === 'matchstick' && <MatchstickGame onClose={() => setActiveGame(null)} />}
      {activeGame === 'trivia' && <TriviaGame onClose={() => setActiveGame(null)} />}
    </div>
  )
}

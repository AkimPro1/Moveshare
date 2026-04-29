import { useState } from 'react'
import { BookOpen, Gamepad2, X } from 'lucide-react'
import { SnakeGame, MatchstickGame, TriviaGame } from '../components/Games'
import '../styles/Entertainment.css'

interface Story {
  id: string
  title: string
  author: string
  duration: string
  category: string
  content: string
}

export default function Entertainment() {
  const [activeTab, setActiveTab] = useState<'stories' | 'games'>('stories')
  const [activeGame, setActiveGame] = useState<'snake' | 'matchstick' | 'trivia' | null>(null)
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)

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

Le chauffeur explique comment il a été accusé à tort, comment les vraies preuves ont été ignorées, comment il a dû fuir car personne ne le croyait. Pendant dix ans, he a roulé, se cachant en plain sight, attendant le jour où quelqu'un l'écouterait vraiment.

Le passager le croit. Ou peut-être veut-il simplement le croire. Ils arrivent à Marseille. Le chauffeur remet tout ce qu'il a entre les mains du passager, confiant qu'enfin, quelqu'un pourrait faire justice.

En descendant de la voiture, le passager sait que sa vie vient de basculer. Il ne peut plus ignorer ce qu'il sait. Il ne peut plus prétendre que cette conversation n'a jamais eu lieu. Désormais, il porte le poids de ce secret, et avec lui, la responsabilité de révéler la vérité.`
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
            className={`entertainment-tab ${activeTab === 'stories' ? 'active' : ''}`}
            onClick={() => setActiveTab('stories')}
          >
            <BookOpen style={{ width: 20, height: 20 }} />
            <span>Histoires</span>
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
            <BookOpen style={{ width: 32, height: 32 }} />
            <h3>Histoires Complètes</h3>
            <p>Lectures captivantes et engageantes</p>
          </div>
          <div className="feature-card">
            <Gamepad2 style={{ width: 32, height: 32 }} />
            <h3>Jeux Interactifs</h3>
            <p>Jeux amusants pour vous divertir</p>
          </div>
        </div>
      </div>

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

      {/* Game Modals */}
      {activeGame === 'snake' && <SnakeGame onClose={() => setActiveGame(null)} />}
      {activeGame === 'matchstick' && <MatchstickGame onClose={() => setActiveGame(null)} />}
      {activeGame === 'trivia' && <TriviaGame onClose={() => setActiveGame(null)} />}
    </div>
  )
}

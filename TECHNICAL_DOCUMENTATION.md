# 🔧 Documentation Technique - Jeux & Entertainment

## Architecture Globale

```
moveshare-frontend/
├── src/
│   ├── pages/
│   │   └── Entertainment.tsx          (Page principale)
│   ├── components/
│   │   └── Games.tsx                  (Logique des 3 jeux)
│   │   └── Games.css                  (Styles des jeux)
│   ├── styles/
│   │   └── Entertainment.css          (Styles vidéos)
│   ├── App.tsx                         (Route /entertainment)
│   └── main.tsx                        (Entry point)
```

---

## Fichiers Détaillés

### 1. Entertainment.tsx (250 lignes)

**Responsabilités**:
- Gestion des onglets (YouTube, TikTok, Jeux)
- Rendu des vidéos YouTube
- Rendu des vidéos TikTok
- Gestion de l'état `activeGame`
- Conditionnement des modales de jeux

**États principaux**:
```tsx
const [activeTab, setActiveTab] = useState<'youtube' | 'tiktok' | 'games'>('youtube')
const [activeGame, setActiveGame] = useState<'2048' | 'reaction' | 'trivia' | null>(null)
```

**Données**:
```tsx
youtubeVideos: Video[]    // 4 vidéos avec URL thumbnails
tiktokVideos: TikTok[]    // 4 vidéos avec liens directs
games: Game[]             // 3 jeux avec id et descriptions
```

**Modales**:
```tsx
{activeGame === '2048' && <Game2048 onClose={() => setActiveGame(null)} />}
{activeGame === 'reaction' && <ReactionGame onClose={() => setActiveGame(null)} />}
{activeGame === 'trivia' && <TriviaGame onClose={() => setActiveGame(null)} />}
```

---

### 2. Games.tsx (350+ lignes)

#### Structure

```tsx
interface GameComponentProps {
  onClose: () => void
}

export function Game2048({ onClose }: GameComponentProps) { ... }
export function ReactionGame({ onClose }: GameComponentProps) { ... }
export function TriviaGame({ onClose }: GameComponentProps) { ... }
```

#### Game2048 - États

```tsx
const [grid, setGrid] = useState<number[][]>()      // Grille 4×4
const [score, setScore] = useState(0)               // Score actuel
const [gameOver, setGameOver] = useState(false)     // Jeu terminé?
```

#### Game2048 - Fonctions Clés

```tsx
initializeGame()              // Reset complète
addNewTile(grid)              // Ajoute une tuile 2 ou 4
moveLeft(arr)                 // Déplace et fusionne à gauche
move(direction)               // Applique un mouvement
checkGameOver(grid)           // Vérifie si jeu terminé
```

#### Game2048 - Logique de Mouvement

```tsx
move('left'):
  1. Pour chaque ligne:
     - Passer les zéros
     - Fusionner les nombres identiques
     - Remplir avec des zéros
  2. Ajouter une nouvelle tuile
  3. Mettre à jour l'état

move('up/down/right'):
  - Même logique mais transposé/inversé
```

#### Game2048 - Détection des Touches

```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') move('left')
    if (e.key === 'ArrowRight') move('right')
    if (e.key === 'ArrowUp') move('up')
    if (e.key === 'ArrowDown') move('down')
  }
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [grid, gameOver])
```

---

#### ReactionGame - États

```tsx
const [reactionTime, setReactionTime] = useState<number | null>(null)
const [status, setStatus] = useState<'waiting' | 'red' | 'green'>('waiting')
const [startTime, setStartTime] = useState<number | null>(null)
const [message, setMessage] = useState('Click "Start Test" when ready!')
```

#### ReactionGame - Flux

```tsx
startTest():
  1. status = 'red'
  2. message = 'Wait for green...'
  3. Attendre 2000 + random(0-3000) ms
  4. status = 'green'
  5. startTime = Date.now()
  6. message = 'CLICK NOW!'

handleClick():
  Si status === 'green':
    1. time = Date.now() - startTime
    2. reactionTime = time
    3. Afficher le temps
```

---

#### TriviaGame - Données

```tsx
const TRIVIA_QUESTIONS = [
  {
    question: 'Quel est le plus grand océan du monde?',
    options: ['Atlantique', 'Pacifique', 'Indien', 'Arctique'],
    correct: 1  // Index de la réponse correcte
  },
  // ... 3 autres questions
]
```

#### TriviaGame - États

```tsx
const [score, setScore] = useState(0)                      // Points
const [currentQuestion, setCurrentQuestion] = useState(0)  // Indice question
const [answered, setAnswered] = useState(false)            // Répondu?
const [selectedAnswer, setSelectedAnswer] = useState(null) // Index réponse choisie
const [gameEnded, setGameEnded] = useState(false)          // Quiz terminé?
```

#### TriviaGame - Flux

```tsx
handleAnswer(index):
  1. selectedAnswer = index
  2. Si correct:
     - Bouton = vert
     - score++
  3. Si faux:
     - Bouton = rouge
     - Afficher correct (vert)
  4. answered = true

nextQuestion():
  Si currentQuestion < length-1:
    currentQuestion++
  Sinon:
    gameEnded = true
```

---

### 3. Games.css (400+ lignes)

#### Structure

```css
/* Modal Container */
.game-modal { ... }
.game-container { ... }
.game-header { ... }
.close-btn { ... }

/* Game Board (2048) */
.game-board { ... }
.game-grid { ... }
.game-cell { ... }

/* Reaction Game */
.traffic-light { ... }
.traffic-light.green { ... }

/* Trivia Options */
.options { ... }
.option-btn { ... }

/* Animations */
@keyframes popIn { ... }
@keyframes fadeIn { ... }
@keyframes pulse { ... }
```

#### Classe Modal Principale

```css
.game-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
```

#### Grille 2048

```css
.game-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  height: 100%;
}

.game-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.game-cell:not(.empty-cell) {
  background: linear-gradient(135deg, #00d4ff 0%, #a855f7 100%);
  animation: popIn 0.3s ease;
}
```

#### Feu de Circulation

```css
.traffic-light {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  animation: pulse 1s infinite;
}

.traffic-light.red {
  background: #ef4444;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
}

.traffic-light.green {
  background: #22c55e;
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
}
```

---

### 4. Entertainment.css (600+ lignes)

Structure similaire mais pour les vidéos et tabs.

---

## Imports & Dépendances

### Entertainment.tsx
```tsx
import { useState } from 'react'
import { Play, Music, Film, Gamepad2 } from 'lucide-react'
import { Game2048, ReactionGame, TriviaGame } from '../components/Games'
import '../styles/Entertainment.css'
```

### Games.tsx
```tsx
import { useState, useEffect } from 'react'
import './Games.css'
```

### App.tsx
```tsx
import Entertainment from './pages/Entertainment'

// Dans les routes:
<Route path="/entertainment" element={<Entertainment />} />
```

### Header.tsx
```tsx
// Import Sparkles
import { Sparkles } from 'lucide-react'

// Dans le nav:
<Link to="/entertainment" className={...}>
  <Sparkles style={{ width: 18, height: 18 }} />
  Divertissement
</Link>
```

---

## Types & Interfaces

```tsx
interface GameComponentProps {
  onClose: () => void
}

interface Video {
  id: string
  title: string
  type: 'youtube' | 'tiktok'
  videoId: string
  thumbnail: string
}

interface Game {
  id: string
  title: string
  description: string
  emoji: string
}
```

---

## Performance Optimizations

### Memoization
```tsx
// Pas encore appliqué, mais peut être avec:
const youtubeVideos = useMemo(() => [...], [])
```

### Event Listener Cleanup
```tsx
useEffect(() => {
  const handler = (e) => { ... }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)  // ✅ Cleanup
}, [])
```

### Modal Click Prevention
```tsx
<div className="game-modal" onClick={onClose}>
  <div className="game-container" onClick={(e) => e.stopPropagation()}>
    {/* Contenu */}
  </div>
</div>
```

---

## Accessibility Features

### Keyboard Navigation
- ✅ Jeu 2048: Flèches du clavier
- ✅ Trivia: Tabulation entre boutons
- ✅ Fermer: Touche Escape (à ajouter)

### Semantic HTML
- ✅ Boutons avec `<button>`
- ✅ Labels sur les inputs (via titre)
- ✅ ARIA labels (optionnel)

### Contrast Ratios
- ✅ Texte blanc sur dégradés sombres
- ✅ Boutons vert/rouge pour colorblind

---

## Responsive Design

### Breakpoints

```css
/* Mobile: 0px - 640px */
@media (max-width: 640px) {
  .game-container {
    padding: 1.5rem;
  }
  .game-header h2 {
    font-size: 1.5rem;  /* Plus petit sur mobile */
  }
}

/* Tablet: 641px - 1024px */
/* Pas de CSS spécial, utilise mobile */

/* Desktop: 1025px+ */
/* Utilise les styles par défaut */
```

---

## API Externe

### YouTube
```tsx
// Lien embed
href={`https://www.youtube.com/watch?v=${video.videoId}`}

// Thumbnails
src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
```

### TikTok
```tsx
// Lien direct (liens hardcodés)
href={`https://www.tiktok.com/@travel_vlog`}
```

---

## Extensibilité

### Ajouter un Nouveau Jeu

1. **Créer le composant** dans `Games.tsx`:
```tsx
export function SnakeGame({ onClose }: GameComponentProps) {
  // Logique du jeu
  return <div className="game-modal">...</div>
}
```

2. **Ajouter le style** dans `Games.css`:
```css
.snake-grid { ... }
.snake-cell { ... }
```

3. **Ajouter à Entertainment.tsx**:
```tsx
const games = [
  // ...
  {
    id: 'snake',
    title: 'Snake',
    description: '...',
    emoji: '🐍'
  }
]

{activeGame === 'snake' && <SnakeGame onClose={() => setActiveGame(null)} />}
```

---

## Testing Checklist

### Unit Tests (Optionnel)
```tsx
describe('Game2048', () => {
  test('adds new tile on move', () => { ... })
  test('merges identical tiles', () => { ... })
  test('detects game over', () => { ... })
})
```

### Integration Tests
- ✅ Click "Jouer" → Modal ouvre
- ✅ Clavier fonctionne
- ✅ Score augmente
- ✅ X ferme la modale

### E2E Tests
```tsx
cy.visit('/entertainment')
cy.contains('Jeux').click()
cy.contains('Jouer').first().click()
cy.get('.game-modal').should('be.visible')
```

---

## Debugging

### Console Logs Utiles
```tsx
// Dans Game2048
console.log('Grid:', grid)
console.log('Score:', score)
console.log('Moved:', moved)

// Dans ReactionGame
console.log('Start Time:', startTime)
console.log('Reaction Time:', reactionTime)

// Dans TriviaGame
console.log('Current Question:', currentQuestion)
console.log('Selected Answer:', selectedAnswer)
console.log('Correct?', selectedAnswer === TRIVIA_QUESTIONS[currentQuestion].correct)
```

### DevTools
- ✅ React Dev Tools: Inspecter les états
- ✅ Styles: Vérifier les classes CSS appliquées
- ✅ Performance: Checker les animations

---

## Maintenance

### Mises à Jour Régulières
- [ ] Ajouter nouvelles questions trivia
- [ ] Ajouter nouveaux jeux
- [ ] Améliorer les animations
- [ ] Optimiser les performances

### Monitoring
- [ ] Erreurs TypeScript
- [ ] Warnings dans la console
- [ ] Performance (FPS, temps de render)
- [ ] Accessibility issues

---

## Fichiers de Configuration

### tsconfig.json
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "target": "ES2020"
  },
  "include": ["src"]
}
```

### vite.config.ts
```ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175
  }
})
```

---

## Commandes Utiles

```bash
# Développement
npm run dev

# Build
npm run build

# Linting (si configured)
npm run lint

# Tests (si configured)
npm run test

# Preview build
npm run preview
```

---

**Documentation complète pour développeurs.** Pour des questions, consultez le code source! 🚀

import { useState, useEffect } from 'react'
import './Games.css'

interface GameComponentProps {
  onClose: () => void
}

// Snake Game Component
export function SnakeGame({ onClose }: GameComponentProps) {
  const GRID_SIZE = 20
  const CELL_SIZE = 20
  
  const [snake, setSnake] = useState<Array<{ x: number; y: number }>>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ])
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 })
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameActive, setGameActive] = useState(true)

  // Generate random food position
  const generateFood = () => {
    let newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }
    // Make sure food doesn't spawn on snake
    while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
    }
    return newFood
  }

  // Game loop
  useEffect(() => {
    if (!gameActive || gameOver) return

    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake]
        const head = newSnake[0]
        
        // Calculate new head position
        const newHead = {
          x: (head.x + nextDirection.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + nextDirection.y + GRID_SIZE) % GRID_SIZE
        }

        // Check collision with self
        if (newSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true)
          setGameActive(false)
          return prevSnake
        }

        newSnake.unshift(newHead)

        // Check if food eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(prev => prev + 10)
          setFood(generateFood())
        } else {
          newSnake.pop()
        }

        setDirection(nextDirection)
        return newSnake
      })
    }, 150)

    return () => clearInterval(interval)
  }, [gameActive, gameOver, food, nextDirection])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          setNextDirection(prev => prev.y === 0 ? { x: 0, y: -1 } : prev)
          break
        case 'ArrowDown':
          e.preventDefault()
          setNextDirection(prev => prev.y === 0 ? { x: 0, y: 1 } : prev)
          break
        case 'ArrowLeft':
          e.preventDefault()
          setNextDirection(prev => prev.x === 0 ? { x: -1, y: 0 } : prev)
          break
        case 'ArrowRight':
          e.preventDefault()
          setNextDirection(prev => prev.x === 0 ? { x: 1, y: 0 } : prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const resetGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ])
    setFood({ x: 15, y: 15 })
    setDirection({ x: 1, y: 0 })
    setNextDirection({ x: 1, y: 0 })
    setScore(0)
    setGameOver(false)
    setGameActive(true)
  }

  return (
    <div className="game-modal" onClick={onClose}>
      <div className="game-container" onClick={(e) => e.stopPropagation()}>
        <div className="game-header">
          <h2>🐍 Snake</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="game-score">Score: {score}</div>
        <div className="snake-board">
          <div className="snake-grid" style={{ 
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`
          }}>
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
              const x = idx % GRID_SIZE
              const y = Math.floor(idx / GRID_SIZE)
              const isSnake = snake.some(segment => segment.x === x && segment.y === y)
              const isFood = food.x === x && food.y === y
              const isHead = snake[0].x === x && snake[0].y === y

              return (
                <div
                  key={idx}
                  className={`snake-cell ${isSnake ? 'snake' : ''} ${isHead ? 'head' : ''} ${isFood ? 'food' : ''}`}
                >
                  {isFood && '🍎'}
                </div>
              )
            })}
          </div>
        </div>
        <p className="game-instructions">
          {gameOver ? 'Game Over! Use arrow keys to move.' : 'Use arrow keys to move the snake. Eat the food!'}
        </p>
        {gameOver && (
          <button className="reset-btn" onClick={resetGame}>
            Play Again
          </button>
        )}
      </div>
    </div>
  )
}

// Matchstick Game Component
export function MatchstickGame({ onClose }: GameComponentProps) {
  const [piles, setPiles] = useState<number[]>([3, 5, 7])
  const [selectedPile, setSelectedPile] = useState<number | null>(null)
  const [selectedCount, setSelectedCount] = useState(0)
  const [gameMessage, setGameMessage] = useState('Choose a pile and remove 1-3 matchsticks!')
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<'player' | 'ai' | null>(null)
  const [isAITurn, setIsAITurn] = useState(false)

  const checkGameOver = (newPiles: number[]) => {
    const totalMatches = newPiles.reduce((sum, pile) => sum + pile, 0)
    if (totalMatches === 0) {
      setGameOver(true)
      setWinner('player')
      setGameMessage('🎉 You won!')
      return true
    }
    return false
  }

  const aiMove = (currentPiles: number[]) => {
    setIsAITurn(true)
    setTimeout(() => {
      // Simple AI: try to remove matches to make total sum = power of 2
      let bestMove = null
      
      for (let pileIdx = 0; pileIdx < currentPiles.length; pileIdx++) {
        for (let remove = 1; remove <= Math.min(3, currentPiles[pileIdx]); remove++) {
          const newPiles = [...currentPiles]
          newPiles[pileIdx] -= remove
          const total = newPiles.reduce((sum, p) => sum + p, 0)
          
          if (total === 0) {
            bestMove = { pileIdx, remove }
            break
          }
        }
        if (bestMove) break
      }

      // If no winning move, pick random
      if (!bestMove) {
        const validPiles = currentPiles.map((p, i) => p > 0 ? i : -1).filter(i => i >= 0)
        const pileIdx = validPiles[Math.floor(Math.random() * validPiles.length)]
        const remove = Math.floor(Math.random() * Math.min(3, currentPiles[pileIdx])) + 1
        bestMove = { pileIdx, remove }
      }

      const newPiles = [...currentPiles]
      newPiles[bestMove!.pileIdx] -= bestMove!.remove
      setPiles(newPiles)
      setGameMessage(`AI removed ${bestMove!.remove} from pile ${bestMove!.pileIdx + 1}`)

      if (checkGameOver(newPiles)) {
        setWinner('ai')
        setGameMessage('💀 AI won! Try again!')
      } else {
        setIsAITurn(false)
      }
    }, 800)
  }

  const handleRemove = () => {
    if (selectedPile === null || selectedCount === 0) {
      setGameMessage('Select a pile and number of matches!')
      return
    }

    if (selectedCount > piles[selectedPile]) {
      setGameMessage('Cannot remove more than available!')
      return
    }

    const newPiles = [...piles]
    newPiles[selectedPile] -= selectedCount

    setPiles(newPiles)
    setSelectedPile(null)
    setSelectedCount(0)

    if (checkGameOver(newPiles)) {
      return
    }

    setGameMessage('AI is thinking...')
    aiMove(newPiles)
  }

  const resetGame = () => {
    setPiles([3, 5, 7])
    setSelectedPile(null)
    setSelectedCount(0)
    setGameMessage('Choose a pile and remove 1-3 matchsticks!')
    setGameOver(false)
    setWinner(null)
    setIsAITurn(false)
  }

  return (
    <div className="game-modal" onClick={onClose}>
      <div className="game-container" onClick={(e) => e.stopPropagation()}>
        <div className="game-header">
          <h2>🔥 Matchstick Game</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="matchstick-game">
          <p className="game-message">{gameMessage}</p>

          <div className="matchstick-piles">
            {piles.map((count, idx) => (
              <div key={idx} className={`pile ${selectedPile === idx ? 'selected' : ''}`}>
                <div className="pile-label">Pile {idx + 1}</div>
                <div className="matches">
                  {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="matchstick">🔥</div>
                  ))}
                </div>
                {!gameOver && !isAITurn && (
                  <button
                    className="pile-btn"
                    onClick={() => {
                      setSelectedPile(idx)
                      setSelectedCount(0)
                    }}
                  >
                    Select
                  </button>
                )}
              </div>
            ))}
          </div>

          {selectedPile !== null && !gameOver && !isAITurn && (
            <div className="matchstick-controls">
              <p>Remove from Pile {selectedPile + 1}:</p>
              <div className="controls-buttons">
                {[1, 2, 3].map(num => (
                  <button
                    key={num}
                    className={`control-btn ${selectedCount === num ? 'active' : ''}`}
                    onClick={() => setSelectedCount(num)}
                    disabled={num > piles[selectedPile]}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <button className="start-btn" onClick={handleRemove}>
                Remove
              </button>
            </div>
          )}

          {gameOver && (
            <button className="reset-btn" onClick={resetGame}>
              {winner === 'player' ? 'Play Again' : 'Retry'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Trivia Game Component (externalized and expandable up to 200)
import TRIVIA_SOURCE from '../data/triviaQuestions.json'

const MAX_TRIVIA_QUESTIONS = 200

const TRIVIA_QUESTIONS: Array<{ question: string; options: string[]; correct: number }> = (() => {
  const base = (TRIVIA_SOURCE as any[]).slice(0)
  if (base.length >= MAX_TRIVIA_QUESTIONS) return base.slice(0, MAX_TRIVIA_QUESTIONS)

  const generated = [...base]
  // Generate simple additional questions to reach the desired count
  let idx = 1
  while (generated.length < MAX_TRIVIA_QUESTIONS) {
    const n = generated.length + 1
    generated.push({
      question: `Question supplémentaire #${n}: Que donne ${n} + ${n}?`,
      options: [`${n + n - 1}`, `${n + n}`, `${n + n + 1}`, `${n + n + 2}`],
      correct: 1,
    })
    idx++
    if (idx > 1000) break
  }

  return generated
})()

export function TriviaGame({ onClose }: GameComponentProps) {
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [gameEnded, setGameEnded] = useState(false)

  const handleAnswer = (index: number) => {
    if (answered) return

    setSelectedAnswer(index)
    const question = TRIVIA_QUESTIONS[currentQuestion]
    if (index === question.correct) {
      setScore((prev) => prev + 1)
    }
    setAnswered(true)
  }

  const nextQuestion = () => {
    if (currentQuestion + 1 < TRIVIA_QUESTIONS.length) {
      setCurrentQuestion((prev) => prev + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      setGameEnded(true)
    }
  }

  const resetGame = () => {
    setScore(0)
    setCurrentQuestion(0)
    setAnswered(false)
    setSelectedAnswer(null)
    setGameEnded(false)
  }

  if (gameEnded) {
    return (
      <div className="game-modal" onClick={onClose}>
        <div className="game-container" onClick={(e) => e.stopPropagation()}>
          <div className="game-header">
            <h2>🎯 Trivia Quiz</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          <div className="game-score">
            Score final: {score}/{TRIVIA_QUESTIONS.length}
          </div>
          <button className="start-btn" onClick={resetGame}>
            Rejouer
          </button>
        </div>
      </div>
    )
  }

  const question = TRIVIA_QUESTIONS[currentQuestion]
  const isCorrect = selectedAnswer === question.correct

  return (
    <div className="game-modal" onClick={onClose}>
      <div className="game-container" onClick={(e) => e.stopPropagation()}>
        <div className="game-header">
          <h2>🎯 Trivia Quiz</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="game-score">
          Score: {score}/{TRIVIA_QUESTIONS.length}
        </div>
        <div className="trivia-question">
          <h3>{question.question}</h3>
          <div className="options">
            {question.options.map((option, i) => (
              <button
                key={i}
                className="option-btn"
                onClick={() => handleAnswer(i)}
                disabled={answered}
                style={{
                  backgroundColor:
                    answered && i === question.correct
                      ? '#22c55e'
                      : answered && i === selectedAnswer && !isCorrect
                      ? '#ef4444'
                      : 'white',
                  color:
                    answered && (i === question.correct || (i === selectedAnswer && !isCorrect))
                      ? 'white'
                      : 'var(--ms-foreground)',
                  borderColor:
                    answered && i === question.correct
                      ? '#22c55e'
                      : answered && i === selectedAnswer && !isCorrect
                      ? '#ef4444'
                      : 'rgba(0, 212, 255, 0.2)',
                  cursor: answered ? 'default' : 'pointer',
                }}
              >
                {option}
              </button>
            ))}
          </div>
          {answered && (
            <button className="start-btn" onClick={nextQuestion} style={{ marginTop: '1.5rem' }}>
              {currentQuestion + 1 === TRIVIA_QUESTIONS.length ? 'Finir' : 'Question suivante'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

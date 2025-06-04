import { useState } from 'react'
import { StartScreen } from './screens/StartScreen.tsx'
import { GameScreen } from './screens/GameScreen.tsx'
import { ResultScreen } from './screens/ResultScreen.tsx'
import { LeaderboardScreen } from './screens/LeaderboardScreen.tsx'

type GameState = 'start' | 'game' | 'result' | 'leaderboard'

export const EventPage = () => {
  const [gameState, setGameState] = useState<GameState>('start')
  const [tapCount, setTapCount] = useState(0)

  const handleGameStart = () => {
    setGameState('game')
  }

  const handleGameEnd = (count: number) => {
    setTapCount(count)
    setGameState('result')
  }

  const handleShowLeaderboard = () => {
    setGameState('leaderboard')
  }

  const handleBackToStart = () => {
    setGameState('start')
    setTapCount(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200">
      {gameState === 'start' && <StartScreen onStart={handleGameStart} />}
      {gameState === 'game' && <GameScreen onGameEnd={handleGameEnd} />}
      {gameState === 'result' && (
        <ResultScreen 
          tapCount={tapCount} 
          onShowLeaderboard={handleShowLeaderboard}
          onBackToStart={handleBackToStart}
        />
      )}
      {gameState === 'leaderboard' && (
        <LeaderboardScreen onBackToStart={handleBackToStart} />
      )}
    </div>
  )
}
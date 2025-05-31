import { useState, useEffect, useCallback, useRef } from 'react'

interface GameScreenProps {
  onGameEnd: (count: number) => void
}

export const GameScreen = ({ onGameEnd }: GameScreenProps) => {
  const [tapCount, setTapCount] = useState(0)
  const tapCountRef = useRef(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isGameStarted) return

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current)
          }
          onGameEnd(tapCountRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isGameStarted, onGameEnd])

  const handleTap = useCallback(() => {
    if (!isGameStarted) {
      setIsGameStarted(true)
    }
    
    if (timeLeft > 0) {
      setTapCount((prev) => {
        const newCount = prev + 1
        tapCountRef.current = newCount
        return newCount
      })
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 200)
    }
  }, [timeLeft, isGameStarted])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-8">
        <p className="text-2xl font-bold text-pink-600 mb-4">
          {!isGameStarted 
            ? "시작하려면 캐릭터를 클릭하세요!"
            : "지금부터 축하하는만큼 많이 때려주세요!"}
        </p>
        <p className="text-4xl font-bold text-gray-800">
          {timeLeft}초
        </p>
      </div>

      <div className="relative w-64 h-64 mb-8">
        <div
          className={`absolute inset-0 flex items-center justify-center cursor-pointer
                     ${isAnimating ? 'scale-90' : 'scale-100'} transition-transform`}
          onClick={handleTap}
        >
          <div className="w-48 h-48 bg-pink-300 rounded-full flex items-center justify-center">
            <span className="text-6xl">🤕</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-3xl font-bold text-pink-600">
          {tapCount}회
        </p>
        <p className="text-lg text-gray-600">타격 횟수</p>
      </div>
    </div>
  )
} 
import { useState } from 'react'

interface ResultScreenProps {
  tapCount: number
  onShowLeaderboard: () => void
  onBackToStart: () => void
}

export const ResultScreen = ({ tapCount, onShowLeaderboard, onBackToStart }: ResultScreenProps) => {
  const [name, setName] = useState('')

  const handleShare = async () => {
    try {
      await navigator.share({
        title: '생일빵 게임 결과',
        text: `제가 생일빵 게임에서 ${tapCount}회를 기록했어요! 도전해보세요!`,
        url: window.location.href,
      })
    } catch (error: unknown) {
      console.log('공유하기 실패:', error)
      // 공유하기가 지원되지 않는 경우 클립보드에 복사
      navigator.clipboard.writeText(window.location.href)
      alert('링크가 클립보드에 복사되었습니다!')
    }
  }

  const handleSubmit = () => {
    if (name.trim()) {
      // TODO: 랭킹 저장 로직 구현
      onShowLeaderboard()
    } else {
      alert('이름을 입력해주세요!')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-3xl font-bold text-pink-600 mb-8">게임 결과</h2>
      
      <div className="text-center mb-12">
        <p className="text-5xl font-bold text-gray-800 mb-4">{tapCount}회</p>
        <p className="text-xl text-gray-600">축하합니다!</p>
      </div>

      <div className="w-full max-w-md mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg focus:outline-none focus:border-pink-500"
        />
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 bg-pink-500 text-white rounded-lg font-bold
                   hover:bg-pink-600 transition-colors"
        >
          랭킹 등록하기
        </button>
        
        <button
          onClick={handleShare}
          className="w-full px-6 py-3 bg-white text-pink-500 border-2 border-pink-500
                   rounded-lg font-bold hover:bg-pink-50 transition-colors"
        >
          공유하기
        </button>

        <button
          onClick={onBackToStart}
          className="w-full px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-bold
                   hover:bg-gray-200 transition-colors"
        >
          다시하기
        </button>
      </div>
    </div>
  )
} 
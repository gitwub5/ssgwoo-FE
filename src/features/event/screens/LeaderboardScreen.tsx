interface LeaderboardScreenProps {
  onBackToStart: () => void
}

// TODO: 실제 데이터로 교체
const mockLeaderboard = [
  { rank: 1, name: '홍길동', score: 150 },
  { rank: 2, name: '김철수', score: 120 },
  { rank: 3, name: '이영희', score: 100 },
  { rank: 4, name: '박지성', score: 90 },
  { rank: 5, name: '최민수', score: 80 },
]

export const LeaderboardScreen = ({ onBackToStart }: LeaderboardScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-3xl font-bold text-pink-600 mb-8">랭킹</h2>

      <div className="w-full max-w-md mb-8">
        {mockLeaderboard.map((entry) => (
          <div
            key={entry.rank}
            className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow"
          >
            <div className="flex items-center">
              <span className="text-xl font-bold text-pink-500 w-8">
                {entry.rank}
              </span>
              <span className="text-lg text-gray-800 ml-4">{entry.name}</span>
            </div>
            <span className="text-xl font-bold text-pink-500">
              {entry.score}회
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onBackToStart}
        className="px-6 py-3 bg-pink-500 text-white rounded-lg font-bold
                 hover:bg-pink-600 transition-colors"
      >
        다시하기
      </button>
    </div>
  )
} 
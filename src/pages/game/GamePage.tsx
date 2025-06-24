import { Link } from 'react-router-dom'

export function GamePage() {
  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        게임 선택
      </h1>
      
      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 숫자 게임 카드 */}
        <Link 
          to="/game/number" 
          className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              123
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              숫자 게임
            </h2>
          </div>
        </Link>

        {/* 생일빵 게임 카드 */}
        <Link 
          to="/game/birthday" 
          className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl">
              🎂
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
              생일빵 때리기
            </h2>
          </div>
        </Link>
      </div>
    </div>
  )
}
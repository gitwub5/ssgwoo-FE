interface StartScreenProps {
  onStart: () => void
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold text-pink-600 mb-8">생일빵 게임</h1>
      <div className="text-center mb-12">
        <p className="text-xl text-gray-700 mb-4">생일을 맞이한 친구에게</p>
        <p className="text-xl text-gray-700">축하의 마음을 전해보세요!</p>
      </div>
      <button
        onClick={onStart}
        className="px-8 py-4 bg-pink-500 text-white rounded-full text-xl font-bold
                 hover:bg-pink-600 transform hover:scale-105 transition-all
                 shadow-lg hover:shadow-xl"
      >
        🎂 축하하기
      </button>
    </div>
  )
} 
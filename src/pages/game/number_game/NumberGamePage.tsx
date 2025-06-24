import { NumberGuessGame } from './NumberGuessGame'
import { NumberBaseballGame } from './NumberBaseballGame'

export function NumberGamePage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        숫자 게임
      </h1>
      <div className="space-y-8">
        <NumberGuessGame />
        <NumberBaseballGame />
      </div>
    </div>
  )
} 
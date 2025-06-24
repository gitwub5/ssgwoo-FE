import React from 'react'
import type { RulesScreenProps } from '../../../../stores/birthday'
import { PixelSkyBackground } from './PixelSkyBackground'

export const RulesScreen: React.FC<RulesScreenProps> = ({ onStartGame, onBackToMain }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 p-8 relative overflow-hidden">
      <PixelSkyBackground />
      <div className="bg-white border-4 border-blue-400 rounded-none p-6 max-w-md mx-auto shadow-[4px_4px_0px_rgba(0,0,0,0.2)] relative z-10">
        <h2 className="text-3xl font-bold text-center mb-4 pixel-font tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">게임 규칙</h2>
        <div className="space-y-3 text-lg">
          <div className="border-b-2 border-blue-200 pb-2">
            <h3 className="font-bold text-lg">공격 방법:</h3>
            <p>✊ 머리 클릭 → <span className="font-bold text-pink-600">죽빵</span> <span className="text-sm">(100점)</span></p>
            <p>✋ 몸통 클릭 → <span className="font-bold text-blue-600">등짝스매슁</span> <span className="text-sm">(120점)</span></p>
            <p>🦶 다리 클릭 → <span className="font-bold text-green-600">싸커킥</span> <span className="text-sm">(150점)</span></p>
          </div>
          <div className="border-b-2 border-blue-200 pb-2">
            <h4 className="font-bold text-lg">방어 시스템:</h4>
            <p className="text-base">캐릭터가 랜덤하게 부위를 막습니다</p>
            <p className="text-base">막고 있는 부위 공격 시 <span className="font-bold text-red-500">MISS!</span></p>
          </div>
          <div>
            <h3 className="font-bold text-lg">목표:</h3>
            <p className="text-base">15초 동안 최대한 많은 점수를 획득하세요!</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <button
            onClick={onStartGame}
            className="bg-green-400 hover:bg-green-500 text-white font-bold py-2.5 px-6 border-4 border-green-700 rounded-none text-lg transition-all shadow-[3px_3px_0px_rgba(0,0,0,0.2)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[1px_1px_0px_rgba(0,0,0,0.2)]"
          >
            게임 시작!
          </button>
          <button
            onClick={onBackToMain}
            className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-bold py-2 px-6 border-4 border-yellow-500 rounded-none text-lg transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[1px_1px_0px_rgba(0,0,0,0.15)]"
          >
            ← 뒤로가기
          </button>
        </div>
      </div>
    </div>
  )
} 
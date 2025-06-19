import React from 'react'
import type { MainScreenProps } from '../../../stores/event'
import { PixelSkyBackground } from './PixelSkyBackground'

export const MainScreen: React.FC<MainScreenProps> = ({ onStart, onShowScoreboard }) => {
  const renderCharacter = () => (
    <img
      src="/assets/main.png"
      alt="픽셀 캐릭터"
      className="w-64 h-64 mx-auto drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]"
      draggable={false}
    />
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-8 relative overflow-hidden">
      <PixelSkyBackground />
      <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10">
        <div className="flex flex-col items-center w-full max-w-xl">
          <h1 className="text-4xl font-bold text-white mb-6 mt-0 text-center pixel-font tracking-wider drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)] animate-pulse">
            생일빵 때리기
          </h1>
          <div className="mb-4">
            {renderCharacter()}
          </div>
          <div className="space-y-3 w-full flex flex-col items-center mb-20">
            <button
              onClick={onStart}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 border-4 border-red-700 rounded-none text-2xl transition-all transform hover:scale-105 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
            >
              START
            </button>
            <button
              onClick={onShowScoreboard}
              className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-bold py-3 px-8 border-4 border-yellow-500 rounded-none text-xl transition-all shadow-[3px_3px_0px_rgba(0,0,0,0.2)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[1px_1px_0px_rgba(0,0,0,0.2)]"
            >
              🏆 랭킹보드
            </button>
          </div>
        </div>
      </div>
      {/* 땅과 풀 */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-20 flex flex-col">
        {/* 땅 (픽셀 스타일) */}
        <div className="w-full h-20 bg-[#7bc043] border-t-4 border-[#388e3c] relative flex items-end">
          {/* 풀 */}
          <div className="absolute left-8 bottom-2 w-6 h-4 bg-[#388e3c] rounded-[2px]" style={{boxShadow: '2px 0 #7bc043'}}></div>
          <div className="absolute left-32 bottom-4 w-8 h-5 bg-[#388e3c] rounded-[2px]" style={{boxShadow: '2px 0 #7bc043'}}></div>
          <div className="absolute left-1/2 bottom-3 w-10 h-6 bg-[#388e3c] rounded-[2px]" style={{boxShadow: '2px 0 #7bc043'}}></div>
          <div className="absolute right-24 bottom-2 w-7 h-4 bg-[#388e3c] rounded-[2px]" style={{boxShadow: '2px 0 #7bc043'}}></div>
          <div className="absolute right-8 bottom-5 w-6 h-4 bg-[#388e3c] rounded-[2px]" style={{boxShadow: '2px 0 #7bc043'}}></div>
        </div>
        {/* 땅 아래 픽셀 경계 */}
        <div className="w-full h-12 bg-[#a67c52] flex">
          <div className="h-full w-8 bg-[#8d5c2b] inline-block"></div>
          <div className="h-full w-12 bg-[#a67c52] inline-block"></div>
          <div className="h-full w-10 bg-[#8d5c2b] inline-block"></div>
          <div className="h-full w-16 bg-[#a67c52] inline-block"></div>
          <div className="h-full w-8 bg-[#8d5c2b] inline-block"></div>
          <div className="h-full w-20 bg-[#a67c52] inline-block"></div>
          <div className="h-full w-12 bg-[#8d5c2b] inline-block"></div>
          <div className="h-full w-10 bg-[#a67c52] inline-block"></div>
          <div className="h-full w-8 bg-[#8d5c2b] inline-block"></div>
        </div>
      </div>
    </div>
  )
}
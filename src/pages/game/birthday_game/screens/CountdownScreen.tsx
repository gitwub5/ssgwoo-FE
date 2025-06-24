import React from 'react'
import type { CountdownScreenProps } from '../../../../stores/birthday'
import { PixelSkyBackground } from './PixelSkyBackground'

export const CountdownScreen: React.FC<CountdownScreenProps> = ({ countdown }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <PixelSkyBackground />
      {/* 카운트다운 숫자 */}
      <div className="text-[8rem] font-extrabold text-white pixel-font drop-shadow-[6px_6px_0px_rgba(0,0,0,0.4)] tracking-widest animate-pulse z-10">
        {countdown}
      </div>
      <p className="text-3xl text-white mt-4 pixel-font drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)] z-10">준비하세요!</p>
    </div>
  )
}

export const GameEndScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <PixelSkyBackground />
      <div className="text-5xl font-extrabold text-white pixel-font drop-shadow-[6px_6px_0px_rgba(0,0,0,0.4)] tracking-widest animate-pulse z-10 mb-4">
        게임 종료!
      </div>
    </div>
  )
} 
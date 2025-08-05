import React from 'react'
import type { GameScreenProps } from '../../../../stores/birthday'
import { InteractiveCharacter } from './InteractiveCharacter'
import { PixelSkyBackground } from './PixelSkyBackground'

export const GameScreen: React.FC<GameScreenProps> = ({ timeLeft, score, character, lastResult, onAttack }) => {
  return (
    <div className="min-h-screen flex flex-col p-4 relative overflow-hidden">
      <PixelSkyBackground />
      
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="bg-white border-4 border-blue-400 rounded-none px-4 py-2 shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">
          <div className="text-xl font-bold text-blue-600 pixel-font">⏰ {timeLeft}초</div>
        </div>
        <div className="bg-white border-4 border-green-400 rounded-none px-4 py-2 shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">
          <div className="text-xl font-bold text-green-600 pixel-font">🎯 {score}점</div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="flex flex-col items-center gap-2 -mt-2">
          {/* 야구장 전광판 스타일 */}
          <div className="bg-black border-4 border-lime-400 rounded-lg px-8 py-4 shadow-[0_4px_24px_rgba(0,255,0,0.15)] inline-block min-w-[260px] min-h-[80px] flex flex-col items-center justify-center gap-2">
            {/* 방어중 알림 (위) */}
            <div className="font-bold text-center pixel-font min-h-[24px] text-base drop-shadow-[0_0_6px_rgba(0,255,0,0.5)]"
              style={{ color: character.defending ? '#7fff00' : '#00e0ff', letterSpacing: '1px' }}>
              {character.defending === 'head' && '🛡️ 머리 방어중!'}
              {character.defending === 'body' && '🛡️ 몸통 방어중!'}
              {character.defending === 'butt' && '🛡️ 하체 방어중!'}
              {!character.defending && ''}
            </div>
            {/* 점수 알림 (아래) */}
            <div className="text-2xl font-bold pixel-font min-h-[32px] drop-shadow-[0_0_6px_rgba(255,255,0,0.7)]"
              style={{ color: lastResult ? (lastResult.type === 'HIT' ? '#ffe066' : '#ff4d4f') : '#00e0ff', letterSpacing: '2px' }}>
              {lastResult
                ? (lastResult.type === 'HIT' ? `HIT! +${lastResult.points}` : `MISS! ${lastResult.points}`)
                : ''}
            </div>
          </div>
          <div className="mt-0 mb-0">
            <InteractiveCharacter character={character} onAttack={onAttack} />
          </div>
        </div>
      </div>
    </div>
  )
} 
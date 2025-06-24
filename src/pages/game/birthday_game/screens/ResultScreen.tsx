import React from 'react'
import type { ResultScreenProps } from '../../../../stores/birthday'
import { PixelSkyBackground } from './PixelSkyBackground'

export interface ResultScreenPropsWithMain extends Omit<ResultScreenProps, 'onRestart'> {
  onGoToMain: () => void
  isNicknameValid: boolean
  nicknameError: string
  isLoading?: boolean
  error?: string | null
}

export const ResultScreen: React.FC<ResultScreenPropsWithMain> = ({ 
  score, 
  nickname, 
  onNicknameChange, 
  onSubmitScore, 
  onGoToMain, 
  isNicknameValid, 
  nicknameError,
  isLoading = false,
  error
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pb-20 relative overflow-hidden">
      <PixelSkyBackground />
      
      <div className="bg-white border-4 border-orange-400 rounded-none p-8 max-w-md mx-auto shadow-[4px_4px_0px_rgba(0,0,0,0.2)] relative z-10">
        <h2 className="text-3xl font-bold text-center mb-4 pixel-font tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">게임 끝!</h2>
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-blue-600 mb-2 pixel-font drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">{score}점</div>
          <p className="text-lg text-gray-600 pixel-font">최종 점수</p>
        </div>
        
        <div className="mb-6">
          <label className="block text-lg font-bold mb-2 pixel-font">닉네임:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            className="w-full p-3 border-4 border-gray-400 rounded-none text-lg pixel-font shadow-[2px_2px_0px_rgba(0,0,0,0.1)] focus:outline-none focus:border-blue-500"
            placeholder="닉네임을 입력하세요"
            maxLength={10}
            disabled={isLoading}
          />
          {nicknameError && (
            <div className="text-red-500 text-sm mt-2 pixel-font">{nicknameError}</div>
          )}
          {error && (
            <div className="text-red-500 text-sm mt-2 pixel-font">{error}</div>
          )}
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onSubmitScore}
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-6 border-4 border-blue-700 rounded-none text-xl transition-all shadow-[3px_3px_0px_rgba(0,0,0,0.2)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[1px_1px_0px_rgba(0,0,0,0.2)] disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed"
            disabled={!isNicknameValid || isLoading}
          >
            {isLoading ? '등록 중...' : '등록하기'}
          </button>
          <button
            onClick={onGoToMain}
            className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-bold py-2 px-6 border-4 border-yellow-500 rounded-none text-lg transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[1px_1px_0px_rgba(0,0,0,0.15)]"
            disabled={isLoading}
          >
            메인으로
          </button>
        </div>
      </div>
    </div>
  )
} 
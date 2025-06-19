import React from 'react'
import type { ScoreboardScreenProps } from '../../../stores/event'
import { PixelSkyBackground } from './PixelSkyBackground'

interface ScoreboardScreenWithPagingProps extends ScoreboardScreenProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const ScoreboardScreen: React.FC<ScoreboardScreenWithPagingProps> = ({ scores, onGoToMain, isLoading = false, totalPages, currentPage, onPageChange }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 relative overflow-hidden">
      <PixelSkyBackground />
      
      <div className="bg-white border-4 border-purple-400 rounded-none p-6 w-full max-w-5xl mx-auto shadow-[4px_4px_0px_rgba(0,0,0,0.2)] relative z-10">
        <h2 className="text-2xl font-bold text-center mb-4 pixel-font tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">🏆 스코어보드</h2>
        
        <div className="mb-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-lg text-gray-600 pixel-font">순위 데이터를 불러오는 중...</div>
            </div>
          ) : scores.length === 0 ? (
            <p className="text-center text-gray-500 text-base pixel-font">아직 기록이 없습니다!</p>
          ) : (
            <div className="space-y-2">
              {scores.map((s, index) => (
                <div key={index} className="flex justify-between items-center border-b-2 border-purple-200 pb-2 px-3">
                  <div className="flex items-center flex-1">
                    <span className="font-bold text-base mr-4 pixel-font min-w-[2.5rem]">#{index + 1}</span>
                    <span className="text-base pixel-font flex-1">{s.nickname}</span>
                  </div>
                  <span className="font-bold text-lg text-blue-600 pixel-font drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)] min-w-[5rem] text-right">{s.score}점</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 페이지네이션 버튼 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 border-2 rounded-none pixel-font font-bold ${page === currentPage ? 'bg-purple-400 text-white border-purple-600' : 'bg-gray-100 border-purple-200 text-purple-700'} transition-all`}
                disabled={isLoading || page === currentPage}
              >
                {page}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <button
            onClick={onGoToMain}
            className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-bold py-2 px-4 border-4 border-yellow-500 rounded-none text-lg transition-all shadow-[3px_3px_0px_rgba(0,0,0,0.2)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[1px_1px_0px_rgba(0,0,0,0.2)]"
            disabled={isLoading}
          >
            ← 메인으로
          </button>
        </div>
      </div>
    </div>
  )
} 
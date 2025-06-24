import React from 'react'

export const PixelSkyBackground: React.FC = () => (
  <>
    {/* 하늘 배경 */}
    <div
      className="absolute inset-0 -z-10"
      style={{
        background: 'linear-gradient(to bottom, #6fd3ff 0%, #b3e5fc 100%)',
      }}
    />
    {/* 해 */}
    <div className="absolute top-8 right-8 w-20 h-20 bg-yellow-300 rounded-full shadow-[0_0_20px_rgba(255,255,0,0.6)] animate-pulse z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full"></div>
    </div>
    {/* 구름들 - 픽셀 구름 스타일 */}
    <div className="absolute top-16 left-8 w-40 h-20 bg-white rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}>
      <div className="absolute -top-2 left-8 w-16 h-16 bg-white rounded-full"></div>
      <div className="absolute -top-4 left-16 w-12 h-12 bg-white rounded-full"></div>
      <div className="absolute top-2 left-24 w-14 h-14 bg-white rounded-full"></div>
    </div>
    <div className="absolute top-12 left-60 w-36 h-18 bg-white rounded-full shadow-lg animate-bounce" style={{ animationDelay: '2s', animationDuration: '4.5s' }}>
      <div className="absolute -top-3 left-8 w-16 h-16 bg-white rounded-full"></div>
      <div className="absolute -top-1 left-20 w-12 h-12 bg-white rounded-full"></div>
      <div className="absolute top-2 left-28 w-10 h-10 bg-white rounded-full"></div>
    </div>
    <div className="absolute top-28 right-20 w-24 h-12 bg-white rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4s' }}>
      <div className="absolute -top-2 left-4 w-10 h-10 bg-white rounded-full"></div>
      <div className="absolute -top-1 left-12 w-8 h-8 bg-white rounded-full"></div>
      <div className="absolute top-1 left-18 w-6 h-6 bg-white rounded-full"></div>
    </div>
  </>
) 
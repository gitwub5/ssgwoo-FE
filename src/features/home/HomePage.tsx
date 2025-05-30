import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

export function HomePage() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // 마우스/터치 움직임 추적
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      
      setMousePosition({
        x: (clientX / window.innerWidth - 0.5) * 20,
        y: (clientY / window.innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
    }
  }, [])

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-transparent to-pink-200/30 dark:from-blue-800/30 dark:to-pink-800/30"></div>
      </div>

      {/* 인터랙티브 배경 */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 dark:bg-blue-900/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-200/30 dark:pink-900/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16">
        <h1 
          className={`text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 drop-shadow-lg tracking-tight transition-transform duration-300 hover:scale-105 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {t('welcomeTo')}{' '}
          <span 
            className={`inline-block transition-all duration-300 ${isHovered ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-blue-600 dark:text-blue-400'}`}
          >
            sSGWoo
          </span>
        </h1>
        <p className={`text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-8 font-medium max-w-2xl ${isVisible ? 'animate-fade-in [animation-delay:200ms]' : 'opacity-0'}`}>
          {t('platform')}<br />
          {t('platformDesc')}
        </p>
        <div className={`flex gap-4 ${isVisible ? 'animate-fade-in [animation-delay:400ms]' : 'opacity-0'}`}>
          <Link 
            to="/about" 
            className="group relative px-8 py-3 rounded-full bg-white dark:bg-gray-800 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-bold text-lg shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <span className="relative z-10">{t('aboutMeBtn')}</span>
            <div className="absolute inset-0 rounded-full bg-blue-600 dark:bg-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </div>
  )
} 
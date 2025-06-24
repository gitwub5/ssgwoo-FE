import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitchBtn'
// import { LightmodeSwitchBtn } from './LightmodeSwitchBtn'

interface AppbarItem {
  to: string
  label: string
}

const appbarItems: AppbarItem[] = [
  { to: '/about', label: 'About' },
  { to: '/game', label: 'Game' },
  { to: '/ai', label: 'Ai Chat' },
  { to: '/community', label: 'Community' },
]

export function Appbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight hover:scale-105 transition-transform">
          <span className="bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent drop-shadow">sSGWoo</span>
        </Link>
        {/* 데스크탑 메뉴 */}
        <div className="hidden sm:flex items-center gap-2 md:gap-4">
          {appbarItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative px-4 py-1 font-medium rounded transition text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50
                ${location.pathname.startsWith(item.to) ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-100 dark:bg-blue-900/30' : ''}`}
            >
              {item.label}
              <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full" />
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-1">
            <LanguageSwitcher />
            {/* <LightmodeSwitchBtn /> */}
          </div>
        </div>
        {/* 모바일 햄버거 버튼 */}
        <div className="sm:hidden flex items-center gap-2">
          <LanguageSwitcher />
          {/* <LightmodeSwitchBtn /> */}
          <button
            className="flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-blue-50 dark:hover:bg-blue-900/50 transition relative z-20"
            onClick={() => setOpen((v) => !v)}
            aria-label="메뉴 열기"
          >
            <span className={`block w-6 h-0.5 bg-blue-700 dark:bg-blue-400 mb-1 transition-transform ${open ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-blue-700 dark:bg-blue-400 mb-1 transition-opacity ${open ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-blue-700 dark:bg-blue-400 transition-transform ${open ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
        {/* 모바일 드롭다운 메뉴 */}
        {open && (
          <div className="sm:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md animate-fadeIn z-10">
            <div className="flex flex-col py-2">
              {appbarItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-6 py-3 font-medium text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition
                    ${location.pathname.startsWith(item.to) ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-100 dark:bg-blue-900/30' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

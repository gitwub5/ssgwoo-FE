import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import './i18n'

// 앱 초기화 함수
const initializeApp = async () => {
  try {

    // 앱 렌더링
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  } catch (error) {
    console.error('앱 초기화 중 오류 발생:', error)
  }
}

// 앱 시작
initializeApp()

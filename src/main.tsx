import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import './i18n'
import config from './config'

// 앱 초기화 함수
const initializeApp = async () => {
  try {
    // 여기에 앱 시작 시 필요한 초기화 로직을 추가할 수 있습니다
    console.log(`Starting ${config.app.name} v${config.app.version}`)
    console.log(`API URL: ${config.api.baseUrl}`)

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

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Appbar } from '../shared/components/Appbar'
import { HomePage } from '../features/home/HomePage'
import { AboutPage } from '../features/about/AboutPage'
import { CommunityPage } from '../features/community/CommunityPage'
import { CommunityDetail } from '../features/community/detail-page/CommunityDetail'
import { CommunityWrite } from '../features/community/CommunityWrite'
import { CommunityRulesPage } from '../features/community/CommunityRulesPage'
import { GamePage } from '../features/game/GamePage'
import { AiChatPage } from '../features/ai_chat/AiChatPage'
import { EventPage } from '../features/event/EventPage'
import { AdminPage } from '../features/admin/AdminPage'
import '../index.css'



function App() {

  return (
    <BrowserRouter>
      <Appbar />
      <div className="min-w-[360px] max-w-2xl mx-auto p-4 pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/write" element={<CommunityWrite />} />
          <Route path="/community/rules" element={<CommunityRulesPage />} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/ai" element={<AiChatPage />} />
          <Route path="/event" element={<EventPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

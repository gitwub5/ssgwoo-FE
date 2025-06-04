import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Appbar } from '../shared/components/Appbar'
import { HomePage } from '../pages/home/HomePage'
import { AboutPage } from '../pages/about/AboutPage'
import { CommunityPage } from '../pages/community/CommunityPage'
import { CommunityDetail } from '../pages/community/detail-page/CommunityDetail'
import { CommunityWrite } from '../pages/community/CommunityWrite'
import { CommunityRulesPage } from '../pages/community/CommunityRulesPage'
import { GamePage } from '../pages/game/GamePage'
import { AiChatPage } from '../pages/ai_chat/AiChatPage'
import { EventPage } from '../pages/event/EventPage'
import { AdminPage } from '../pages/admin/AdminPage'
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

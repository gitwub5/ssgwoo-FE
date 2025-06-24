import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Appbar } from '../shared/components/Appbar'
import { HomePage } from '../pages/home/HomePage'
import { AboutPage } from '../pages/about/AboutPage'
import { CommunityPage } from '../pages/community/CommunityPage'
import { CommunityDetail } from '../pages/community/detail-page/CommunityDetail'
import { CommunityWrite } from '../pages/community/CommunityWrite'
import { CommunityRulesPage } from '../pages/community/CommunityRulesPage'
import { GamePage } from '../pages/game/GamePage'
import { NumberGamePage } from '../pages/game/number_game/NumberGamePage'
import { AiChatPage } from '../pages/ai_chat/AiChatPage'
import { BirthdayGamePage } from '../pages/game/birthday_game/BirthdayGamePage'
import { AdminPage } from '../pages/admin/AdminPage'
import '../index.css'



function App() {

  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/game/birthday" element={
          <div className="min-w-[360px] max-w-2xl mx-auto pt-[60px]">
            <BirthdayGamePage />
          </div>
        } />
        <Route path="/" element={<div className="min-w-[360px] max-w-2xl mx-auto p-4 pt-20"><HomePage /></div>} />
        <Route path='/admin' element={<div className="min-w-[360px] max-w-2xl mx-auto p-4 pt-20"><AdminPage /></div>} />
        <Route path="/about" element={<div className="min-w-[360px] max-w-2xl mx-auto p-4 pt-20"><AboutPage /></div>} />
        <Route path="/community" element={<div className="min-w-[360px] max-w-2xl mx-auto p-4 pt-20"><CommunityPage /></div>} />
        <Route path="/community/write" element={<div className="min-w-[360px] max-w-2xl mx-auto p-4 pt-20"><CommunityWrite /></div>} />
        <Route path="/community/rules" element={<div className="min-w-[360px] max-w-2xl mx-auto p-4 pt-20"><CommunityRulesPage /></div>} />
        <Route path="/community/:id" element={<div className="min-w-[360px] max-w-2xl mx-auto p-4 pt-20"><CommunityDetail /></div>} />
        <Route path="/game" element={<div className="min-w-[360px] max-w-2xl mx-auto p-4 pt-20"><GamePage /></div>} />
        <Route path="/game/number" element={<div className="min-w-[360px] max-w-2xl mx-auto p-4 pt-20"><NumberGamePage /></div>} />
        <Route path="/ai" element={<div className="min-w-[360px] max-w-2xl mx-auto p-4 pt-20"><AiChatPage /></div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

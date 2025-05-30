import { useState, useRef, useEffect } from 'react'
import { useChat } from '../../stores/chat'

export function AiChatPage() {
  const { messages, addMessage } = useChat()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    addMessage({ sender: 'user', text: input })
    addMessage({ sender: 'ai', text: '현재는 사용할 수 없는 기능입니다.' })
    setInput('')
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-[80vh] max-w-xl mx-auto bg-gray-100 rounded-2xl shadow p-0 mt-4 border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-white rounded-t-2xl">
        <h1 className="text-xl font-bold text-gray-800 text-center">AI Chat</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-100">
        {messages.length === 0 && (
          <div className="text-gray-400 text-center mt-10">메시지를 입력해보세요!</div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="relative max-w-[70%]">
              <div
                className={`px-4 py-2 rounded-2xl text-sm shadow-md break-words ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-br-md'
                    : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                }`}
                style={{ wordBreak: 'break-word' }}
              >
                {msg.text}
              </div>
              {/* 꼬리 */}
              {msg.sender === 'user' ? (
                <span className="absolute right-[-10px] bottom-0 w-0 h-0 border-t-8 border-t-blue-600 border-l-8 border-l-transparent" />
              ) : (
                <span className="absolute left-[-10px] bottom-0 w-0 h-0 border-t-8 border-t-white border-r-8 border-r-transparent" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 bg-white rounded-b-2xl border-t border-gray-200">
        <input
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button className="bg-gradient-to-br from-blue-400 to-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-blue-500 hover:to-blue-700 transition" type="submit">
          전송
        </button>
      </form>
    </div>
  )
}
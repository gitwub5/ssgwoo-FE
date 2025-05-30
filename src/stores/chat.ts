import { create } from 'zustand'

interface ChatMessage {
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}

interface ChatStore {
  messages: ChatMessage[]
  addMessage: (message: Omit<ChatMessage, 'timestamp'>) => void
  clearMessages: () => void
}

export const useChat = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, { ...message, timestamp: new Date().toISOString() }]
  })),
  clearMessages: () => set({ messages: [] })
})) 
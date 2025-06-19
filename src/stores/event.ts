import { create } from 'zustand'
import { eventApi } from '../services/eventApi'

// 게임 로직 타입들
export type AttackType = 'punch' | 'smash' | 'kick'
export type BodyPart = 'head' | 'body' | 'butt'

export interface Character {
  defending: BodyPart | null
  hit: BodyPart | null
}

export interface AttackResult {
  type: 'HIT' | 'MISS'
  points?: number
  attack?: string
}

export interface Score {
  nickname: string
  score: number
  date: Date
}

// 컴포넌트 Props 타입들
export interface MainScreenProps {
  onStart: () => void
  onShowScoreboard: () => void
}

export interface RulesScreenProps {
  onStartGame: () => void
  onBackToMain: () => void
}

export interface CountdownScreenProps {
  countdown: number
}

export interface InteractiveCharacterProps {
  character: Character
  onAttack: (attackType: AttackType) => void
}

export interface GameScreenProps {
  timeLeft: number
  score: number
  character: Character
  lastResult: AttackResult | null
  onAttack: (attackType: AttackType) => void
}

export interface ResultScreenProps {
  score: number
  nickname: string
  onNicknameChange: (nickname: string) => void
  onSubmitScore: () => void
  onRestart: () => void
  isLoading?: boolean
  error?: string | null
  phoneNumber: string
  onPhoneNumberChange: (phone: string) => void
  phoneError?: string | null
}

export interface ScoreboardScreenProps {
  scores: Score[]
  onGoToMain: () => void
  isLoading?: boolean
}

// 상태 관리 타입들
export interface GameState {
  currentState: 'start' | 'rules' | 'countdown' | 'game' | 'gameend' | 'result' | 'leaderboard'
  score: number
  timeLeft: number
  countdown: number
  nickname: string
  scores: Score[]
  phoneNumber: string
  isLoading: boolean
  totalPages: number
  currentPage: number
  error: string | null
}

interface EventStore extends GameState {
  // API 액션들
  fetchScores: (pageId: number) => Promise<void>
  submitScore: (nickname: string, score: number) => Promise<void>
  
  // 게임 상태 관리 액션들
  setCurrentState: (state: GameState['currentState']) => void
  setScore: (score: number) => void
  setTimeLeft: (time: number | ((prev: number) => number)) => void
  setCountdown: (count: number | ((prev: number) => number)) => void
  setNickname: (nickname: string) => void
  resetGame: () => void
  setPhoneNumber: (phone: string) => void
}

export const useEventStore = create<EventStore>((set, get) => ({
  // 초기 상태
  currentState: 'start',
  score: 0,
  timeLeft: 15,
  countdown: 3,
  nickname: '',
  scores: [],
  isLoading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  phoneNumber: '',

  // API 액션들
  fetchScores: async (pageId: number) => {
    set({ isLoading: true, error: null })
    try {
      const response = await eventApi.getScores(pageId)
      set({ scores: response.scores, isLoading: false, totalPages: response.totalPages, currentPage: pageId })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '순위 데이터를 불러오는데 실패했습니다.'
      set({ error: errorMessage, isLoading: false })
    }
  },

  submitScore: async (nickname: string, score: number) => {
    set({ isLoading: true, error: null })
    try {
      const { phoneNumber } = get()
      await eventApi.submitScore({ nickname, score, date: new Date(), phoneNumber })
      await (async () => { await useEventStore.getState().fetchScores(1) })()
      set({ isLoading: false })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '점수 등록에 실패했습니다.'
      set({ error: errorMessage, isLoading: false })
      throw err
    }
  },

  // 게임 상태 관리 액션들
  setCurrentState: (state) => set({ currentState: state }),
  setScore: (score) => set({ score }),
  setTimeLeft: (time: number | ((prev: number) => number)) => set((state) => ({ 
    timeLeft: typeof time === 'function' ? time(state.timeLeft) : time 
  })),
  setCountdown: (count: number | ((prev: number) => number)) => set((state) => ({ 
    countdown: typeof count === 'function' ? count(state.countdown) : count 
  })),
  setNickname: (nickname) => set({ nickname }),
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  
  resetGame: () => set({
    score: 0,
    timeLeft: 15,
    countdown: 3,
    nickname: '',
    error: null
  })
}))

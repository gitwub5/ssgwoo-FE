import { create } from 'zustand'
import { birthdayApi, type GameSession } from '../services/birthdayApi'

// 게임 설정 상수
const GAME_CONFIG = {
  GAME_DURATION: 15, // 게임 시간 (초)
  GAME_DURATION_MS: 15000, // 게임 시간 (밀리초)
  COUNTDOWN_DURATION: 3, // 카운트다운 시간 (초)
  MAX_GAME_TIME_MS: 16000, // 최대 허용 게임 시간 (여유분 포함)
} as const

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
  isLoading: boolean
  totalPages: number
  currentPage: number
  error: string | null
  // 게임 세션 추적
  gameStartTime: number | null
  totalAttacks: number
  successfulHits: number
}

interface BirthdayStore extends GameState {
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
  
  // 게임 세션 관리
  startGameSession: () => void
  recordAttack: (isHit: boolean) => void
  getGameSession: () => GameSession | null
}

export const useBirthdayStore = create<BirthdayStore>((set, get) => ({
  // 초기 상태
  currentState: 'start',
  score: 0,
  timeLeft: GAME_CONFIG.GAME_DURATION,
  countdown: GAME_CONFIG.COUNTDOWN_DURATION,
  nickname: '',
  scores: [],
  isLoading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  // 게임 세션 추적
  gameStartTime: null,
  totalAttacks: 0,
  successfulHits: 0,

  // API 액션들
  fetchScores: async (pageId: number) => {
    set({ isLoading: true, error: null })
    try {
      const response = await birthdayApi.getScores(pageId)
      set({ scores: response.scores, isLoading: false, totalPages: response.totalPages, currentPage: pageId })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '순위 데이터를 불러오는데 실패했습니다.'
      set({ error: errorMessage, isLoading: false })
    }
  },

  submitScore: async (nickname: string, score: number) => {
    set({ isLoading: true, error: null })
    try {
      const gameSession = get().getGameSession()
      if (!gameSession) {
        throw new Error('게임 세션 정보가 없습니다.')
      }
      
      // 시간 초과된 게임은 점수를 0으로 처리
      const finalScore = gameSession.invalidated ? 0 : score
      
      await birthdayApi.submitScore({ 
        nickname, 
        score: finalScore, 
        date: new Date()
      })
      await (async () => { await useBirthdayStore.getState().fetchScores(1) })()
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
  
  resetGame: () => set({
    score: 0,
    timeLeft: GAME_CONFIG.GAME_DURATION,
    countdown: GAME_CONFIG.COUNTDOWN_DURATION,
    nickname: '',
    error: null,
    gameStartTime: null,
    totalAttacks: 0,
    successfulHits: 0
  }),

  // 게임 세션 관리
  startGameSession: () => set({ 
    gameStartTime: Date.now(),
    totalAttacks: 0,
    successfulHits: 0
  }),

  recordAttack: (isHit: boolean) => set((state) => ({
    totalAttacks: state.totalAttacks + 1,
    successfulHits: state.successfulHits + (isHit ? 1 : 0)
  })),

  getGameSession: () => {
    const state = get()
    if (!state.gameStartTime) return null
    
    const endTime = Date.now()
    const gameDuration = endTime - state.gameStartTime
    
    // 게임 시간이 설정된 시간을 초과하면 0점 처리
    if (gameDuration > GAME_CONFIG.GAME_DURATION_MS) {
      return {
        startTime: state.gameStartTime,
        endTime,
        totalAttacks: state.totalAttacks,
        successfulHits: state.successfulHits,
        gameDuration,
        invalidated: true // 시간 초과로 무효화됨을 표시
      }
    }
    
    return {
      startTime: state.gameStartTime,
      endTime,
      totalAttacks: state.totalAttacks,
      successfulHits: state.successfulHits,
      gameDuration,
      invalidated: false
    }
  }
}))

// 게임 설정을 외부에서도 사용할 수 있도록 export
export { GAME_CONFIG }

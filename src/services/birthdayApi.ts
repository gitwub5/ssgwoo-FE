import axios from 'axios'
import type { Score } from '../stores/birthday'
import config from '../config'

const API_BASE_URL = config.api.baseUrl

export interface GameSession {
  startTime: number
  endTime: number
  totalAttacks: number
  successfulHits: number
  gameDuration: number
  invalidated: boolean
}

export interface SubmitScoreRequest {
  nickname: string
  score: number
  date: Date
}

export interface SubmitScoreResponse {
  success: boolean
  message: string
  rank?: number
}

export interface GetScoresResponse {
  scores: Score[]
  totalScores: number
  totalPages: number
}

export const birthdayApi = {
  // 순위 데이터 가져오기
  getScores: async (pageId: number): Promise<GetScoresResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/events/${pageId}`)
      const { scores, totalScores, totalPages } = response.data.data
      return { scores, totalScores, totalPages }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '순위 데이터를 불러오는데 실패했습니다.'
      throw new Error(errorMessage)
    }
  },

  // 점수 등록하기
  submitScore: async (data: SubmitScoreRequest): Promise<SubmitScoreResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/events`, data)
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        throw new Error(error.response.data.message)
      } else {
        throw new Error('점수 등록에 실패했습니다.')
      }
    }
  }
} 
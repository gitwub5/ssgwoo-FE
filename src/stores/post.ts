import { create } from 'zustand'
import axios from 'axios'
import config from '../config'

const API_BASE_URL = config.api.baseUrl

export type Comment = {
  id: number
  postId: number
  nickname: string
  content: string
  password?: string
  createdAt: string
}

export type Post = {
  id: number
  title: string
  nickname: string
  password?: string
  content: string
  likes: number
  createdAt: string
  comments: Comment[]
}

type PostStore = {
  posts: Post[]
  loading: boolean
  error: string | null
  addPost: (post: Omit<Post, 'id' | 'likes' | 'comments'>) => Promise<void>
  getPostList: (limit: number, cursor: number) => Promise<Post[]>
  getPostById: (id: number) => Promise<Post>
  addLike: (postId: number) => Promise<void>
  deletePost: (postId: number) => Promise<boolean>
  editPost: (postId: number, newData: { title: string; content: string }) => Promise<boolean>
  verifyPostPassword: (postId: number, password: string) => Promise<boolean>
}

type CommentStore = {
  addComment: (postId: number, comment: Omit<Comment, 'id' | 'postId' | 'createdAt'>) => Promise<void>
  deleteComment: (postId: number, commentId: number) => Promise<boolean>
  editComment: (postId: number, commentId: number, content: string) => Promise<boolean>
  verifyCommentPassword: (postId: number, commentId: number, password: string) => Promise<boolean>
}

export const usePosts = create<PostStore>((set) => ({
  posts: [],
  loading: false,
  error: null,
  addPost: async (post) => {
    try {
      set({ loading: true, error: null })
      const response = await axios.post(`${API_BASE_URL}/api/v1/posts`, post)
      set((state) => ({
        posts: [...state.posts, response.data],
        loading: false
      }))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '게시글 작성에 실패했습니다.'
      set({ error: errorMessage, loading: false })
      throw err
    }
  },
  getPostList: async (limit: number, cursor: number) => {
    try {
      set({ loading: true, error: null })
      const response = await axios.get(`${API_BASE_URL}/api/v1/posts`, {
        params: { limit, cursor }
      })
      set({ posts: response.data.data.posts, loading: false })
      return response.data.data.posts
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '게시글 목록을 불러오는데 실패했습니다.'
      set({ error: errorMessage, loading: false })
      throw err
    }
  },
  getPostById: async (id: number) => {
    try {
      set({ loading: true, error: null })
      const response = await axios.get(`${API_BASE_URL}/api/v1/posts/${id}`)
      set({ loading: false })
      return response.data.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.'
      set({ error: errorMessage, loading: false })
      throw err
    }
  },
  addLike: async (postId: number) => {
    try {
      set({ loading: true, error: null })
      await axios.post(`${API_BASE_URL}/api/v1/posts/${postId}/like`)
      set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ),
        loading: false
      }))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '좋아요 처리에 실패했습니다.'
      set({ error: errorMessage, loading: false })
      throw err
    }
  },
  deletePost: async (postId: number) => {
    try {
      set({ loading: true, error: null })
      await axios.delete(`${API_BASE_URL}/api/v1/posts/${postId}`)
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== postId),
        loading: false
      }))
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '게시글 삭제에 실패했습니다.'
      set({ error: errorMessage, loading: false })
      return false
    }
  },
  editPost: async (postId: number, newData: { title: string; content: string }) => {
    try {
      set({ loading: true, error: null })
      await axios.patch(`${API_BASE_URL}/api/v1/posts/${postId}`, newData)
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === postId ? { ...p, ...newData } : p
        ),
        loading: false
      }))
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '게시글 수정에 실패했습니다.'
      set({ error: errorMessage, loading: false })
      return false
    }
  },
  verifyPostPassword: async (postId: number, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/posts/${postId}/password`, { password })
      return response.data
    } catch (err) {
      console.error('비밀번호 확인 실패:', err instanceof Error ? err.message : '알 수 없는 오류')
      return false
    }
  }
}))

export const useComments = create<CommentStore>(() => ({
  addComment: async (postId: number, comment: Omit<Comment, 'id' | 'postId' | 'createdAt'>) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/posts/${postId}/comments`, comment)
      const posts = usePosts.getState().posts
      usePosts.setState({
        posts: posts.map(p =>
          p.id === postId
            ? { ...p, comments: [...p.comments, response.data] }
            : p
        )
      })
    } catch (err) {
      console.error('댓글 작성 실패:', err instanceof Error ? err.message : '알 수 없는 오류')
      throw err
    }
  },
  deleteComment: async (postId: number, commentId: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/v1/posts/${postId}/comments/${commentId}`)
      const posts = usePosts.getState().posts
      usePosts.setState({
        posts: posts.map(p =>
          p.id === postId
            ? { ...p, comments: p.comments.filter(c => c.id !== commentId) }
            : p
        )
      })
      return true
    } catch (err) {
      console.error('댓글 삭제 실패:', err instanceof Error ? err.message : '알 수 없는 오류')
      return false
    }
  },
  editComment: async (postId: number, commentId: number, content: string) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/v1/posts/${postId}/comments/${commentId}`, { content })
      const posts = usePosts.getState().posts
      usePosts.setState({
        posts: posts.map(p =>
          p.id === postId
            ? {
                ...p,
                comments: p.comments.map(c =>
                  c.id === commentId ? { ...c, content } : c
                )
              }
            : p
        )
      })
      return true
    } catch (err) {
      console.error('댓글 수정 실패:', err instanceof Error ? err.message : '알 수 없는 오류')
      return false
    }
  },
  verifyCommentPassword: async (postId: number, commentId: number, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/posts/${postId}/comments/${commentId}/password`, { password })
      return response.data
    } catch (err) {
      console.error('댓글 비밀번호 확인 실패:', err instanceof Error ? err.message : '알 수 없는 오류')
      return false
    }
  }
}))
import { Link } from 'react-router-dom'
import { usePosts } from '../../stores/post'
import { getRandomGradient } from '../../shared/utils/GetRandomGradient'
import { useEffect, useRef, useState } from 'react'
import type { Post } from '../../stores/post'
import { useTranslation } from 'react-i18next'

export function CommunityPage() {
  const { t } = useTranslation()
  const getPostList = usePosts((state) => state.getPostList)
  const [posts, setPosts] = useState<Post[]>([])
  const [nextCursor, setNextCursor] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const lastPostRef = useRef<HTMLAnchorElement>(null)
  const LIMIT = 5
  const isLoadingRef = useRef(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoading) {
      setShowLoading(true);
    } else {
      // 최소 400ms는 로딩 애니메이션이 보이도록
      timeout = setTimeout(() => setShowLoading(false), 400);
    }
    return () => clearTimeout(timeout);
  }, [isLoading]);

  // 초기 게시글 로딩
  useEffect(() => {
    const loadInitialPosts = async () => {
      setIsLoading(true)
      try {
        const fetchedPosts = await getPostList(LIMIT, 0)
        setPosts(fetchedPosts || [])
        if (fetchedPosts && fetchedPosts.length > 0) {
          setNextCursor(fetchedPosts[fetchedPosts.length - 1].id)
        } else {
          setNextCursor(null)
        }
      } catch (error) {
        console.error('초기 게시글 로딩 실패:', error)
        setPosts([])
        setNextCursor(null)
      } finally {
        setIsLoading(false)
      }
    }
    loadInitialPosts()
  }, [getPostList])

  // 무한 스크롤
  useEffect(() => {
    if (!lastPostRef.current) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (
          entries[0].isIntersecting &&
          nextCursor !== null &&
          !isLoadingRef.current
        ) {
          setIsLoading(true)
          isLoadingRef.current = true;
          try {
            const fetchedPosts = await getPostList(LIMIT, nextCursor)
            if (fetchedPosts && fetchedPosts.length > 0) {
              setPosts(prevPosts => [...prevPosts, ...fetchedPosts])
              setNextCursor(fetchedPosts[fetchedPosts.length - 1].id)
            } else {
              setNextCursor(null)
            }
          } catch (error) {
            console.error('추가 게시글 로딩 실패:', error)
          } finally {
            setIsLoading(false)
            isLoadingRef.current = false;
          }
        }
      },
      {
        threshold: 0.5,
        rootMargin: '100px',
      }
    )

    observer.observe(lastPostRef.current)

    return () => {
      observer.disconnect()
    }
  }, [lastPostRef.current, nextCursor, getPostList, posts])
  
  return (
    <div className="max-w-md mx-auto flex flex-col gap-4 relative">
      <div className="flex justify-between items-center mb-0">
        <h1 className="text-2xl font-bold text-gray-900">{t('communityPage.title')}</h1>
        <div className="flex gap-2">
          <Link
            to="/community/rules"
            className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium hover:bg-gray-200 transition text-sm shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5"
          >
            {t('communityPage.rules')}
          </Link>
          <Link
            to="/community/write"
            className="bg-blue-500 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-blue-600 transition text-sm shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5"
          >
            {t('communityPage.write')}
          </Link>
        </div>
      </div>
      {posts.length === 0 && !isLoading && (
        <div className="text-center py-6 text-gray-500 bg-white rounded-2xl shadow-md">
          <p className="text-lg mb-1">{t('communityPage.noPosts.title')}</p>
          <p className="text-sm">{t('communityPage.noPosts.subtitle')}</p>
        </div>
      )}
      {posts.map((post, index) => (
        <Link 
          to={`/community/${post.id}`} 
          key={post.id} 
          ref={index === posts.length - 1 ? lastPostRef : null}
          className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 hover:border-pink-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getRandomGradient()} flex items-center justify-center text-white font-bold text-base shadow-lg transform hover:scale-105 transition-transform duration-300`}>
              {post.nickname[0]}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{post.nickname}</span>
              <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
          <div className="text-lg font-bold text-gray-900 mb-1 hover:text-pink-600 transition-colors duration-300">{post.title}</div>
          <div className="text-gray-600 mb-2 line-clamp-2 break-words overflow-hidden leading-relaxed text-sm">{post.content}</div>
          <div className="flex justify-between items-center text-gray-400 text-xs mt-2 pt-2 border-t border-gray-100">
            <div className="flex gap-3">
              <span className="flex items-center gap-1 hover:text-pink-500 transition-colors duration-300">
                <span className="text-sm">❤️</span>
                <span>{post.likesCount}</span>
              </span>
              <span className="flex items-center gap-1 hover:text-blue-500 transition-colors duration-300">
                <span className="text-sm">💬</span>
                <span>{post.commentsCount}</span>
              </span>
            </div>
          </div>
        </Link>
      ))}
      {showLoading && (
        <div className="flex justify-center py-4">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="ml-2 text-sm text-gray-500">{t('communityPage.loading')}</span>
        </div>
      )}
    </div>
  )
}
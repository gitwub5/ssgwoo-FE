import { Link, useNavigate } from 'react-router-dom'
import { usePosts } from '../../stores/post'
import { useTranslation } from 'react-i18next'

export function CommunityWrite() {
  const { t } = useTranslation()
  const addPost = usePosts((state) => state.addPost)
  const getPostList = usePosts((state) => state.getPostList)
  const navigate = useNavigate()
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const title = (form.elements.namedItem('title') as HTMLInputElement).value
    const nickname = (form.elements.namedItem('nickname') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value
    // 비밀번호 숫자 4자리 유효성 검사
    if (!/^\d{4}$/.test(password)) {
      alert(t('communityPage.writePage.error.invalidPassword'))
      return
    }
    try {
      await addPost({ title, nickname, password, content, createdAt: new Date().toISOString(), likesCount: 0, commentsCount: 0 })
      await getPostList(5, 0) // 최신 게시글 목록을 다시 불러옵니다
      navigate('/community', { replace: true })
    } catch (error) {
      console.error('게시글 작성 실패:', error)
    }
  }
  
  return (
    <div className="flex justify-center items-start min-h-screen pt-1">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl w-full mx-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Link to="/community" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h2 className="text-xl font-extrabold text-gray-900">{t('communityPage.writePage.title')}</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">{t('communityPage.writePage.form.title')}</label>
            <input 
              id="title"
              name="title" 
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition shadow-sm hover:shadow-md" 
              placeholder={t('communityPage.writePage.form.titlePlaceholder')} 
              required 
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">{t('communityPage.writePage.form.nickname')}</label>
            <input 
              id="nickname"
              name="nickname" 
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition shadow-sm hover:shadow-md" 
              placeholder={t('communityPage.writePage.form.nicknamePlaceholder')} 
              required 
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">{t('communityPage.writePage.form.content')}</label>
            <textarea 
              id="content"
              name="content" 
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-lg min-h-[10rem] resize-y focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition shadow-sm hover:shadow-md" 
              placeholder={t('communityPage.writePage.form.contentPlaceholder')} 
              required 
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('communityPage.writePage.form.password')}</label>
            <div className="relative">
              <input 
                id="password"
                name="password" 
                type="password" 
                pattern="\d{4}" 
                maxLength={4} 
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition shadow-sm hover:shadow-md" 
                placeholder={t('communityPage.writePage.form.passwordPlaceholder')} 
                required 
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                🔒
              </span>
            </div>
            <p className="text-xs text-gray-500">{t('communityPage.writePage.form.passwordHelp')}</p>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Link 
              to="/community" 
              className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium shadow-sm hover:bg-gray-200 hover:shadow-md transition-all duration-300 flex items-center gap-1"
            >
              <span>{t('communityPage.writePage.form.cancel')}</span>
            </Link>
            <button 
              type="submit" 
              className="px-5 py-2 bg-gradient-to-br from-pink-500 to-yellow-400 text-white rounded-lg font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-1"
            >
              <span>{t('communityPage.writePage.form.submit')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
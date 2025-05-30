import { Link, useNavigate } from 'react-router-dom'
import { usePosts } from '../../stores/post'

export function CommunityWrite() {
  const addPost = usePosts((state) => state.addPost)
  const navigate = useNavigate()
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const title = (form.elements.namedItem('title') as HTMLInputElement).value
    const nickname = (form.elements.namedItem('nickname') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value
    // 비밀번호 숫자 4자리 유효성 검사
    if (!/^\d{4}$/.test(password)) {
      alert('비밀번호는 숫자 4자리여야 합니다.')
      return
    }
    addPost({ title, nickname, password, content, createdAt: new Date().toISOString() })
    navigate('/community')
  }
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6 ">글 작성</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input name="title" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition" placeholder="제목" required />
          <input name="nickname" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition" placeholder="닉네임" required />
          <textarea name="content" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg min-h-[8rem] resize-y focus:outline-none focus:ring-2 focus:ring-blue-200 transition" placeholder="내용" required />
          <input name="password" type="password" pattern="\d{4}" maxLength={4} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition" placeholder="비밀번호(숫자 4자리)" required />
          <div className="flex gap-2 justify-end mt-0">
            <button type="submit" className="px-6 py-2 bg-gradient-to-br from-pink-500 to-yellow-400 text-white rounded-full font-bold shadow hover:scale-105 transition">저장</button>
            <Link to="/community" className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-bold shadow hover:bg-gray-300 transition">취소</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
import { useUser } from '../../stores/user'
import { useState } from 'react'

export const AdminPage = () => {
  const { user, login, logout } = useUser()
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async () => {
    try {
      if (!formData.id || !formData.password) {
        setError('아이디와 비밀번호를 모두 입력해주세요.')
        return
      }
      await login({ 
        id: formData.id, 
        name: '', 
        email: '', 
        password: formData.password 
      })
      setError('')
    } catch {
      setError('로그인에 실패했습니다.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">관리자 페이지</h1>
        
        {user ? (
          <div className="space-y-4">
            <p className="text-green-600 text-center">로그인 상태: {user.id}</p>
            <button
              onClick={logout}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                아이디
              </label>
              <input
                id="id"
                name="id"
                type="text"
                value={formData.id}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="아이디를 입력하세요"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              onClick={handleLogin}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              로그인
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
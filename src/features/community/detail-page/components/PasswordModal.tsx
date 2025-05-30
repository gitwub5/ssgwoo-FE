import { useState } from 'react'

type PasswordModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (pw: string) => void
  label: string
  type: 'post' | 'comment'
}

export default function PasswordModal({ open, onClose, onSubmit, label }: PasswordModalProps) {
    const [pw, setPw] = useState('')
    if (!open) return null
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4 text-gray-800">{label}</h3>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="비밀번호(4자리)"
            maxLength={4}
            autoFocus
          />
          <div className="flex gap-2 w-full">
            <button onClick={() => { setPw(''); onClose(); }} className="flex-1 py-2 rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition">취소</button>
            <button onClick={() => { onSubmit(pw); setPw(''); onClose(); }} className="flex-1 py-2 rounded bg-gradient-to-br from-pink-500 to-yellow-400 text-white font-bold hover:scale-105 transition">확인</button>
          </div>
        </div>
      </div>
    )
  }
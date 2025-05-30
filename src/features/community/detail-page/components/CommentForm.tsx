interface CommentFormProps {
  nickname: string
  password: string
  content: string
  onNicknameChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onContentChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function CommentForm({
  nickname,
  password,
  content,
  onNicknameChange,
  onPasswordChange,
  onContentChange,
  onSubmit,
}: CommentFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-3 mb-4">
      <div className="w-full flex flex-col sm:flex-row gap-2">
        <input
          value={nickname}
          onChange={(e) => onNicknameChange(e.target.value)}
          name="comment-nickname"
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"
          placeholder="닉네임"
          required
        />
        <input
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          name="comment-password"
          type="password"
          maxLength={4}
          pattern="\d{4}"
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="비밀번호(4자리)"
          required
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        name="comment-content"
        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm min-h-[3rem] resize-y focus:outline-none focus:ring-2 focus:ring-pink-200"
        placeholder="댓글 내용"
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-br from-pink-500 to-yellow-400 text-white rounded-full font-bold shadow hover:scale-105 transition"
      >
        댓글 작성
      </button>
    </form>
  )
} 
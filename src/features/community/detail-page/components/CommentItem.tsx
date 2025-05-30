import type { Comment } from '../../../../stores/post'
import { useComments } from '../../../../stores/post'
import { useState } from 'react'

interface CommentItemProps {
  comment: Comment
  isEditing: boolean
  editingContent: string
  onContentChange: (content: string) => void
  onEdit: () => void
  onDelete: () => void
  onFinishEdit: () => void
  onCancelEdit: () => void
}

export function CommentItem({
  comment,
  isEditing,
  editingContent,
  onContentChange,
  onEdit,
  onDelete,
  onFinishEdit,
  onCancelEdit,
}: CommentItemProps) {
  const [openMenu, setOpenMenu] = useState(false)
  const editComment = useComments((state) => state.editComment)

  const handleFinishEdit = async () => {
    try {
      const success = await editComment(comment.postId, comment.id, editingContent)
      if (success) {
        onFinishEdit()
      } else {
        alert('댓글 수정에 실패했습니다.')
      }
    } catch (error) {
      console.error('댓글 수정 실패:', error)
      alert('댓글 수정에 실패했습니다.')
    }
  }

  return (
    <li className="bg-gray-50 rounded-lg p-3 relative">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-pink-500">{comment.nickname}</span>
        <span className="text-xs text-gray-400">{comment.createdAt?.slice(0, 10)}</span>
        {/* 댓글 케밥 메뉴 */}
        <div className="ml-auto relative">
          <button onClick={() => setOpenMenu(!openMenu)} className="px-2 py-1 text-gray-500 hover:text-gray-900 text-xl">⋮</button>
          {openMenu && (
            <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-10">
              <button onClick={() => { setOpenMenu(false); onEdit(); }} className="block w-full px-4 py-2 text-left hover:bg-gray-100">수정</button>
              <button onClick={() => { setOpenMenu(false); onDelete(); }} className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100">삭제</button>
            </div>
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editingContent}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm min-h-[3rem] resize-y focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
          <div className="flex gap-2">
            <button
              onClick={handleFinishEdit}
              className="flex-1 py-1 bg-gradient-to-br from-pink-500 to-yellow-400 text-white rounded-full font-bold shadow hover:scale-105 transition"
            >
              수정 완료
            </button>
            <button
              onClick={onCancelEdit}
              className="flex-1 py-1 bg-gray-200 text-gray-700 rounded-full font-bold shadow hover:bg-gray-300 transition"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-700 text-sm whitespace-pre-line">{comment.content}</div>
      )}
    </li>
  )
} 
import type { Post } from '../../../../stores/post'
import { usePosts } from '../../../../stores/post'

interface PostEditFormProps {
  post: Post
  onFinish: (title: string, content: string) => void
  onCancel: () => void
}

export function PostEditForm({ post, onFinish, onCancel }: PostEditFormProps) {
  const editPost = usePosts((state) => state.editPost)

  const handleSubmit = async () => {
    const title = (document.querySelector('input') as HTMLInputElement).value
    const content = (document.querySelector('textarea') as HTMLTextAreaElement).value
    
    try {
      const success = await editPost(post.id, { title, content })
      if (success) {
        onFinish(title, content)
      } else {
        alert('게시글 수정에 실패했습니다.')
      }
    } catch (error) {
      console.error('게시글 수정 실패:', error)
      alert('게시글 수정에 실패했습니다.')
    }
  }

  return (
    <div className="space-y-4">
      <input
        defaultValue={post.title}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
        placeholder="제목"
        required
      />
      <textarea
        defaultValue={post.content}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg min-h-[8rem] resize-y focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
        placeholder="내용"
        required
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 py-2 bg-gradient-to-br from-pink-500 to-yellow-400 text-white rounded-full font-bold shadow hover:scale-105 transition"
        >
          수정 완료
        </button>
        <button
          onClick={onCancel}
          className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-full font-bold shadow hover:bg-gray-300 transition"
        >
          취소
        </button>
      </div>
      <div className="h-4"></div>
    </div>
  )
} 
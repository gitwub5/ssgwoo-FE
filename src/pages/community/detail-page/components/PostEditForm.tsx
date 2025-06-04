import type { Post } from '../../../../stores/post'
import { useTranslation } from 'react-i18next'

interface PostEditFormProps {
  post: Post
  onFinish: (title: string, content: string) => void
  onCancel: () => void
}

export function PostEditForm({ post, onFinish, onCancel }: PostEditFormProps) {
  const { t } = useTranslation()

  const handleSubmit = () => {
    const title = (document.querySelector('input') as HTMLInputElement).value
    const content = (document.querySelector('textarea') as HTMLTextAreaElement).value
    
    if (!title.trim() || !content.trim()) {
      alert(t('community.detailPage.error.required'))
      return
    }
    
    onFinish(title, content)
  }

  return (
    <div className="space-y-4">
      <input
        defaultValue={post.title}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
        placeholder={t('communityPage.detailPage.form.titlePlaceholder')}
        required
      />
      <textarea
        defaultValue={post.content}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg min-h-[8rem] resize-y focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
        placeholder={t('communityPage.detailPage.form.contentPlaceholder')}
        required
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 py-2 bg-gradient-to-br from-pink-500 to-yellow-400 text-white rounded-full font-bold shadow hover:scale-105 transition"
        >
          {t('communityPage.detailPage.edit')}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-full font-bold shadow hover:bg-gray-300 transition"
        >
          {t('communityPage.detailPage.cancel')}
        </button>
      </div>
      <div className="h-4"></div>
    </div>
  )
} 
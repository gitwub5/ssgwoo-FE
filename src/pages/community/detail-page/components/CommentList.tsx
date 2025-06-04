import { useTranslation } from 'react-i18next';
import type { Comment } from '../../../../stores/post'
import { CommentItem } from './CommentItem'

interface CommentListProps {
  comments: Comment[]
  editingCommentId: number | null
  editingCommentContent: string
  onContentChange: (content: string) => void
  onEdit: (commentId: number) => void
  onDelete: (commentId: number) => void
  onFinishEdit: (commentId: number) => void
  onCancelEdit: () => void
}

export function CommentList({
  comments,
  editingCommentId,
  editingCommentContent,
  onContentChange,
  onEdit,
  onDelete,
  onFinishEdit,
  onCancelEdit,
}: CommentListProps) {
  const { t } = useTranslation();
  return (
    <div className="mb-6">
      <h3 className="font-bold text-gray-800 mb-2">{t('communityPage.detailPage.comment.title')}</h3>
      {comments.length === 0 && <div className="text-gray-400 text-sm">{t('communityPage.detailPage.comment.noComments')}</div>}
      <ul className="space-y-3">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isEditing={editingCommentId === comment.id}
            editingContent={editingCommentContent}
            onContentChange={onContentChange}
            onEdit={() => onEdit(comment.id)}
            onDelete={() => onDelete(comment.id)}
            onFinishEdit={() => onFinishEdit(comment.id)}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </ul>
    </div>
  )
} 
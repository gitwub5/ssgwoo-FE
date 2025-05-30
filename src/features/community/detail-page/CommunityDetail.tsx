import { Link, useParams, useNavigate } from 'react-router-dom'
import { usePosts } from '../../../stores/post'
import { useComments } from '../../../stores/post'
import { useState, useEffect } from 'react'
import PasswordModal from './components/PasswordModal'
import { PostEditForm } from './components/PostEditForm'
import { CommentList } from './components/CommentList'
import { CommentForm } from './components/CommentForm'
import { getRandomGradient } from '../../../shared/utils/GetRandomGradient'
import type { Post } from '../../../stores/post'

export function CommunityDetail() {
  const { id } = useParams()
  const postId = Number(id)
  const addComment = useComments((state) => state.addComment)
  const deletePost = usePosts((state) => state.deletePost)
  const editPost = usePosts((state) => state.editPost)
  const deleteComment = useComments((state) => state.deleteComment)
  const editComment = useComments((state) => state.editComment)
  const addLike = usePosts((state) => state.addLike)
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [content, setContent] = useState('')
  const [openPostMenu, setOpenPostMenu] = useState(false)
  const [pwModal, setPwModal] = useState<{ open: boolean, type: 'post-edit' | 'post-delete' | 'comment-edit' | 'comment-delete' | null, targetId?: number, oldContent?: string }>({ open: false, type: null })
  const [editingPost, setEditingPost] = useState(false)

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editingCommentContent, setEditingCommentContent] = useState('')
  const [hasLiked, setHasLiked] = useState(false)
  const getPostById = usePosts((state) => state.getPostById)
  const posts = usePosts((state) => state.posts) 
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  const verifyPostPassword = usePosts((state) => state.verifyPostPassword)
const verifyCommentPassword = useComments((state) => state.verifyCommentPassword)


  useEffect(() => {
    getPostById(postId)
    .then((fetched) => {
      setPost(fetched ?? null)
    })
    .catch(() => setPost(null))
    .finally(() => setLoading(false))
}, [postId, posts, getPostById])

  useEffect(() => {
    // 페이지 로드 시 세션에서 좋아요 상태 확인
    const likedPosts = JSON.parse(sessionStorage.getItem('likedPosts') || '[]')
    setHasLiked(likedPosts.includes(postId))
  }, [postId])

  const handleLike = () => {
    const likedPosts = JSON.parse(sessionStorage.getItem('likedPosts') || '[]')
    
    // 이미 좋아요를 누른 게시글인 경우 아무 동작도 하지 않음
    if (likedPosts.includes(postId)) return

    // 좋아요를 누르지 않은 경우에만 좋아요 추가
    sessionStorage.setItem('likedPosts', JSON.stringify([...likedPosts, postId]))
    setHasLiked(true)
    addLike(postId)
  }

  if (loading) {
    return <div>로딩 중...</div>
  }

  if (!post) {
    return <div>글을 찾을 수 없습니다.</div>
  }

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nickname.trim() || !password.trim() || !content.trim()) {
      alert('닉네임, 비밀번호, 내용을 모두 입력해주세요.')
      return
    }
    try {
      await addComment(postId, { nickname, password, content })
      const fetched = await getPostById(postId)
      setPost(fetched ?? null)
      setNickname('')
      setPassword('')
      setContent('')
    } catch {
      alert('댓글 작성에 실패했습니다.')
    }
  }

  // 게시글 삭제
  async function handleDeletePost() {
    try {
      await deletePost(postId)
      alert('삭제되었습니다.')
      navigate('/community')
    } catch (error) {
      console.error('게시글 삭제 실패:', error)
      alert('게시글 삭제에 실패했습니다.')
    }
    setPwModal({ open: false, type: null })
  }

  // 게시글 수정 모드 활성화
  function handleStartEditPost() {
    if (!post) return
    setEditingPost(true)
    setPwModal({ open: false, type: null })
  }

  // 게시글 수정 완료
  async function handleFinishEditPost(title: string, content: string) {
    if (!post) return
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.')
      return
    }
    try {
      await editPost(postId, { title, content })
      const updatedPost = await getPostById(postId)
      setPost(updatedPost)
      setEditingPost(false)
      alert('수정되었습니다.')
    } catch (error) {
      console.error('게시글 수정 실패:', error)
      alert('게시글 수정에 실패했습니다.')
    }
  }

  // 댓글 수정 모드 활성화
  function handleStartEditComment(commentId: number, content: string) {
    setEditingCommentId(commentId)
    setEditingCommentContent(content)
  }

  // 댓글 수정 완료
  async function handleFinishEditComment(commentId: number) {
    if (!editingCommentContent.trim()) {
      alert('내용을 입력해주세요.')
      return
    }
    const success = await editComment(postId, commentId, editingCommentContent)
    if (success) {
      alert('수정되었습니다.')
      setEditingCommentId(null)
      setEditingCommentContent('')
    } else {
      alert('비밀번호가 일치하지 않습니다.')
    }
  }

  // 댓글 삭제
  async function handleDeleteComment(commentId: number) {
    const success = await deleteComment(postId, commentId)
    if (success) {
      alert('댓글이 삭제되었습니다.')
    } else {
      alert('비밀번호가 일치하지 않습니다.')
    }
    setPwModal({ open: false, type: null })
  }


const handlePasswordSubmit = async (pw: string) => {
  if (pwModal.type === 'post-edit') {
    const ok = await verifyPostPassword(postId, pw)
    if (!ok) {
      alert('게시글 비밀번호가 일치하지 않습니다.')
      setPwModal({ open: false, type: null })
      return
    }
    handleStartEditPost()
  } else if (pwModal.type === 'post-delete') {
    const ok = await verifyPostPassword(postId, pw)
    if (!ok) {
      alert('게시글 비밀번호가 일치하지 않습니다.')
      setPwModal({ open: false, type: null })
      return
    }
    handleDeletePost()
  } else if (pwModal.type === 'comment-edit' && pwModal.targetId) {
    const ok = await verifyCommentPassword(postId, pwModal.targetId, pw)
    if (!ok) {
      alert('댓글 비밀번호가 일치하지 않습니다.')
      setPwModal({ open: false, type: null })
      return
    }
    handleStartEditComment(pwModal.targetId, pwModal.oldContent || '')
  } else if (pwModal.type === 'comment-delete' && pwModal.targetId) {
    const ok = await verifyCommentPassword(postId, pwModal.targetId, pw)
    if (!ok) {
      alert('댓글 비밀번호가 일치하지 않습니다.')
      setPwModal({ open: false, type: null })
      return
    }
    handleDeleteComment(pwModal.targetId)
  }
  setPwModal({ open: false, type: null })
}

  return (
    <div className="flex justify-center items-center">
      <PasswordModal
        open={pwModal.open}
        onClose={() => setPwModal({ open: false, type: null })}
        label={
          pwModal.type === 'post-edit' ? '게시글 수정 비밀번호'
          : pwModal.type === 'post-delete' ? '게시글 삭제 비밀번호'
          : pwModal.type === 'comment-edit' ? '댓글 수정 비밀번호'
          : pwModal.type === 'comment-delete' ? '댓글 삭제 비밀번호'
          : ''
        }
        type={pwModal.type === 'post-edit' || pwModal.type === 'post-delete' ? 'post' : 'comment'}
        onSubmit={handlePasswordSubmit}
      />
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4 relative">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRandomGradient()} flex items-center justify-center text-white font-bold text-lg shadow`}>
            {post.nickname[0]}
          </div>
          <span className="font-semibold text-gray-800">{post.nickname}</span>
          {/* 게시글 케밥 메뉴 */}
          <div className="ml-auto relative">
            <button onClick={() => setOpenPostMenu((v) => !v)} className="px-2 py-1 text-gray-500 hover:text-gray-900 text-xl">⋮</button>
            {openPostMenu && (
              <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-10">
                <button onClick={() => { setOpenPostMenu(false); setPwModal({ open: true, type: 'post-edit' }); }} className="block w-full px-4 py-2 text-left hover:bg-gray-100">수정</button>
                <button onClick={() => { setOpenPostMenu(false); setPwModal({ open: true, type: 'post-delete' }); }} className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100">삭제</button>
              </div>
            )}
          </div>
        </div>
        {editingPost ? (
          <PostEditForm
            post={post}
            onFinish={handleFinishEditPost}
            onCancel={() => {
              setEditingPost(false)
            }}
          />
        ) : (
          <>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{post?.title}</h2>
            <div className="text-gray-500 mb-4">{new Date(post?.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</div>
            <div className="text-gray-800 leading-relaxed whitespace-pre-line mb-8">{post?.content}</div>
          </>
        )}
        <div className="flex gap-4 text-gray-400 text-sm mb-4">
          <button 
            onClick={handleLike} 
            className={`flex items-center gap-1 transition ${
              hasLiked ? 'text-pink-500' : 'hover:text-pink-500'
            }`}
          >
            <span className="text-base">♥</span>
            <span>{post.likes}</span>
          </button>
          <div className="flex items-center gap-1">
            <span className="text-base">💬</span>
            <span>{post.comments?.length ?? 0}</span>
          </div>
        </div>
        {/* 댓글 목록 */}
        <CommentList
          comments={Array.isArray(post.comments) ? post.comments : []}
          editingCommentId={editingCommentId}
          editingCommentContent={editingCommentContent}
          onContentChange={setEditingCommentContent}
          onEdit={(commentId) => {
            const comment = post.comments.find(c => c.id === commentId)
            if (comment) {
              setPwModal({ open: true, type: 'comment-edit', targetId: commentId, oldContent: comment.content })
            }
          }}
          onDelete={(commentId) => {
            setPwModal({ open: true, type: 'comment-delete', targetId: commentId })
          }}
          onFinishEdit={handleFinishEditComment}
          onCancelEdit={() => {
            setEditingCommentId(null)
            setEditingCommentContent('')
          }}
        />
        {/* 댓글 작성 폼 */}
        <CommentForm
          nickname={nickname}
          password={password}
          content={content}
          onNicknameChange={setNickname}
          onPasswordChange={setPassword}
          onContentChange={setContent}
          onSubmit={handleCommentSubmit}
        />
        <Link to="/community" className="block text-center mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-bold shadow hover:bg-gray-200 transition">목록으로</Link>
      </div>
    </div>
  )
}
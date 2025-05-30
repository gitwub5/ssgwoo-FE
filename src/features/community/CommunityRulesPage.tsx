import { Link } from 'react-router-dom'

export function CommunityRulesPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/community"
          className="text-gray-600 hover:text-gray-900 transition"
        >
          ← 돌아가기
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">커뮤니티 규칙</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 기본 규칙</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>서로를 존중하고 예의를 지켜주세요.</li>
            <li>타인의 권리를 침해하는 행위는 금지됩니다.</li>
            <li>욕설, 비방, 혐오 발언은 금지됩니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 게시글 작성 규칙</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>제목은 내용을 잘 설명할 수 있도록 작성해주세요.</li>
            <li>스팸성 게시글은 금지됩니다.</li>
            <li>광고성 게시글은 사전 허가 없이 금지됩니다.</li>
            <li>저작권이 있는 콘텐츠는 출처를 명시해주세요.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 댓글 작성 규칙</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>댓글은 주제와 관련된 내용으로 작성해주세요.</li>
            <li>타인을 비방하거나 모욕하는 댓글은 금지됩니다.</li>
            <li>도배성 댓글은 제한될 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 제재 규정</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>규칙 위반 시 해당 게시글 또는 댓글은 즉각 삭제 조치가 이루어집니다.</li>
            <li>반복적인 위반 시 영구적인 이용 제한이 될 수 있습니다.</li>
          </ul>
        </section>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            커뮤니티 규칙은 모든 회원이 더 나은 환경에서 소통할 수 있도록 마련되었습니다.
            규칙을 준수하여 즐거운 커뮤니티 활동이 되시길 바랍니다.
          </p>
        </div>
      </div>
    </div>
  )
} 
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function CommunityRulesPage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/community"
          className="text-gray-600 hover:text-gray-900 transition"
        >
          {t('communityPage.back')}
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{t('communityPage.rulesPage.title')}</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('communityPage.rulesPage.basic.title')}</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {(t('communityPage.rulesPage.basic.items', { returnObjects: true }) as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('communityPage.rulesPage.post.title')}</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {(t('communityPage.rulesPage.post.items', { returnObjects: true }) as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('communityPage.rulesPage.comment.title')}</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {(t('communityPage.rulesPage.comment.items', { returnObjects: true }) as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('communityPage.rulesPage.penalty.title')}</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {(t('communityPage.rulesPage.penalty.items', { returnObjects: true }) as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            {t('communityPage.rulesPage.notice')}
          </p>
        </div>
      </div>
    </div>
  )
} 
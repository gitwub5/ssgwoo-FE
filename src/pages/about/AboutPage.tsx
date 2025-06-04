import { useTranslation } from 'react-i18next';

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[60vh] flex flex-col items-center bg-white rounded-xl shadow-lg px-6 pt-8 pb-16">
      <div className="flex flex-col items-center text-center w-full max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-lg tracking-tight">{"About me"}</h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium whitespace-pre-line">
          {t('aboutPage.aboutContent')}
        </p>
        <a
          href="https://github.com/gitwub5"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-blue-600 hover:underline font-semibold text-lg"
        >
          {t('aboutPage.githubLink')}
        </a>
        {/* Contact 섹션 */}
        <div className="mt-10 w-full max-w-md mx-auto">
          <div className="border-t border-gray-200 bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-800">{t('aboutPage.contact')}</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                {"📧 Email"}: <a href="mailto:ssgwoo5@gmail.com" className="text-blue-600 hover:underline">ssgwoo5@gmail.com</a>
              </li>
              <li>
                {"📸 Instagram"}: <a href="https://instagram.com/gitwub5" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@gitwub5</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 한국어 번역
import koHomePage from './locales/ko/homePage.json';
import koAboutPage from './locales/ko/aboutPage.json';
import koGamePage from './locales/ko/gamePage.json';
import koAiChatPage from './locales/ko/aiChatPage.json';
import koCommunityPage from './locales/ko/communityPage.json';

// 영어 번역
import enHomePage from './locales/en/homePage.json';
import enAboutPage from './locales/en/aboutPage.json';
import enGamePage from './locales/en/gamePage.json';
import enAiChatPage from './locales/en/aiChatPage.json';
import enCommunityPage from './locales/en/communityPage.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: {
        translation: {
          homePage: koHomePage,
          aboutPage: koAboutPage,
          gamePage: koGamePage,
          aiChatPage: koAiChatPage,
          communityPage: koCommunityPage
        }
      },
      en: {
        translation: {
          homePage: enHomePage,
          aboutPage: enAboutPage,
          gamePage: enGamePage,
          aiChatPage: enAiChatPage,
          communityPage: enCommunityPage
        }
      }
    },
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 
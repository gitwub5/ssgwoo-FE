import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: {
        translation: {
          welcome: '환영합니다',
          about: '소개',
          contact: '연락처',
          aboutMe: 'About me',
          aboutContent: '안녕하세요! 저는 신건우입니다.\n제 전공은 컴퓨터공학이고,\n개발자로 일하고 있습니다.\n\n이 프로젝트는 오랜 저의 꿈이였습니다.\n응원해주세요!',
          githubLink: '👉 GitHub 바로가기',
          contactTitle: 'Contact',
          email: '📧 Email',
          instagram: '📸 Instagram',
          welcomeTo: 'Welcome to',
          platform: '커뮤니티, Ai 채팅, 게임까지!',
          platformDesc: 'React & Tailwind CSS 기반의 플랫폼입니다.',
          aboutMeBtn: 'About me'
        }
      },
      en: {
        translation: {
          welcome: 'Welcome',
          about: 'About',
          contact: 'Contact',
          aboutMe: 'About me',
          aboutContent: 'Hello! I am Geonwoo Shin.\nMy major is Computer Science,\nand I work as a developer.\n\nThis project has been my long-time dream.\nPlease support me!',
          githubLink: '👉 Go to GitHub',
          contactTitle: 'Contact',
          email: '📧 Email',
          instagram: '📸 Instagram',
          welcomeTo: 'Welcome to',
          platform: 'Community, AI Chat, and Games!',
          platformDesc: 'A platform based on React & Tailwind CSS.',
          aboutMeBtn: 'About me'
        }
      }
    },
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 
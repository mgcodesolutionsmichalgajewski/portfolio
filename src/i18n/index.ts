import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { pl } from './pl';

const savedLanguage = localStorage.getItem('language');
const initialLanguage = savedLanguage === 'en' ? 'en' : 'pl';

void i18n.use(initReactI18next).init({
  resources: { pl: { translation: pl }, en: { translation: en } },
  lng: initialLanguage,
  fallbackLng: 'pl',
  interpolation: { escapeValue: false },
});

document.documentElement.lang = initialLanguage;

i18n.on('languageChanged', (language) => {
  const supportedLanguage = language === 'en' ? 'en' : 'pl';
  document.documentElement.lang = supportedLanguage;
  localStorage.setItem('language', supportedLanguage);
});

export default i18n;

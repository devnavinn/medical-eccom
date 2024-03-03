// i18n.js
import i18n from 'i18next';
import LanguageDectector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next';

// Import translations
import translationEN from '../locales/en/translation.json';
import translationDE from '../locales/de/translation.json';

// Initialize i18next
i18n.use(LanguageDectector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        debug: true,
        returnObjects: true,
        resources: {
            en: {
                translation: translationEN
            },
            de: {
                translation: translationDE
            },
        },
        lng: 'de', // default language
        fallbackLng: 'de', // fallback language
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;

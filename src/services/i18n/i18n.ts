import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/resources';
import LanguageDetector from 'i18next-browser-languagedetector';
// "Inline" English and Arabic translations.
// We can localize to any language and any number of languages.
const options = {
    order: ['path'],
};

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        detection: options,
        fallbackLng: ['en'],
        resources,
        interpolation: {
            escapeValue: false,
        },
    });
export default i18next;

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from '../languages/en.json'
import translationES from '../languages/es.json'

const resources = {
    en: {
        translation: translationEN,
    },
    es: {
        translation: translationES,
    },
}
i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'en',
    debug: true,

    interpolation: {
        escapeValue: false,
    },
})

export default i18n

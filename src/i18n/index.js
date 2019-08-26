import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { en } from './translations/en'

const defaultLang = 'en'

const options = {
  debug: false,
  fallbackLng: defaultLang,
  interpolation: { escapeValue: false },
  resources: { en },
  // react i18next special options (optional)
  react: {
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
    wait: false,
  },
}

i18n.use(initReactI18next).init(options)

export default i18n

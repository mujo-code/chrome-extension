import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { i18n as extensioni18n } from '../lib/extension'
import { en } from './translations/en'
import { es } from './translations/es'

export const i18n = i18next

const defaultLang = 'en'

const options = {
  debug: false,
  fallbackLng: defaultLang,
  lng: extensioni18n.getUILanguage(),
  interpolation: { escapeValue: false },
  resources: { en, es },
  // react i18next special options (optional)
  react: {
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
    wait: false,
  },
}

i18n.use(initReactI18next).init(options)

import { Extension } from '@mujo/utils'
import * as Sentry from '@sentry/browser'
import { ID_KEY } from '../constants'
import { SENTRY_DSN, ENVIRONMENT } from '../env'

const { getStorage } = Extension

export const createTracker = ({ dsn, environment }) => {
  const hasDSN = !!dsn
  if (hasDSN) {
    Sentry.init({ dsn, environment })
    getStorage(ID_KEY).then(id => {
      Sentry.setUser({ id })
    })
  }

  return {
    exception(error) {
      if (!hasDSN) return null
      return Sentry.captureException(error)
    },
    async exceptionWithInfo(error, errorInfo) {
      if (!hasDSN) return null
      return new Promise(resolve => {
        Sentry.withScope(scope => {
          scope.setExtras(errorInfo)
          return resolve(Sentry.captureException(error))
        })
      })
    },
  }
}

export const tracker = createTracker({
  dsn: SENTRY_DSN,
  environment: ENVIRONMENT,
})

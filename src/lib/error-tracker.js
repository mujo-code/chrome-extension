import * as Sentry from '@sentry/browser'

const { SENTRY_DSN } = process.env

export const createTracker = ({ dsn, environment }) => {
  const hasDSN = !!dsn
  if (hasDSN) {
    Sentry.init({ dsn, environment })
  }

  return {
    exception(error) {
      if (hasDSN) return null
      return Sentry.captureException(error)
    },
    async exceptionWithInfo(error, errorInfo) {
      if (hasDSN) return null
      return new Promise(resolve => {
        Sentry.withScope(scope => {
          scope.setExtras(errorInfo)
          return resolve(Sentry.captureException(error))
        })
      })
    },
  }
}

export const tracker = createTracker({ dsn: SENTRY_DSN })

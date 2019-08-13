import { set } from '../lib/util'

export const GTM_JS = 'https://www.googletagmanager.com/gtm.js'

export const createDataLayer = win => {
  const layer = 'dataLayer'
  const currentLayer = win[layer] || []
  set(win, layer, currentLayer)
  return win[layer]
}

export const addToDataLayer = dataLayer => payload =>
  dataLayer.push(payload)

export const addData = addToDataLayer(createDataLayer(window))

export const track = (options = {}, overrides = {}) => {
  const { event = 'event' } = overrides
  const {
    category = null,
    action = null,
    label = null,
    value = null,
  } = options
  const payload = { category, action, label, value, event }
  return addData(payload)
}

export const exception = (err = {}, overrides = {}) => {
  const { event = 'exception' } = overrides
  const errorStack = err.stack
  const errorMessage = err.message
  const payload = { errorStack, errorMessage, event }
  console.error(err, 'Exception Logged')
  return addData(payload)
}

export const injectTracking = (id, doc) => {
  const now = new Date()
  addData({
    event: 'gtm.js',
    'gtm.start': now.getTime(),
  })
  const script = doc.createElement('script')
  const { body } = doc
  script.async = true
  script.src = `${GTM_JS}?id=${id}`
  body.appendChild(script)
}

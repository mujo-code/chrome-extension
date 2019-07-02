import { set } from '../lib/util'

const GTM_JS = 'https://www.googletagmanager.com/gtm.js'

export const createDataLayer = win => {
  const layer = 'dataLayer'
  const currentLayer = win[layer] || []
  set(win, layer, currentLayer)
  return win[layer]
}

export const addToDataLayer = dataLayer => payload =>
  dataLayer.push(payload)

export const addData = addToDataLayer(createDataLayer(window))

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
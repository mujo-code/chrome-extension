/* global dataLayer */
window.dataLayer = window.dataLayer || []

export function track(options = {}, overrides = {}) {
  const { event = 'event' } = overrides
  const {
    category = null,
    action = null,
    label = null,
    value = null,
  } = options
  const payload = { category, action, label, value, event }
  dataLayer.push(payload)
}

dataLayer.push('js', new Date())
dataLayer.push('config', 'UA-141601619-1')

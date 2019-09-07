import ua from 'universal-analytics'
import { promisifyNode } from '../lib/promisify'
import { set } from '../lib/util'

export const GTM_JS = 'https://www.googletagmanager.com/gtm.js'

// NOTE: this will be the gtm tracker
let tracker = null

export const track = (options = {}) => {
  const {
    category = null,
    action = null,
    label = null,
    value = null,
    event = 'event',
  } = options
  const payload = { ec: category, ea: action, el: label, ev: value }
  if (event === 'pageView') {
    return tracker.screenview('new tab page', 'Mujo Chrome Extension')
  }
  return tracker.event(payload)
}

export const initTracking = id => async userId => {
  tracker = ua(id, userId)
  // set promise interface for events
  set(tracker, 'event', promisifyNode(tracker.event.bind(tracker)))
  set(
    tracker,
    'screenview',
    promisifyNode(tracker.screenview.bind(tracker))
  )
  return userId
}

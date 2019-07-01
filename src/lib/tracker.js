import { TRACK } from '../constants'
import { message } from './extension'

export const track = (options = {}, overrides = {}) => {
  const { event = 'event' } = overrides
  const {
    category = null,
    action = null,
    label = null,
    value = null,
  } = options
  const payload = { category, action, label, value, event }
  return message(TRACK, { payload })
}

export const exception = (err, overrides = {}) => {
  const { event = 'exception' } = overrides
  const errorStack = err.stack
  const errorMessage = err.message
  const payload = { errorStack, errorMessage, event }
  return message(TRACK, { payload })
}

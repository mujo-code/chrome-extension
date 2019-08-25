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

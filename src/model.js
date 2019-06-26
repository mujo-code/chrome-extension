import {
  ALARM_DEFAULT_VALUE,
  ALARM_KEY,
  BREAK_TIMERS_KEY,
  PAGE_VIEWS_KEY,
  SHOW_TOP_SITES_KEY,
  SITE_TIME_KEY,
  TOP_SITES_KEY,
  TOP_SITES_USAGE_KEY,
} from './constants'

export default {
  [ALARM_KEY]: { type: Boolean, defaultValue: ALARM_DEFAULT_VALUE },
  [TOP_SITES_KEY]: { type: Object, defaultValue: [] },
  [TOP_SITES_USAGE_KEY]: { type: Object, defaultValue: [] },
  [PAGE_VIEWS_KEY]: { type: Number, defaultValue: 0 },
  [SHOW_TOP_SITES_KEY]: { type: Boolean, defaultValue: false },
  [SITE_TIME_KEY]: { type: Object, defaultValue: {} },
  [BREAK_TIMERS_KEY]: { type: Object, defaultValue: {} },
}

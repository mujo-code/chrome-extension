// Config values
export const MINUTE = 1000 * 60
export const FIVE_MINUTES = MINUTE * 5
export const FOURTY_FIVE_MINUTES = MINUTE * 45
export const HOUR = MINUTE * 60
export const THREE_HOURS = HOUR * 3
export const ALARM_DEFAULT_VALUE = true
export const MAX_BREAKTIMERS = 5
export const CURRENT_SUB_SKU = 'early_subscription'
export const APP_READY_KEY = '__mujo_ready__'

// ALARMS
export const ALARM_KEY = 'MINDFUL_ALARM' // also storage key
export const HEARTBEAT = 'HEARTBEAT'

// DB Keys
export const DATABASE_NAME = 'MUJO'
export const DATABASE_STORE = 'STATS'
export const DATABASE_VERSION = 1
export const LAST_ACTIVITY_TABLE = 'LAST_ACTIVITY'

// Storage keys
export const TOP_SITES_KEY = 'TOP_SITES'
export const TOP_SITES_USAGE_KEY = 'TOP_SITES_USAGE'
export const PAGE_VIEWS_KEY = 'PAGE_VIEWS'
export const SHOW_TOP_SITES_KEY = 'SHOW_TOP_SITES'
export const SITE_TIME_KEY = 'SITE_TIME'
export const BREAK_TIMERS_KEY = 'BREAK_TIMERS'
export const LAST_ACTIVE_KEY = 'LAST_ACTIVE_KEY'
export const ACTIVITY_NUMBER_KEY = 'ACTIVITY_NUMBER_KEY'

// Actions
export const NEW_TAB_CONNECTION = 'New Connection'
export const PAGE_VIEWING_TIME = 'Page Viewing Time'
export const DEEP_LINK_NEWTAB = 'Deep Link New Tab'
export const RESET_USAGE = 'Reset Usage Stats'
export const TRACK = 'Track'
export const ADD_BROADCAST_TAB = 'Add Broadcast Tab'
export const REMOVE_BROADCAST_TAB = 'Remove Broadcast Tab'
export const VALUE_CHANGED = 'Value changed'

// Getter, Setters for storage
export const GET_STORAGE = 'GET_STORAGE'
export const SET_STORAGE = 'SET_STORAGE'

// Feature Flags
export const SCREEN_TIME_FEATURE = true
export const BREAK_TIMER_FEATURE = true
export const SUBSCRIBE_FEATURE = false

// Upsell modals
export const MAX_BREAKTIMER_MODAL = 'breakTimerMax'
export const SUB_DETAILS_MODAL = 'subscriptionDetails'
export const SUB_SUCCESS_MODAL = 'subSuccess'

// OPTIONAL permissions requested
export const SCREEN_TIME_PERMISSIONS = {
  permissions: ['activeTab'],
  origins: ['https://*/*', 'http://*/*'],
}

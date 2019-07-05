import { SCREEN_TIME_PERMISSIONS } from '../constants'
import { tabs, permissions } from '../lib/extension'

const BLACK_LIST = ['about:blank', 'chrome']

export const injectScript = async tab => {
  const isBlackListed = BLACK_LIST.some(url =>
    tab.url.startsWith(url)
  )
  const isSubFrame = tab.transitionType === '"auto_subframe"'
  if (isBlackListed || isSubFrame) {
    return
  }
  const hasPermission = await permissions.contains(
    SCREEN_TIME_PERMISSIONS
  )
  if (!hasPermission) return
  tabs.executeScript(tab.tabId, { file: 'content.js' })
}

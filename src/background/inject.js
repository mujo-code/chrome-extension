import { tabs } from '../lib/extension'

const BLACK_LIST = ['about:blank', 'chrome']

export const injectScript = tab => {
  const isBlackListed = BLACK_LIST.some(url =>
    tab.url.startsWith(url)
  )
  const isSubFrame = tab.transitionType === '"auto_subframe"'
  if (isBlackListed || isSubFrame) {
    return
  }
  tabs.executeScript(tab.tabId, { file: 'content.js' })
}

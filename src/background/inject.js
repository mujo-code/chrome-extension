import { SCREEN_TIME_PERMISSIONS } from '../constants'
import { tabs, permissions } from '../lib/extension'

const BLACK_LIST = ['about:blank', 'chrome']
const MAP_PATTERN = /map/
const CONTENT_PATTERN = /content|vendor/

const getScripts = (assets, PATTERN) =>
  // TODO this needs to be ran post build
  Object.keys(assets.files)
    .filter(
      filename =>
        PATTERN.test(filename) && !MAP_PATTERN.test(filename)
    )
    .map(file => assets.files[file].replace('./', ''))

export const injectAll = tab => {
  const assets = window.mujo_assets || []
  const scripts = getScripts(assets, CONTENT_PATTERN)
  if (scripts.length) {
    scripts.forEach(script => {
      tabs.executeScript(tab.tabId, { file: script })
    })
  }
}

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
  injectAll(tab)
}

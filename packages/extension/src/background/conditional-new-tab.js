import { Extension } from '@mujo/utils'
import { NEW_TAB, CONDITIONAL_NEW_TAB_PAGE_KEY } from '../constants'
import { storage } from './storage'

const { tabs, runtime } = Extension

export const onConditionalNewTab = async tab => {
  const isEnabled = await storage.get(CONDITIONAL_NEW_TAB_PAGE_KEY)
  if (tab.url === NEW_TAB) {
    // I am checking for undefined for the first time only
    if (isEnabled || isEnabled === undefined) {
      tabs.update(
        tab.id,
        { url: runtime.getURL('../index.html') },
        () => {}
      )
    }
  }
}

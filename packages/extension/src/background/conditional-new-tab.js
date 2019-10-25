import { Extension } from '@mujo/utils'
import { NEW_TAB, CONDITIONAL_NEW_TAB_PAGE_KEY } from '../constants'
import { storage } from './storage'

const { tabs, extension } = Extension

export const onConditionalNewTab = async tab => {
  const isEnabled = await storage.get(CONDITIONAL_NEW_TAB_PAGE_KEY)
  if (tab.url === NEW_TAB && isEnabled) {
    tabs.update(
      tab.id,
      { url: extension.getURL('../index.html') },
      () => {}
    )
  }
}

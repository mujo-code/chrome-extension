import { Extension } from '@mujo/utils'
import { NEW_TAB } from '../constants'

const { storage, tabs, extension } = Extension

export const onConditionalNewTab = tab => {
  if (tab.url === NEW_TAB) {
    storage.sync.get({ shouldReplaceNewTab: false }, items => {
      if (items.shouldReplaceNewTab) {
        onTabUpdate(
          tab.id,
          { url: extension.getURL('../index.html') },
          () => {}
        )
      }
    })
  }
}

export const onTabUpdate = (id, updateProperties, callback) =>
  tabs.update(id, updateProperties, callback)

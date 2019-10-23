import { Extension } from '@mujo/utils'
import { NEW_TAB } from '../constants'
import { onConditionalNewTab } from './conditional-new-tab'

const { storage } = Extension

test('conditional new tab', async () => {
  onConditionalNewTab(NEW_TAB)

  expect(storage.sync.get).toBeCalled()
})

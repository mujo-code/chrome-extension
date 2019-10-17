/* eslint-disable import-order-alphabetical/order */
import { Extension } from '@mujo/utils'
import { onBrowserAction } from './browser-action'

const { tabs } = Extension

beforeEach(() => {
  Extension.runtime.getURL = jest.fn()
})

test('browser action', async () => {
  onBrowserAction()

  expect(tabs.create).toBeCalled()
})

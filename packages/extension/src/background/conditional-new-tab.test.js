import { Extension } from '@mujo/utils'
import { NEW_TAB } from '../constants'
import { onConditionalNewTab } from './conditional-new-tab'
import { storage } from './storage'

jest.mock('./storage')

const { tabs } = Extension

beforeEach(() => {
  storage.get = jest.fn()
  storage.set = jest.fn()
  tabs.update = jest.fn()
})

test('conditional new tab should update if settings is true', async () => {
  storage.get.mockResolvedValue(true)
  await onConditionalNewTab({ url: NEW_TAB })

  expect(tabs.update).toBeCalled()
})

test('conditional new tab should update if settings is undefined', async () => {
  storage.get.mockResolvedValue(undefined)
  await onConditionalNewTab({ url: NEW_TAB })

  expect(tabs.update).toBeCalled()
})

test('conditional new tab should not update if settings is false', async () => {
  storage.get.mockResolvedValue(false)
  await onConditionalNewTab({ url: NEW_TAB })

  expect(tabs.update).not.toBeCalled()
})

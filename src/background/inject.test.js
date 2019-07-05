import { SCREEN_TIME_PERMISSIONS } from '../constants'
import { tabs, permissions } from '../lib/extension'
import { injectScript } from './inject'

test('injectScript should not inject script a black list url', async () => {
  await injectScript({ url: 'chrome://newtab' })
  expect(tabs.executeScript).not.toBeCalled()
})

test('injectScript should not inject script a sub frame', async () => {
  await injectScript({
    url: 'https://foo',
    transitionType: '"auto_subframe"',
  })
  expect(tabs.executeScript).not.toBeCalled()
})

test('injectScript should not inject script if no permissions', async () => {
  permissions.contains.mockResolvedValueOnce(false)
  await injectScript({ url: 'https://foo' })
  expect(permissions.contains).toBeCalledWith(SCREEN_TIME_PERMISSIONS)
  expect(tabs.executeScript).not.toBeCalled()
})

test('injectScript should inject script if there is permissions', async () => {
  const file = { file: 'content.js' }
  permissions.contains.mockResolvedValueOnce(true)
  await injectScript({ url: 'https://foo', tabId: 'foo' })
  expect(permissions.contains).toBeCalledWith(SCREEN_TIME_PERMISSIONS)
  expect(tabs.executeScript).toBeCalledWith('foo', file)
})

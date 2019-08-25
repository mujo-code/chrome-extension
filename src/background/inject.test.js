import { SCREEN_TIME_PERMISSIONS } from '../constants'
import { tabs, permissions } from '../lib/extension'
import { injectScript, getScripts } from './inject'

test('getScripts should filter vendor or content scripts', async () => {
  const manifest = {
    files: {
      'content.js': './content.js',
      'vendor.js': './vendor.js',
      'foo.js': 'foo.js',
    },
  }
  expect(getScripts(manifest)).toEqual(['content.js', 'vendor.js'])
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
  window.mujo_assets = { files: { 'content.js': 'content.js' } }
  permissions.contains.mockResolvedValueOnce(true)
  await injectScript({ url: 'https://foo', tabId: 'foo' })
  expect(permissions.contains).toBeCalledWith(SCREEN_TIME_PERMISSIONS)
  expect(tabs.executeScript).toBeCalledWith('foo', file)
})

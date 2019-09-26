import { Extension, Url } from '@mujo/utils'
import React from 'react'
import { act, create } from 'react-test-renderer'
import { BREAK_TIMERS_KEY, SITE_TIME_KEY } from '../../constants'
import { PluginProvider } from '../plugin-provider'
import ContentApp from '.'

const { origin } = Url
const CONTAINER_ID = 'mujo-extension'
const SHORT_URL = origin(window.location.href)

beforeEach(() => {
  Extension.getStorage = jest.fn().mockImplementation(async () => {})
  const el = document.createElement('div')
  el.id = CONTAINER_ID
  document.body.appendChild(el)
})

afterEach(() => {
  const el = document.getElementById(CONTAINER_ID)
  if (el) {
    el.remove()
  }
})

test('ContentApp should match snapshot', () => {
  const tree = create(
    <PluginProvider env="content">
      <ContentApp />
    </PluginProvider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
describe('Async ContentApp', () => {
  // TODO: fix this error with async stuff
  test.skip('ContentApp should match snapshot', async () => {
    const timer = { enabled: true, time: 1 }
    const results = {
      [BREAK_TIMERS_KEY]: { [SHORT_URL]: timer },
      [SITE_TIME_KEY]: { [SHORT_URL]: 2 },
    }
    const mockResults = async key => results[key]
    const storagePromise = new Promise(resolve => {
      Extension.getStorage
        .mockImplementationOnce(mockResults)
        .mockImplementationOnce(mockResults)
        .mockImplementationOnce(mockResults)
        .mockImplementationOnce(key => {
          resolve()
          return mockResults(key)
        })
    })

    let container

    act(() => {
      container = create(
        <PluginProvider env="content">
          <ContentApp />
        </PluginProvider>
      )
      container.update()
    })
    await storagePromise
    expect(container.toJSON()).toMatchSnapshot()
  })
})

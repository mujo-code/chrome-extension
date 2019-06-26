import React from 'react'
import { act, create } from 'react-test-renderer'
import { BREAK_TIMERS_KEY, SITE_TIME_KEY } from '../../constants'
import { getStorage } from '../../lib/extension'
import { origin } from '../../lib/url'
import ContentApp from '.'

const CONTAINER_ID = 'mujo-extension'
const URL = origin(window.location.href)

beforeEach(() => {
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
  const tree = create(<ContentApp />).toJSON()
  expect(tree).toMatchSnapshot()
})
describe('Async ContentApp', () => {
  beforeAll(() => {
    getStorage.mockReset()
  })
  afterAll(() => {
    getStorage.mockReset()
  })
  test('ContentApp should match snapshot', async () => {
    const timer = { enabled: true, time: 1 }
    const results = {
      [BREAK_TIMERS_KEY]: { [URL]: timer },
      [SITE_TIME_KEY]: { [URL]: 2 },
    }
    const mockResults = async key => results[key]
    const storagePromise = new Promise(resolve => {
      getStorage
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
      container = create(<ContentApp />)
    })
    await storagePromise
    expect(container.toJSON()).toMatchSnapshot()
  })
})

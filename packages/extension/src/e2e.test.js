import path from 'path'
import { AsyncHelpers } from '@mujo/utils'
import puppeteer from 'puppeteer'
import manifest from '../build/manifest.json'
import {
  SET_STORAGE,
  SITE_TIME_KEY,
  APP_READY_KEY,
} from './constants'

const { wait } = AsyncHelpers
const TEST_TIMEOUT = 20000 // extend test timeout sinces its E2E

let browser
let page
const BUILD_PATH = path.resolve(__dirname, '../build')

let extensionId = null

const getExtensionId = async () => {
  const dummyPage = await browser.newPage()
  await dummyPage.waitFor(2000) // arbitrary wait time.

  const targets = await browser.targets()
  const extensionTarget = targets.find(
    ({ _targetInfo }) =>
      _targetInfo.title === manifest.name &&
      _targetInfo.type === 'background_page'
  )
  const extensionUrl = extensionTarget._targetInfo.url || ''
  const [, , extensionID] = extensionUrl.split('/')
  return extensionID
}

beforeAll(async () => {
  browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    headless: false,
    args: [
      `--disable-extensions-except=${BUILD_PATH}`,
      `--load-extension=${BUILD_PATH}`,
      '--no-sandbox',
    ],
    defaultViewport: {
      width: 1280,
      height: 800,
    },
    slowMo: 100,
  })

  extensionId = await getExtensionId()
})

afterAll(async () => {
  if (browser) {
    await browser.close()
  }
})

beforeEach(async () => {
  page = await browser.newPage()
})

afterEach(async () => {
  if (page) {
    await page.close()
  }
})

const waitDOMLoaded = async () =>
  page.evaluate(
    readyKey =>
      new Promise(resolve => {
        if (window[readyKey]) {
          resolve()
          return
        }
        window[readyKey] = resolve
      }),
    APP_READY_KEY
  )

test(
  'newtab page should have a player',
  async () => {
    await page.goto(`chrome-extension://${extensionId}/index.html`)
    await waitDOMLoaded()
    const el = await page.$('[data-testid="breath-player"]')
    await wait(500)
    expect(el).not.toBe(null)
  },
  TEST_TIMEOUT
)

// TODO need a good indicator that deeplinking is working
test(
  'newtab page should be able to deeplink into a exercisee',
  async () => {
    await page.goto(
      `chrome-extension://${extensionId}/index.html?play=true`
    )
    await waitDOMLoaded()
    await wait(2000)
    const el = await page.$('[data-testid="breath-player--count"]')
    expect(el).not.toBe(null)

    const initialCount = await (await el.getProperty(
      'textContent'
    )).jsonValue()
    expect(initialCount.trim()).toBe('5')
  },
  TEST_TIMEOUT
)

const screenTimeMock = {
  'https://foo.com': 1000000,
  'https://www.bar.com': 200000,
  'https://qux.org': 65000,
}

// TODO: replace this test
test.skip(
  'newtab should display screen time chart',
  async () => {
    await page.goto('chrome://newtab')
    await waitDOMLoaded()
    await page.evaluate(
      async (event, key, value) => {
        await new Promise(resolve => {
          chrome.runtime.sendMessage(
            chrome.runtime.id,
            {
              event,
              key,
              value,
            },
            resolve
          )
        })
        return [window.chrome.runtime.id, event, key, value]
      },
      SET_STORAGE,
      SITE_TIME_KEY,
      screenTimeMock
    )
    await wait(500)
    const el = await page.$('[data-testid="graph"]')
    expect(el).not.toBe(null)
  },
  TEST_TIMEOUT
)

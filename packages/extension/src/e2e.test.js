import path from 'path'
import { AsyncHelpers } from '@mujo/utils'
import puppeteer from 'puppeteer'
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
    await page.goto('chrome://newtab')
    await waitDOMLoaded()
    const el = await page.$('[data-testid="player"]')
    await wait(500)
    expect(el).not.toBe(null)
  },
  TEST_TIMEOUT
)

const screenTimeMock = {
  'https://foo.com': 1000000,
  'https://www.bar.com': 200000,
  'https://qux.org': 65000,
}

test(
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

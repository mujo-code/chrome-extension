const path = require('path')
const { promisify } = require('util')
const mkdirp = require('mkdirp')
const puppeteer = require('puppeteer')

const mkdir = promisify(mkdirp)

let browser
let page
const BUILD_PATH = path.resolve(__dirname, '../build')
const ARTIFACTS_PATH = path.resolve(__dirname, '../artifacts')

const artifact = filename => path.resolve(ARTIFACTS_PATH, filename)

beforeAll(async () => {
  await mkdir(ARTIFACTS_PATH)
  browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${BUILD_PATH}`,
      `--load-extension=${BUILD_PATH}`,
    ],
  })
  page = await browser.newPage()
})

afterAll(async () => {
  await browser.close()
})

test('screenshot should be good', async () => {
  const newpage = await browser.newPage()
  await newpage.goto('chrome://newtab')
  await newpage.screenshot({ path: artifact('newtab-initial.png') })
  expect(true).toBe(true)
})

test('newtab page should have a player', async () => {
  await page.goto('chrome://newtab')
  const el = await page.$$('[data-testid="player"]')
  expect(el).not.toBe(null)
})

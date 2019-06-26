jest.mock('./src/lib/extension')

// this is just a little hack to silence a warning that we'll get until react
// fixes this: https://github.com/facebook/react/pull/14853
const originalError = console.error
const CONTAINER_ID = 'mujo-extension'

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
  const el = document.createElement('div')
  el.id = CONTAINER_ID
  document.body.appendChild(el)
})

afterAll(() => {
  console.error = originalError
  const el = document.getElementById(CONTAINER_ID)
  if (el) {
    el.remove()
  }
})

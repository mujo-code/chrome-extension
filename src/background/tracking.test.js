import * as Tracking from './tracking'

const { injectTracking, GTM_JS, exception } = Tracking

test('injectTracking should attempt to inject a script into the doc', () => {
  const el = {}
  const id = 'foo'
  const docMock = {
    body: { appendChild: jest.fn() },
    createElement: jest.fn().mockReturnValue(el),
  }
  injectTracking(id, docMock)
  expect(docMock.createElement).toBeCalledWith('script')
  expect(el.src).toBe(`${GTM_JS}?id=${id}`)
  expect(docMock.body.appendChild).toBeCalledWith(el)
})

// TODO would love to mock internal function call
test('exception should log a error to the console', () => {
  const error = new Error('foo')
  const spy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {})
  exception(error)
  expect(spy).toBeCalledWith(error, 'Exception Logged')
  spy.mockRestore()
})

import { injectTracking, GTM_JS } from './tracking'

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

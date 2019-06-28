import { origin, shortURL, queryParams } from './url'

test('origin should return the origin of a url', () => {
  expect(origin('https://foo.com/bar')).toBe('https://foo.com')
})

test('shortUrl should return the hostname of a url', () => {
  expect(shortURL('https://www.foo.com/bar')).toBe('www.foo.com')
})

test('queryParams should return an object of search params in url', () => {
  expect(
    queryParams('https://foo.com/bar?foo=bar&baz=q%C3%BCx')
  ).toEqual({
    foo: 'bar',
    baz: 'qüx',
  })
})

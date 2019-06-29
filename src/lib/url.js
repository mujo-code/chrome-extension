import punycode from 'punycode'

export const parse = url => new URL(url)
export const shortURL = url => punycode.toUnicode(parse(url).hostname)
export const origin = url => parse(url).origin

export const queryParams = url => {
  const { search = '?' } = parse(url)
  return search
    .slice(1)
    .split(/&/g)
    .map(keyvalue => {
      const [key, value] = keyvalue.split('=')
      return { [key]: decodeURIComponent(value) }
    })
    .reduce((accum, values) => {
      Object.assign(accum, values || {})
      return accum
    }, {})
}

export const parse = url => new URL(url)
export const shortURL = url =>
  parse(url)
    .hostname.split('.')
    .slice(-2)
    .join('.')

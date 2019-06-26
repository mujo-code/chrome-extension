export const parse = url => new URL(url)
export const shortURL = url => parse(url).hostname
export const origin = url => parse(url).origin

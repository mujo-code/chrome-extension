import { css } from 'glamor'

css.global('#mujo-extension *, .mujo-modal *', {
  fontFamily: "'IBM Plex Sans', sans-serif",
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
})

const medium = { fontWeight: 700 }

const extraLight = { fontWeight: 200 }

export const headerL = css(medium, {
  fontSize: 32,
  lineHeight: '40px',
})

export const headerS = css(medium, {
  fontSize: 16,
  lineHeight: '24px',
})

export const bodyXl = css(extraLight, {
  fontSize: 32,
  lineHeight: '40px',
})

export const bodyL = css(extraLight, {
  fontSize: 24,
  lineHeight: '32px',
})

export const bodyS = css(extraLight, {
  fontSize: 16,
  lineHeight: '24px',
})

export const fixedL = css(medium, {
  fontFamily: '"Monaco", monospace',
  fontSize: 24,
  lineHeight: '32px',
})

export const fixedS = css(medium, {
  fontFamily: '"Monaco", monospace',
  fontSize: 16,
  lineHeight: '24px',
})

export const underline = css({ textDecoration: 'underline' })

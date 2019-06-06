import { css } from 'glamor'

const medium = { fontWeight: 500 }

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

export const underline = css({ textDecoration: 'underline' })

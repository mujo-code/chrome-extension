import { generateStyle } from '@jcblw/box/dist/styles/helpers'
import { css } from 'glamor'

const colorNames = {
  outerSpace: '#353D42',
  saltBox: '#756577',
  mischka: '#EAE2EB',
}

const keys = Object.keys(colorNames)

const reduceBackgroundColor = generateStyle('backgroundColor', colorNames)
export const backgroundColor = keys.reduce(reduceBackgroundColor, {})
const reduceColor = generateStyle('color', colorNames)
export const color = keys.reduce(reduceColor, {})
const reduceFill = generateStyle('fill', colorNames)
export const fill = keys.reduce(reduceFill, {})

export const maxWidth = {
  '100%': css({ maxWidth: '100%' }),
  '300px': css({ maxWidth: '300px' }),
  '100px': css({ maxWidth: '100px' }),
}

export const textOverflow = {
  ellipsis: css({ textOverflow: 'ellipsis' }),
  clip: css({ textOverflow: 'clip' }),
  none: css({ textOverflow: 'none' }),
  fade: css({ textOverflow: 'none' }),
}

export const overflow = {
  hidden: css({ overflow: 'hidden' }),
  visible: css({ overflow: 'visible' }),
  scroll: css({ overflow: 'scroll' }),
}

export const position = {
  absolute: css({ position: 'absolute' }),
  relative: css({ position: 'relative' }),
  static: css({ position: 'static' }),
  sticky: css({ position: 'sticky' }),
}

export const display = { table: css({ display: 'table' }) }

export const borderRadius = { xs: css({ borderRadius: '4px' }) }

export const layer = {
  0: css({ zIndex: 0 }),
  1: css({ zIndex: 10 }),
  2: css({ zIndex: 100 }),
}

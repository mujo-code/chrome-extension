import { generateStyle } from '@jcblw/box/dist/styles/helpers'
import { css } from 'glamor'
import { colors } from './colors'

css.global('body, html', { margin: 0 })

const keys = Object.keys(colors)

const reduceBackgroundColor = generateStyle('backgroundColor', colors)
export const backgroundColor = keys.reduce(reduceBackgroundColor, {})
const reduceColor = generateStyle('color', colors)
export const color = keys.reduce(reduceColor, {})
const reduceFill = generateStyle('fill', colors)
export const fill = keys.reduce(reduceFill, {})
const reduceStroke = generateStyle('stroke', colors)
export const stroke = keys.reduce(reduceStroke, {})

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
  3: css({ zIndex: 1000 }),
}

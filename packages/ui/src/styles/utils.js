import { css } from '@emotion/core'
import { generateStyle } from '@mujo/box/dist/styles/helpers'
import { colors } from './colors'

const makeStyles = (key, values) => {
  const reducer = generateStyle(key, values)
  const keys = Object.keys(values)
  return keys.reduce(reducer, {})
}

const spacingValues = { zero: 0 }

// Spacing Addons
export const marginBottom = makeStyles('marginBottom', spacingValues)
export const marginTop = makeStyles('marginTop', spacingValues)
export const marginLeft = makeStyles('marginLeft', spacingValues)
export const marginRight = makeStyles('marginRight', spacingValues)
export const margin = makeStyles('margin', spacingValues)

// Colors
export const backgroundColor = makeStyles('backgroundColor', colors)
export const color = makeStyles('color', colors)
export const fill = makeStyles('fill', colors)
export const stroke = makeStyles('stroke', colors)
export const outlineColor = makeStyles('outlineColor', colors)

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

const sizes = {
  xs: '4px',
  s: '8px',
  m: '16px',
  l: '24px',
  xl: '32px',
  xxl: '48px',
  // overrides
  '100%': '100%',
  '100px': '100px',
  '250px': '250px',
  '300px': '300px',
  '500px': '500px',
  '600px': '600px',
}

export const width = makeStyles('width', sizes)
export const maxWidth = makeStyles('maxWidth', sizes)
export const minWidth = makeStyles('minWidth', sizes)
export const height = makeStyles('height', sizes)
export const maxHeight = makeStyles('maxHeight', sizes)
export const minHeight = makeStyles('minHeight', sizes)

export const borderRadius = makeStyles('borderRadius', sizes)
export const borderTopLeftRadius = makeStyles('borderTopLeftRadius', sizes)
export const borderBottomLeftRadius = makeStyles(
  'borderBottomLeftRadius',
  sizes
)
export const borderTopRightRadius = makeStyles('borderTopRightRadius', sizes)
export const borderBottomRightRadius = makeStyles(
  'borderBottomRightRadius',
  sizes
)

export const layer = {
  0: css({ zIndex: 0 }),
  1: css({ zIndex: 10 }),
  2: css({ zIndex: 100 }),
  3: css({ zIndex: 1000 }),
}

const flexValues = { flexEnd: 'flex-end', flexStart: 'flex-start' }
export const justifyContent = makeStyles('justifyContent', flexValues)
export const alignItems = makeStyles('alignItems', flexValues)
export const flexWrap = { wrap: css({ flexWrap: 'wrap' }) }

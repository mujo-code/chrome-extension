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

export const maxWidth = {
  '100%': css({ maxWidth: '100%' }),
  '500px': css({ maxWidth: '500px' }),
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

const radius = {
  xs: '4px',
  s: '8px',
  m: '16px',
  l: '24px',
}

// This might need to be revised
export const width = makeStyles('width', radius)
export const height = makeStyles('height', radius)

export const borderRadius = makeStyles('borderRadius', radius)
export const borderTopLeftRadius = makeStyles(
  'borderTopLeftRadius',
  radius
)
export const borderBottomLeftRadius = makeStyles(
  'borderBottomLeftRadius',
  radius
)
export const borderTopRightRadius = makeStyles(
  'borderTopRightRadius',
  radius
)
export const borderBottomRightRadius = makeStyles(
  'borderBottomRightRadius',
  radius
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

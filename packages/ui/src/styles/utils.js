import { makeStyles } from '@mujo/box'
import { colors } from './colors'

const spacingValues = {
  xxs: 4,
  xs: 8,
  s: 16,
  m: 24,
  l: 32,
  xl: 40,
  xxl: 56,
  none: 'none',
  zero: 0,
}
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

export const styleGuide = {
  // Spacing Addons
  marginBottom: makeStyles('marginBottom', spacingValues),
  marginTop: makeStyles('marginTop', spacingValues),
  marginLeft: makeStyles('marginLeft', spacingValues),
  marginRight: makeStyles('marginRight', spacingValues),
  margin: makeStyles('margin', spacingValues),
  paddingBottom: makeStyles('paddingBottom', spacingValues),
  paddingTop: makeStyles('paddingTop', spacingValues),
  paddingLeft: makeStyles('paddingLeft', spacingValues),
  paddingRight: makeStyles('paddingRight', spacingValues),
  padding: makeStyles('padding', spacingValues),

  // Colors
  backgroundColor: makeStyles('backgroundColor', colors),
  color: makeStyles('color', colors),
  fill: makeStyles('fill', colors),
  stroke: makeStyles('stroke', colors),
  outlineColor: makeStyles('outlineColor', colors),

  textOverflow: {
    ellipsis: { textOverflow: 'ellipsis' },
    clip: { textOverflow: 'clip' },
    none: { textOverflow: 'none' },
    fade: { textOverflow: 'none' },
  },

  overflow: {
    hidden: { overflow: 'hidden' },
    visible: { overflow: 'visible' },
    scroll: { overflow: 'scroll' },
  },

  position: {
    absolute: { position: 'absolute' },
    relative: { position: 'relative' },
    static: { position: 'static' },
    sticky: { position: 'sticky' },
  },
  display: {
    table: { display: 'table' },
    block: { display: 'block' },
    flex: { display: 'flex' },
    inlineBlock: { display: 'inlineBlock' },
    inlineFlex: { display: 'inlineFlex' },
  },

  width: makeStyles('width', sizes),
  maxWidth: makeStyles('maxWidth', sizes),
  height: makeStyles('height', sizes),
  maxHeight: makeStyles('maxHeight', sizes),

  borderRadius: makeStyles('borderRadius', sizes),
  borderTopLeftRadius: makeStyles('borderTopLeftRadius', sizes),
  borderBottomLeftRadius: makeStyles('borderBottomLeftRadius', sizes),
  borderTopRightRadius: makeStyles('borderTopRightRadius', sizes),
  borderBottomRightRadius: makeStyles('borderBottomRightRadius', sizes),

  layer: {
    0: { zIndex: 0 },
    1: { zIndex: 10 },
    2: { zIndex: 100 },
    3: { zIndex: 1000 },
  },
}

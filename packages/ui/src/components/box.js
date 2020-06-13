import { withBox, flexStyles } from '@mujo/box'
import { animated as A } from 'react-spring'
import { styleGuide } from '../styles'

export const Box = withBox({
  styleGuide: { ...styleGuide, ...flexStyles },
  defaultComponent: 'div',
})

export const Actor = withBox({
  styleGuide: { ...styleGuide, ...flexStyles },
  defaultComponent: A.div,
})

import { styleGuide } from '@jcblw/box'
import { propsToStyles } from '@jcblw/box/dist/lib/helpers'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import { cssToStyle } from '@jcblw/box/dist/styles/helpers'
import React from 'react'
import ReactModal from 'react-modal'
import { useTheme } from '../../hooks/use-theme'
import { colors, rgba } from '../../styles/colors'

ReactModal.setAppElement('#root')

const overlay = cssToStyle({
  position: 'fixed',
  zIndex: 10000,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const modelContent = cssToStyle({
  maxHeight: '90vh',
  overflow: 'scroll',
})

const getPropClasses = propsToStyles(styleGuide)
const getOverlayClass = color =>
  cssToStyle(overlay, {background: rgba(colors[color], 0.3),}).toString()
const getModalContent = ({ background, color }) =>
  cssToStyle(
    {
      background: colors[background],
      color: colors[color],
    },
    modelContent
  ).toString()

export const Modal = props => {
  const theme = useTheme()
  const { css } = props
  const results = getPropClasses(
    Object.assign({}, props, cssToStyle(css))
  )
  const otherProps = removeKeys(
    props,
    ...results.used,
    'Component',
    'getStyles'
  )
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      className={`${results.styles.join(' ')} ${getModalContent({
        background: theme.background,
        color: theme.foreground,
      })}`}
      overlayClassName={getOverlayClass(theme.backgroundSecondary)}
      {...otherProps}
    />
  )
}

Modal.defaultProps = {
  padding: 'm',
  borderRadius: 's',
}

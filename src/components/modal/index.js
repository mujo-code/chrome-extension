import { styleGuide } from '@jcblw/box'
import { propsToStyles } from '@jcblw/box/dist/lib/helpers'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import { cssToStyle } from '@jcblw/box/dist/styles/helpers'
import { css as glamor } from 'glamor'
import React from 'react'
import ReactModal from 'react-modal'
import { useTheme } from '../../hooks/use-theme'
import { rgba, getColor } from '../../styles/colors'
import { Close } from './close'

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

const modelContent = modalMaxHeight =>
  cssToStyle({
    maxHeight: modalMaxHeight,
    overflow: 'scroll',
    position: 'relative',
  })

const getPropClasses = propsToStyles(styleGuide)
const toString = fn => (...args) => `${fn(...args)}`
const getOverlayClass = toString(c =>
  glamor({ backgroundColor: rgba(c, 0.3) }, overlay)
)
const getModalContent = toString(
  ({ background, color, modalMaxHeight }) =>
    glamor(
      {
        background: getColor(background),
        color: getColor(color),
      },
      modelContent(modalMaxHeight)
    )
)

export const Modal = props => {
  ReactModal.setAppElement('#mujo-extension')
  const theme = useTheme()
  const { css, modalMaxHeight } = props
  const results = getPropClasses(
    Object.assign({}, props, cssToStyle(css))
  )
  const otherProps = removeKeys(
    props,
    ...results.used,
    'Component',
    'getStyles',
    'modalMaxHeight',
    'children'
  )
  return (
    <ReactModal
      data-mujo
      shouldCloseOnOverlayClick={true}
      className={`${results.styles.join(' ')} ${getModalContent({
        background: theme.background,
        color: theme.foreground,
        modalMaxHeight,
      })}`}
      overlayClassName={`mujo-modal ${getOverlayClass(
        theme.backgroundSecondary
      )}`}
      {...otherProps}
    >
      <Close
        position="absolute"
        css={{ top: 24, right: 24 }}
        fill={theme.foreground}
        onClick={props.onRequestClose}
      />
      {props.children}
    </ReactModal>
  )
}

Modal.defaultProps = {
  padding: 'm',
  borderRadius: 's',
  modalMaxHeight: '90vh',
}

import { styleGuide } from '@jcblw/box'
import { propsToStyles } from '@jcblw/box/dist/lib/helpers'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import { css } from 'glamor'
import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { useTheme } from '../../hooks/use-theme'
import { wait } from '../../lib/async-helpers'
import { noop } from '../../lib/functional'
import { colors, rgba } from '../../styles/colors'

ReactModal.setAppElement('#root')

const overlay = css({
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

const modelContent = css({
  maxHeight: '90vh',
  overflow: 'scroll',
  transitions: 'all 1s',
})

const modelContentClose = css({
  transform: 'scale(1.2)',
  opacity: 0,
})

const modelContentOpen = css({
  transform: 'scale(1)',
  opacity: 1,
})

const getPropClasses = propsToStyles(styleGuide)
const getOverlayClass = color =>
  css(overlay, { background: rgba(colors[color], 0.3) }).toString()
const getModalContent = ({ background, color }, afterOpen) =>
  `${
    afterOpen
      ? modelContentOpen.toString()
      : modelContentClose.toString()
  }  ${css(
    {
      background: colors[background],
      color: colors[color],
    },
    modelContent
  )}`.trim()

export const Modal = props => {
  const theme = useTheme()
  const results = getPropClasses(props)
  const [afterOpen, setAfterOpen] = useState(false)
  const { onAfterOpen, onRequestClose } = props
  const otherProps = removeKeys(
    props,
    ...results.used,
    'Component',
    'getStyles',
    'onAfterOpen',
    'onRequestClose'
  )
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={true}
      className={`${results.styles.join(' ')} ${getModalContent(
        {
          background: theme.background,
          color: theme.foreground,
        },
        afterOpen
      )}`}
      overlayClassName={getOverlayClass(theme.backgroundSecondary)}
      onAfterOpen={async (...args) => {
        onAfterOpen(...args)
        await wait(100)
        setAfterOpen(true)
      }}
      onRequestClose={(...args) => {
        onRequestClose(...args)
        setAfterOpen(false)
      }}
      {...otherProps}
    />
  )
}

Modal.defaultProps = {
  padding: 'm',
  borderRadius: 's',
  onAfterOpen: noop,
  onRequestClose: noop,
}

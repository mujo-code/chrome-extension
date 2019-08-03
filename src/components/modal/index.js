import { css as emotion, ClassNames } from '@emotion/core'
import { styleGuide } from '@mujo/box'
import { propsToStyles } from '@mujo/box/dist/lib/helpers'
import { removeKeys } from '@mujo/box/dist/lib/remove-keys'
import { cssToStyle } from '@mujo/box/dist/styles/helpers'
import React from 'react'
import ReactModal from 'react-modal'
import { useTheme } from '../../hooks/use-theme'
import { rgba, getColor } from '../../styles/colors'
import { Icon } from '../Icon'

const overlay = emotion({
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
  emotion({
    maxHeight: modalMaxHeight,
    overflow: 'scroll',
    position: 'relative',
  })

const getPropClasses = propsToStyles(styleGuide)
const getOverlayClass = c =>
  emotion({ backgroundColor: rgba(c, 0.3) }, overlay)

const getModalContent = ({ background, color, modalMaxHeight }) =>
  emotion(
    {
      background: getColor(background),
      color: getColor(color),
      transition: 'all 0.3s',
      opacity: 0,
      transform: 'scale(0.7)',
      '&.ReactModal__Content--after-open': {
        opacity: 1,
        transform: 'scale(1)',
      },
      '&.ReactModal__Content--before-close': {
        opacity: 0,
        transform: 'scale(0.7)',
      },
    },
    modelContent(modalMaxHeight)
  )

export const Modal = props => {
  ReactModal.setAppElement('#mujo-extension')
  const theme = useTheme()
  const { css: addedCSS, modalMaxHeight, zIndex = '1000' } = props
  const customStyles = cssToStyle(addedCSS)
  const results = getPropClasses(Object.assign({}, props))
  if (customStyles) {
    results.styles.push(customStyles)
  }
  const otherProps = removeKeys(
    props,
    ...results.used,
    'Component',
    'getStyles',
    'modalMaxHeight',
    'children',
    'css',
    'closeColor',
    'color',
    'background',
    'zIndex'
  )
  return (
    <ClassNames>
      {({ css }) => (
        <ReactModal
          data-mujo
          closeTimeoutMS={200}
          shouldCloseOnOverlayClick={true}
          portalClassName={css(
            emotion({
              position: 'relative',
              zIndex,
            })
          )}
          className={css([
            ...results.styles,
            getModalContent({
              background: props.background || theme.background,
              color: props.color || theme.foreground,
              modalMaxHeight,
            }),
          ])}
          overlayClassName={`mujo-modal ${css(
            getOverlayClass(theme.backgroundSecondary)
          )}`}
          {...otherProps}
        >
          <Icon
            icon="close"
            size="l"
            position="absolute"
            css={{ top: 24, right: 24 }}
            color={props.closeColor || theme.foreground}
            onClick={props.onRequestClose}
          />
          {props.children}
        </ReactModal>
      )}
    </ClassNames>
  )
}

Modal.defaultProps = {
  padding: 'm',
  borderRadius: 's',
  modalMaxHeight: '90vh',
}

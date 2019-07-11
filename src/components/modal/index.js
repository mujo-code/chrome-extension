import { css as emotion, ClassNames } from '@emotion/core'
import { styleGuide } from '@jcblw/box'
import { propsToStyles } from '@jcblw/box/dist/lib/helpers'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import { cssToStyle } from '@jcblw/box/dist/styles/helpers'
import React from 'react'
import ReactModal from 'react-modal'
import { useTheme } from '../../hooks/use-theme'
import { rgba, getColor } from '../../styles/colors'
import { Close } from './close'

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
    },
    modelContent(modalMaxHeight)
  )

export const Modal = props => {
  ReactModal.setAppElement('#mujo-extension')
  const theme = useTheme()
  const { css: addedCSS, modalMaxHeight } = props
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
    'css'
  )
  return (
    <ClassNames>
      {({ css }) => (
        <ReactModal
          data-mujo
          shouldCloseOnOverlayClick={true}
          className={css([
            ...results.styles,
            getModalContent({
              background: theme.background,
              color: theme.foreground,
              modalMaxHeight,
            }),
            otherProps.css,
          ])}
          overlayClassName={`mujo-modal ${css(
            getOverlayClass(theme.backgroundSecondary)
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
      )}
    </ClassNames>
  )
}

Modal.defaultProps = {
  padding: 'm',
  borderRadius: 's',
  modalMaxHeight: '90vh',
}

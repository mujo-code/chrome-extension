import { Box } from '@jcblw/box'
import React from 'react'
import { useTheme } from '../../hooks/use-theme'
import { Button } from '../button'
import { HeaderL, BodyL } from '../fonts'
import { Modal } from '../modal'
import { getModalData } from './modal-data'

export const UpsellModal = ({ isOpen, onRequestClose, context }) => {
  const { highlight } = useTheme()
  const { title, description, button } = getModalData(context)
  return (
    <Modal
      display="flex"
      direction="column"
      outlineColor={highlight}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      padding="zero"
      css={{
        width: '35vw',
        height: '60vh',
        maxWidth: '35vw',
        maxHeight: '60vh',
      }}
    >
      <Box padding="l" flex="1" overflow="scroll">
        {title && <HeaderL>{title}</HeaderL>}
        {description && Array.isArray(description) ? (
          description.map((paragraph, i) => (
            <BodyL key={`paragraph-${i}`}>{paragraph}</BodyL>
          ))
        ) : (
          <BodyL>{description}</BodyL>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent="flexEnd"
        flex="0"
        paddingBottom="m"
        paddingRight="l"
      >
        {button && (
          <Button design={button.design || 'secondary'} {...button} />
        )}
      </Box>
    </Modal>
  )
}

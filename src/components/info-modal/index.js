import { Box } from '@mujo/box'
import React from 'react'
import { useSubscription } from '../../hooks/use-subscription'
import { useTheme } from '../../hooks/use-theme'
import { Button } from '../button'
import { HeaderL } from '../fonts'
import { Modal } from '../modal'
import { Description } from './description'
import { getModalData } from './modal-data'

export const InfoModal = ({
  isOpen,
  onRequestClose,
  context,
  changeModal,
}) => {
  const { highlight, backgroundSecondary } = useTheme()
  const subDetails = useSubscription()
  const { title, description, button } = getModalData(
    context,
    subDetails,
    { changeModal }
  )
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
      {title && (
        <Box
          paddingLeft="l"
          paddingRight="l"
          paddingTop="l"
          paddingBottom="m"
          flex="0"
        >
          <HeaderL margin="zero">{title}</HeaderL>
        </Box>
      )}
      <Box
        paddingBottom="zero"
        paddingTop={title ? 'zero' : 'l'}
        paddingLeft="l"
        paddingRight="l"
        flex="1"
        overflow="scroll"
      >
        {description && (
          <Description hasTitle={!!title}>{description}</Description>
        )}
      </Box>
      {button && (
        <Box
          flex="0"
          display="flex"
          direction="row"
          paddingLeft="m"
          paddingRight="m"
          paddingTop="s"
          paddingBottom="s"
          justifyContent="flexEnd"
          backgroundColor={backgroundSecondary}
        >
          <Button design={button.design || 'secondary'} {...button} />
        </Box>
      )}
    </Modal>
  )
}

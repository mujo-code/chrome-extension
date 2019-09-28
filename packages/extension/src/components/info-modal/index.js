import { Box } from '@mujo/box'
import { useTheme, Button, HeaderL, Modal } from '@mujo/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_FILE } from '../../constants'
import { useSubscription } from '../../hooks/use-subscription'
import { Description } from './description'
import { getModalData } from './modal-data'

export const InfoModal = ({
  isOpen,
  onRequestClose,
  context = {},
  changeModal,
  settings,
}) => {
  const theme = useTheme()
  const { t } = useTranslation(TRANSLATION_FILE)
  const { highlight, backgroundSecondary } = theme
  const subDetails = useSubscription()
  const { title, description, button, children } = getModalData(
    context,
    subDetails,
    { changeModal, settings, theme, t }
  )
  return (
    <Modal
      zIndex="10000"
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
        {children}
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

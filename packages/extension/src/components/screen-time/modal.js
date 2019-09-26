import { Box } from '@mujo/box'
import { HeaderS } from '@mujo/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_FILE } from '../../constants'
import { Modal as BaseModal } from '../modal'
import { InfoModal } from './info-modal'
import { ListModal } from './list-modal'
import { reduceSelectedSegment } from './reducer'

const ModalContent = ({ selectedSegment, allSegments, props }) => (
  <>
    {selectedSegment.urls.length > 1 ? (
      <ListModal {...props} />
    ) : (
      <InfoModal
        {...props}
        segment={reduceSelectedSegment(selectedSegment, allSegments)}
      />
    )}
  </>
)

export const Modal = props => {
  const {
    theme: { highlight, foreground },
    setSelectedSegment,
    selectedSegment,
    allSegments,
  } = props
  const { t } = useTranslation(TRANSLATION_FILE)
  return (
    <BaseModal
      display="flex"
      direction="column"
      outlineColor={highlight}
      isOpen={!!selectedSegment}
      padding="zero"
      onRequestClose={() => setSelectedSegment(null)}
      css={{
        width: '35vw',
        height: '60vh',
        maxWidth: '35vw',
        maxHeight: '60vh',
        transition: 'all .5s',
      }}
    >
      <Box
        flex="0"
        paddingBottom="s"
        paddingTop="m"
        paddingLeft="m"
        paddingRight="m"
      >
        <HeaderS
          marginBottom="zero"
          marginTop="zero"
          color={foreground}
        >
          {t('screen-time-for')}
        </HeaderS>
      </Box>
      <Box
        flex="1"
        overflow="scroll"
        display="flex"
        direction="column"
      >
        {selectedSegment ? (
          <ModalContent
            selectedSegment={selectedSegment}
            allSegments={allSegments}
            props={props}
          />
        ) : null}
      </Box>
    </BaseModal>
  )
}

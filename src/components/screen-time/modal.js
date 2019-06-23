import { Box } from '@jcblw/box'
import React from 'react'
import { HeaderS } from '../fonts'
import { Modal as BaseModal } from '../modal'
import { InfoModal } from './info-modal'
import { ListModal } from './list-modal'
import { reduceSelectedSegment } from './reducer'

export const Modal = props => {
  const {
    theme: { highlight, foreground },
    setSelectedSegment,
    selectedSegment,
    allSegments,
  } = props
  return (
    <BaseModal
      display="flex"
      direction="column"
      outlineColor={highlight}
      isOpen={true}
      padding="zero"
      paddingTop="m"
      paddingLeft="m"
      paddingRight="m"
      paddingBottom="zero"
      onRequestClose={() => setSelectedSegment(null)}
      css={{
        width: '35vw',
        height: '60vh',
        maxWidth: '35vw',
        maxHeight: '60vh',
        transition: 'all .5s',
      }}
    >
      <Box flex="0" paddingBottom="s">
        <HeaderS
          marginBottom="zero"
          marginTop="zero"
          color={foreground}
        >
          Screen Time for:
        </HeaderS>
      </Box>
      <Box
        flex="1"
        overflow="scroll"
        display="flex"
        direction="column"
      >
        {Object.keys(selectedSegment.originalData).length > 1 ? (
          <ListModal {...props} />
        ) : (
          <InfoModal
            {...props}
            segment={reduceSelectedSegment(
              selectedSegment,
              allSegments
            )}
          />
        )}
      </Box>
    </BaseModal>
  )
}

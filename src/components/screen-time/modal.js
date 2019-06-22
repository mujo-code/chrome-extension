import React from 'react'
import { Modal as BaseModal } from '../modal'
import { InfoModal } from './info-modal'
import { ListModal } from './list-modal'
import { reduceSelectedSegment } from './reducer'

export const Modal = props => {
  const {
    theme: { highlight },
    setSelectedSegment,
    selectedSegment,
    allSegments,
  } = props
  return (
    <BaseModal
      display="flex"
      direction="column"
      minWidth="300px"
      paddingTop="s"
      outlineColor={highlight}
      isOpen={true}
      onRequestClose={() => setSelectedSegment(null)}
      css={{ width: '35vw', maxWidth: '35vw' }}
      data-null={console.log(selectedSegment)}
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
    </BaseModal>
  )
}

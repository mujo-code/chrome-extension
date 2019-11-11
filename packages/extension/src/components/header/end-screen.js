import React, { useEffect } from 'react'
import { DEFAULT_END_SCREEN } from '../../constants'
import { useExtension } from '../../hooks/use-extension'

export const EndScreen = ({ close, index, type }) => {
  const { lookupEndScreen } = useExtension()
  const endScreenResult = lookupEndScreen(type || DEFAULT_END_SCREEN)

  useEffect(() => {
    if (!endScreenResult) {
      close()
    }
  }, [close, endScreenResult])

  return endScreenResult ? (
    <endScreenResult.Component close={close} />
  ) : null
}

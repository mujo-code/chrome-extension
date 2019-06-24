import { styleGuide } from '@jcblw/box'
import React, { useState } from 'react'
import { useTheme } from '../../hooks/use-theme'
import { shortURL } from '../../lib/url'
import * as utilStyles from '../../styles/utils'
import { BodyL } from '../fonts'
import { Modal } from '../modal'
import { Player } from '../player'
import { Time } from '../time'

styleGuide.push(utilStyles)

const ContentApp = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { foreground } = useTheme()
  // TODO this is mock data
  const label = shortURL(window.location.href)
  const time = 23432.3
  const percent = 41
  return (
    <Modal isOpen css={{ minWidth: '30vw' }} textAlign="center">
      <Player
        isOpen={isOpen}
        width={64}
        height={64}
        onFinish={() => {
          setIsOpen(false)
        }}
        onClick={() => {
          setIsOpen(true)
        }}
      />
      <BodyL
        marginTop="s"
        marginBottom="s"
        css={{ maxWidth: '30vw' }}
      >
        The site {label} was actively viewed for{' '}
        <Time Component="span" color={foreground}>
          {time}
        </Time>{' '}
        since your last break. That is {percent}% of your web viewing.
      </BodyL>
    </Modal>
  )
}

export default ContentApp

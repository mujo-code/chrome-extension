import { styleGuide } from '@jcblw/box'
import React, { useState } from 'react'
import { BREAK_TIMERS_KEY, SITE_TIME_KEY } from '../../constants'
import { useStorage } from '../../hooks/use-storage'
import { useTheme } from '../../hooks/use-theme'
import { shortURL, origin } from '../../lib/url'
import * as utilStyles from '../../styles/utils'
import { BodyL } from '../fonts'
import { Modal } from '../modal'
import { Player } from '../player'
import { Time } from '../time'
import { shouldDisplayModal } from './util'

styleGuide.push(utilStyles)

const ContentApp = () => {
  const url = window.location.href
  const originURL = origin(url)
  const [isPlayerOpen, setPlayerIsOpen] = useState(false)
  const [isModalOpen, setModalIsOpen] = useState(true)
  const [breakTimers] = useStorage(BREAK_TIMERS_KEY)
  const [siteTimes] = useStorage(SITE_TIME_KEY)
  const breakTimer = breakTimers[originURL]
  const time = siteTimes[originURL]
  const label = shortURL(url)
  const { foreground } = useTheme()
  const shouldShow = shouldDisplayModal(breakTimer, time)

  return (
    <Modal
      isOpen={shouldShow && isModalOpen}
      css={{ minWidth: '30vw' }}
      textAlign="center"
      onRequestClose={() => setModalIsOpen(false)}
    >
      <Player
        isOpen={isPlayerOpen}
        width={64}
        height={64}
        onFinish={() => {
          setPlayerIsOpen(false)
        }}
        onClick={() => {
          setPlayerIsOpen(true)
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
        since your last break.
      </BodyL>
    </Modal>
  )
}

export default ContentApp

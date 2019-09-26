import { styleGuide, Box } from '@mujo/box'
import { useStorage } from '@mujo/plugins'
import { AsyncHelpers, Extension, Url } from '@mujo/utils'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BREAK_TIMERS_KEY,
  SITE_TIME_KEY,
  DEEP_LINK_NEWTAB,
  RESET_USAGE,
  TRANSLATION_FILE,
} from '../../constants'
import { useTheme } from '../../hooks/use-theme'
import * as utilStyles from '../../styles/utils'
import { Button } from '../button'
import { BodyL } from '../fonts'
import { Modal } from '../modal'
import { Player } from '../player'
import { Time } from '../time'
import { shouldDisplayModal } from './util'

import '../../i18n'

const { defer } = AsyncHelpers
const { message } = Extension
const { shortURL, origin } = Url

styleGuide.push(utilStyles)

const ContentApp = () => {
  const url = window.location.href
  const originURL = origin(url)
  const { t } = useTranslation(TRANSLATION_FILE)
  const [isPlayerOpen, setPlayerIsOpen] = useState(false)
  const [isModalOpen, setModalIsOpen] = useState(true)
  const [breakTimers] = useStorage(BREAK_TIMERS_KEY)
  const [siteTimes] = useStorage(SITE_TIME_KEY)
  const breakTimer = breakTimers[originURL] || {}
  const time = siteTimes[originURL]
  const label = shortURL(url)
  const { foreground } = useTheme()
  const shouldShow = shouldDisplayModal(breakTimer, time)

  return (
    <Modal
      isOpen={shouldShow && isModalOpen}
      modalMaxHeight="100vh"
      textAlign="center"
      padding="zero"
      onRequestClose={() => setModalIsOpen(false)}
    >
      <Player
        circleRatio={0.5}
        isOpen={isPlayerOpen}
        width={240}
        height={240}
        onFinish={() => {
          setPlayerIsOpen(false)
          defer(setModalIsOpen, 700, false)
          defer(message, 800, RESET_USAGE)
        }}
        onClick={() => {
          setPlayerIsOpen(true)
        }}
        label={t('take-a-break')}
      />
      <Box css={{ maxWidth: '40vw', minWidth: '300px' }}>
        <BodyL
          marginTop="l"
          marginBottom="l"
          paddingLeft="xl"
          paddingRight="xl"
          textAlign="left"
        >
          {t('actively-viewed-for', { site: label })}{' '}
          <Time Component="span" color={foreground}>
            {time}
          </Time>{' '}
          {t('since-last-break')}
        </BodyL>
        <Button
          onClick={() => message(DEEP_LINK_NEWTAB)}
          design="secondary"
          marginBottom="m"
        >
          {t('edit-site-timer')}
        </Button>
      </Box>
    </Modal>
  )
}

export default ContentApp

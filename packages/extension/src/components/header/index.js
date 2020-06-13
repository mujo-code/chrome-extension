import { Icon, ToolTip, useTheme, BreathPlayer, Box } from '@mujo/ui'
import { Tracker } from '@mujo/utils'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SETTINGS_MODAL, TRANSLATION_FILE } from '../../constants'
import { EndScreen } from './end-screen'

const { track } = Tracker
export const Header = ({
  playerIsOpen,
  logoSize,
  resetUsage,
  setPlayerIsOpen,
  activityNumber,
  setUpsellModal,
  breathAmount,
}) => {
  const [toolTipOpen, setToolTipOpen] = useState(false)
  const { t } = useTranslation(TRANSLATION_FILE)
  const theme = useTheme()
  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={0}
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      position="relative"
      layer="2"
    >
      <Icon
        position="absolute"
        css={{
          transition: 'all 0.3s ease-in-out',
          transform: `translate(24px, ${playerIsOpen ? -32 : 24}px)`,
          top: 0,
          left: 0,
        }}
        icon="menu"
        color={theme.foreground}
        size="l"
        cursor="pointer"
        onClick={() => setUpsellModal({ name: SETTINGS_MODAL })}
      />
      <Box
        css={{
          transition: 'transform 1s ease-in-out',
          transform: `translateY(${playerIsOpen ? '0px' : '24px'})`,
        }}
      >
        <BreathPlayer
          isOpen={playerIsOpen}
          width={logoSize}
          height={logoSize}
          breathAmount={breathAmount}
          breatheInText={t('breathe-in')}
          breatheOutText={t('breathe-out')}
          onFinish={() => {
            setPlayerIsOpen(false)
            resetUsage()
            track({
              category: 'break',
              action: 'finish',
            })
          }}
          onClick={() => {
            setPlayerIsOpen(true)
            track({
              category: 'break',
              action: 'start',
            })
          }}
          onMouseEnter={() => setToolTipOpen(true)}
          onMouseLeave={() => setToolTipOpen(false)}
          EndCard={EndScreen}
        />
      </Box>
      <ToolTip
        offset={24}
        isOpen={toolTipOpen && !playerIsOpen}
        below
      >
        {t('take-a-break')}
      </ToolTip>
    </Box>
  )
}

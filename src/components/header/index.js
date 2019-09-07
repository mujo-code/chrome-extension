import { Box } from '@mujo/box'
import React, { useState } from 'react'
import { SETTINGS_MODAL } from '../../constants'
import { useTheme } from '../../hooks/use-theme'
import { track } from '../../lib/tracker'
import { Icon } from '../icon'
import { Player } from '../player'
import { ToolTip } from '../tool-tip'

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
  const theme = useTheme()
  return (
    <Box
      display="flex"
      direction="column"
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
      <Player
        isOpen={playerIsOpen}
        width={logoSize}
        height={logoSize}
        breathAmount={breathAmount}
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
      />
      <ToolTip isOpen={toolTipOpen && !playerIsOpen} below>
        Take a break!
      </ToolTip>
    </Box>
  )
}

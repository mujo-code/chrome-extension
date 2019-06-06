import { Box, styleGuide } from '@jcblw/box'
import { css } from 'glamor'
import React, { useState } from 'react'
import { Button } from './components/button'
import { FavRows } from './components/fav-rows'
import { HeaderS } from './components/fonts'
import { Player } from './components/player'
import { ToolTip } from './components/tool-tip'
import { useAppState } from './hooks/use-app-state'
import * as utilStyles from './styles/utils'

styleGuide.push(utilStyles)

const bgStyles = css({
  background: 'radial-gradient(ellipse at center, #fff 0%,#c8c0ca 100%)',
  height: '100vh',
})

const siteWrapper = css({
  transition: 'all 0.5s ease-in 0.2s',
  opacity: 0,
  transform: 'scale(0.9)',
  ':not(:empty)': {
    opacity: 1,
    transform: 'scale(1)',
  },
})

const DEFAULT_SIZE = 40
const factor = x => x * 8
const factorMin = size => Math.max(size, DEFAULT_SIZE)
const getFactor = x => factorMin(factor(x))

const Mujō = () => {
  const [
    { alarmEnabled, topSites, pageViews },
    { setAlarmEnabled, updateSitesUsed, resetUsage },
  ] = useAppState()
  const [isOpen, setIsOpen] = useState(false)
  const [toolTipOpen, setToolTipOpen] = useState(false)

  const logoSize = getFactor(pageViews)

  const onAlarmToggle = () => {
    const enabled = !alarmEnabled
    setAlarmEnabled(enabled)
  }
  return (
    <Box color="white" display="flex" direction="column" {...bgStyles}>
      <Box
        display="flex"
        direction="column"
        flex={0}
        alignItems="center"
        textAlign="center"
        justifyContent="center"
        position="relative"
        onMouseEnter={() => setToolTipOpen(true)}
        onMouseLeave={() => setToolTipOpen(false)}
      >
        <Player
          isOpen={isOpen}
          width={logoSize}
          height={logoSize}
          onFinish={() => {
            setIsOpen(false)
            resetUsage()
          }}
          onClick={() => {
            setIsOpen(true)
          }}
        />
        <ToolTip isOpen={toolTipOpen} below>
          Take a break!
        </ToolTip>
      </Box>
      <Box
        display="flex"
        flex={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        {...siteWrapper}
      >
        <HeaderS>Top Sites</HeaderS>
        {topSites.length ? (
          <FavRows items={topSites} updateSitesUsed={updateSitesUsed} />
        ) : null}
      </Box>
      <Box
        display="flex"
        flex={0}
        paddingTop="m"
        alignItems="center"
        textAlign="center"
        justifyContent="center"
      >
        <Box flex={0} direction="row">
          <Button
            whiteSpace="nowrap"
            style="tertiary"
            onClick={onAlarmToggle}
            alt="Reminders are notifications that remind you to take a break"
            marginBottom="m"
          >
            Turn reminders {alarmEnabled ? 'off' : 'on'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Mujō

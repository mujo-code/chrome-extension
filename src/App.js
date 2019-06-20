import { Box, styleGuide } from '@jcblw/box'
import { css } from 'glamor'
import React, { useState } from 'react'
import { Button } from './components/button'
import { Player } from './components/player'
import { ScreenTime } from './components/screen-time'
import { ToolTip } from './components/tool-tip'
import { TopSites } from './components/top-sites'
import { useAppState } from './hooks/use-app-state'
import * as utilStyles from './styles/utils'
import { track } from './tracker'

styleGuide.push(utilStyles)

const lightGradient =
  'radial-gradient(ellipse at center, #fff 0%,#EAE2EB 100%)'
css.global('body', { background: lightGradient })

const appWrapper = css({ height: '100vh' })

const DEFAULT_SIZE = 40
const factor = x => x * 8
const factorMin = size => Math.max(size, DEFAULT_SIZE)
const getFactor = x => factorMin(factor(x))

const Mujō = () => {
  const [
    { alarmEnabled, topSites, pageViews, showTopSites, siteTimes },
    {
      setAlarmEnabled,
      updateSitesUsed,
      resetUsage,
      updateShowTopSites,
    },
  ] = useAppState()
  const [isOpen, setIsOpen] = useState(false)
  const [toolTipOpen, setToolTipOpen] = useState(false)

  const logoSize = getFactor(pageViews)
  const toggleHandle = (fn, value) => () => fn(!value)

  return (
    <Box
      color="white"
      display="flex"
      direction="column"
      position="relative"
      {...appWrapper}
    >
      <Box
        display="flex"
        direction="column"
        flex={0}
        alignItems="center"
        textAlign="center"
        justifyContent="center"
        position="relative"
        layer="2"
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
            track('event', 'finish', { event_category: 'player' })
          }}
          onClick={() => {
            setIsOpen(true)
          }}
        />
        <ToolTip isOpen={toolTipOpen && !isOpen} below>
          Take a break!
        </ToolTip>
      </Box>
      <Box flex="1" />
      {showTopSites ? (
        <TopSites
          topSites={topSites}
          updateSitesUsed={updateSitesUsed}
        />
      ) : (
        <ScreenTime data={siteTimes} />
      )}
      <Box flex="1" />
      <Box
        display="flex"
        flex={0}
        paddingTop="m"
        alignItems="center"
        textAlign="center"
        justifyContent="center"
        layer="3"
        position="relative"
      >
        <Box flex={0} display="flex" direction="row" marginBottom="m">
          <Button
            whiteSpace="nowrap"
            style="tertiary"
            onClick={toggleHandle(setAlarmEnabled, alarmEnabled)}
            alt="Reminders are notifications that remind you to take a break"
            marginRight="m"
          >
            Turn reminders {alarmEnabled ? 'off' : 'on'}
          </Button>
          <Button
            whiteSpace="nowrap"
            style="tertiary"
            onClick={toggleHandle(updateShowTopSites, showTopSites)}
            alt="Toggle the view of the top sites section of this extension"
          >
            {showTopSites ? 'Show screen time' : 'Show top sites'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Mujō

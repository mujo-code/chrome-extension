import { Box, styleGuide } from '@jcblw/box'
import { css } from 'glamor'
import React, { useState } from 'react'
import { Button } from './components/button'
import { Player } from './components/player'
import { ScreenTime } from './components/screen-time'
import { ToolTip } from './components/tool-tip'
import { TopSites } from './components/top-sites'
import { SCREEN_TIME_FEATURE } from './constants'
import { useExtension } from './hooks/use-extension'
import { useTheme } from './hooks/use-theme'
import { colors } from './styles/colors'
import * as utilStyles from './styles/utils'
import { track } from './tracker'

styleGuide.push(utilStyles)
css.global('body, html', { margin: 0 })

const bodyBackgrounds = {
  outerSpace: `radial-gradient(ellipse at center, ${
    colors.gravel
  } 0%,${colors.outerSpace} 100%)`,
  mischka: `radial-gradient(ellipse at center, ${colors.white} 0%,${
    colors.mischka
  } 100%)`,
}

const appWrapper = css({ height: '100vh' })

const DEFAULT_SIZE = 40
const factor = x => x * 8
const factorMin = size => Math.max(size, DEFAULT_SIZE)
const getFactor = x => factorMin(factor(x))

const REMINDER_ALT = 'Notifications that remind you to take a break'

const App = () => {
  const [
    {
      alarmEnabled,
      topSites,
      pageViews,
      showTopSites,
      siteTimesAndTimers,
      appReady,
      selectedSegment,
      playerIsOpen,
    },
    {
      setAlarmEnabled,
      updateSitesUsed,
      resetUsage,
      updateShowTopSites,
      setBreakTimer,
      setSelectedSegment,
      setPlayerIsOpen,
    },
  ] = useExtension()
  const theme = useTheme()
  const [toolTipOpen, setToolTipOpen] = useState(false)

  const logoSize = getFactor(pageViews)
  const toggleHandle = (fn, value) => () => fn(!value)

  css.global('body', {
    background:
      bodyBackgrounds[theme.background] || bodyBackgrounds.outerSpace,
  })

  return (
    <Box
      color={theme.foreground}
      display="flex"
      direction="column"
      position="relative"
      {...appWrapper}
    >
      {appReady ? (
        <>
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
              isOpen={playerIsOpen}
              width={logoSize}
              height={logoSize}
              onFinish={() => {
                setPlayerIsOpen(false)
                resetUsage()
                track('event', 'finish', { event_category: 'player' })
              }}
              onClick={() => setPlayerIsOpen(true)}
            />
            <ToolTip isOpen={toolTipOpen && !playerIsOpen} below>
              Take a break!
            </ToolTip>
          </Box>
          <Box flex="1" />
          {!SCREEN_TIME_FEATURE || showTopSites ? (
            <TopSites
              topSites={topSites}
              updateSitesUsed={updateSitesUsed}
            />
          ) : (
            <ScreenTime
              data={siteTimesAndTimers}
              setBreakTimer={setBreakTimer}
              selectedSegment={selectedSegment}
              setSelectedSegment={setSelectedSegment}
            />
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
            <Box
              flex={0}
              display="flex"
              direction="row"
              marginBottom="m"
            >
              <Button
                whiteSpace="nowrap"
                design={theme.buttonStyle}
                onClick={toggleHandle(setAlarmEnabled, alarmEnabled)}
                alt={REMINDER_ALT}
                marginRight={SCREEN_TIME_FEATURE ? 'm' : 'zero'}
              >
                Turn reminders {alarmEnabled ? 'off' : 'on'}
              </Button>
              {SCREEN_TIME_FEATURE && (
                <Button
                  whiteSpace="nowrap"
                  design={theme.buttonStyle}
                  onClick={toggleHandle(
                    updateShowTopSites,
                    showTopSites
                  )}
                  alt="Toggle view between screen time and top sites"
                >
                  {showTopSites
                    ? 'Show screen time'
                    : 'Show top sites'}
                </Button>
              )}
            </Box>
          </Box>
        </>
      ) : null}
    </Box>
  )
}

export default App

import { css, Global } from '@emotion/core'
import { Box, styleGuide } from '@jcblw/box'
import React, { useState } from 'react'
import { Button } from './components/button'
import { Span, Sup } from './components/fonts'
import { Player } from './components/player'
import { ScreenTime } from './components/screen-time'
import { ToolTip } from './components/tool-tip'
import { TopSites } from './components/top-sites'
import { SCREEN_TIME_FEATURE } from './constants'
import { useExtension } from './hooks/use-extension'
import { useTheme } from './hooks/use-theme'
import { track } from './lib/tracker'
import { colors } from './styles/colors'
import * as utilStyles from './styles/utils'

styleGuide.push(utilStyles)

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
const factor = x => x * 0.0025
const factorMin = size => Math.max(size, DEFAULT_SIZE)
const getFactor = x => factorMin(factor(x))

const REMINDER_ALT = 'Notifications that remind you to take a break'

const App = () => {
  const [
    {
      alarmEnabled,
      topSites,
      activityNumber,
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
  const { background } = theme
  const [toolTipOpen, setToolTipOpen] = useState(false)

  const logoSize = getFactor(activityNumber)
  const toggleHandle = (fn, value) => () => fn(!value)
  const bg = bodyBackgrounds[background] || bodyBackgrounds.outerSpace

  return (
    <Box
      color={theme.foreground}
      display="flex"
      direction="column"
      position="relative"
      {...appWrapper}
    >
      <Global
        styles={css`
          body,
          html {
            margin: 0;
          }
          body {
            background: ${bg};
          }
        `}
      />
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
                track({
                  category: 'break',
                  action: 'finish',
                  label: 'activity_number',
                  value: activityNumber,
                })
              }}
              onClick={() => {
                setPlayerIsOpen(true)
                track({
                  category: 'break',
                  action: 'start',
                  label: 'activity_number',
                  value: activityNumber,
                })
              }}
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
                  alt={
                    <Span>
                      Toggle view between Screen Time <Sup>BETA</Sup>{' '}
                      and top sites
                    </Span>
                  }
                >
                  {showTopSites
                    ? 'Show Screen Time'
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

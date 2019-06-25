import { Box, styleGuide } from '@jcblw/box'
import { css } from 'glamor'
import React, { useState } from 'react'
import { Button } from './components/button'
import { Player } from './components/player'
import { ScreenTime } from './components/screen-time'
import { ToolTip } from './components/tool-tip'
import { TopSites } from './components/top-sites'
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
      siteTimes,
      appReady,
    },
    {
      setAlarmEnabled,
      updateSitesUsed,
      resetUsage,
      updateShowTopSites,
    },
  ] = useExtension()
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false)
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
              dark
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
                marginRight="m"
              >
                Turn reminders {alarmEnabled ? 'off' : 'on'}
              </Button>
              <Button
                whiteSpace="nowrap"
                design={theme.buttonStyle}
                onClick={toggleHandle(
                  updateShowTopSites,
                  showTopSites
                )}
                alt="Toggle the view of the top sites section of this extension"
              >
                {showTopSites ? 'Show screen time' : 'Show top sites'}
              </Button>
            </Box>
          </Box>
        </>
      ) : null}
    </Box>
  )
}

export default App

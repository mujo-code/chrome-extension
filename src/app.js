import { css, Global } from '@emotion/core'
import { Box, styleGuide } from '@mujo/box'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './components/button'
import { Span, Sup } from './components/fonts'
import { Header } from './components/header'
import { InfoModal } from './components/info-modal'
import { ScreenTime } from './components/screen-time'
import { TopSites } from './components/top-sites'
import { SCREEN_TIME_FEATURE, TRANSLATION_FILE } from './constants'
import { useExtension } from './hooks/use-extension'
import { useTheme } from './hooks/use-theme'
import { getPlugins } from './plugins'
import { colors } from './styles/colors'
import * as utilStyles from './styles/utils'
import './i18n'

styleGuide.push(utilStyles)

const radialGradient = (centerColor, outerColor) => {
  const params = [
    'ellipse at center',
    `${centerColor} 0%`,
    `${outerColor}  100%`,
  ]
  return `radial-gradient(${params.join(', ')})`
}

const bodyBackgrounds = {
  outerSpace: radialGradient(colors.gravel, colors.outerSpace),
  mischka: radialGradient(colors.white, colors.mischka),
}

const appWrapper = css({ height: '100vh' })

const DEFAULT_SIZE = 40
const factor = x => x * 0.0025
const factorMin = size => Math.max(size, DEFAULT_SIZE)
const getFactor = x => factorMin(factor(x))

const App = () => {
  console.log(getPlugins())
  const {
    topSites,
    activityNumber,
    showTopSites,
    siteTimesAndTimers,
    appReady,
    selectedSegment,
    playerIsOpen,
    upsellModal,
    settings,
    screenTime,
    updateSitesUsed,
    resetUsage,
    updateShowTopSites,
    setBreakTimer,
    setSelectedSegment,
    setPlayerIsOpen,
    setUpsellModal,
    breathAmount,
  } = useExtension()
  const theme = useTheme()
  const { background } = theme
  const logoSize = getFactor(activityNumber)
  const toggleHandle = (fn, value) => () => fn(!value)
  const bg = bodyBackgrounds[background] || bodyBackgrounds.outerSpace
  const { t } = useTranslation(TRANSLATION_FILE)

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
          <Header
            breathAmount={breathAmount}
            playerIsOpen={playerIsOpen}
            logoSize={logoSize}
            resetUsage={resetUsage}
            setPlayerIsOpen={setPlayerIsOpen}
            activityNumber={activityNumber}
            setUpsellModal={setUpsellModal}
          />
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
              permissions={screenTime}
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
                    ? t('show-screen-time')
                    : t('show-top-sites')}
                </Button>
              )}
            </Box>
          </Box>
        </>
      ) : null}

      <InfoModal
        zIndex="1000"
        changeModal={setUpsellModal}
        context={upsellModal || undefined}
        isOpen={!!upsellModal}
        onRequestClose={() => {
          setUpsellModal(null)
        }}
        settings={settings}
      />
    </Box>
  )
}

export default App

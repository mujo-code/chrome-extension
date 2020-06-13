import { css, Global } from '@emotion/core'
import { IngressTarget } from '@mujo/ingress'
import { colors, useTheme, Box } from '@mujo/ui'
import React, { memo } from 'react'
import { Header } from './components/header'
import { InfoModal } from './components/info-modal'
import { Plugins } from './components/plugins'
import { Settings } from './components/settings'
import { Tabs } from './components/tabs'
import { TopSites } from './components/top-sites'
import { TABS_TARGET } from './constants'
import { useExtension } from './hooks/use-extension'
import './i18n'

const radialGradient = (centerColor, outerColor) => {
  const params = [
    'ellipse at center',
    `${centerColor} 0%`,
    `${outerColor}  100%`,
  ]
  return `radial-gradient(${params.join(', ')})`
}

const bodyBackgrounds = {
  dark: radialGradient(colors.black, colors.dark),
  light: radialGradient(colors.white, colors.light),
}
const DEFAULT_SIZE = 40
const factor = x => x * 0.0025
const factorMin = size => Math.max(size, DEFAULT_SIZE)
const getFactor = x => factorMin(factor(x))

const App = memo(() => {
  const {
    activityNumber,
    appReady,
    playerIsOpen,
    upsellModal,
    settings,
    resetUsage,
    setPlayerIsOpen,
    setUpsellModal,
    breathAmount,
  } = useExtension()
  const theme = useTheme()
  const { background } = theme
  const logoSize = getFactor(activityNumber)
  const bg = bodyBackgrounds[background] || bodyBackgrounds.outerSpace

  return (
    <Box
      color={theme.foreground}
      display="flex"
      flexDirection="column"
      position="relative"
      css={{ height: '100vh' }}
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
          <IngressTarget id={TABS_TARGET} />
          <Box flex="1" />
          <Box
            display="flex"
            flex={0}
            alignItems="center"
            textAlign="center"
            justifyContent="center"
            layer="3"
            position="relative"
          >
            <Box flex={0} display="flex" flexDirection="row">
              <Tabs />
            </Box>
          </Box>
        </>
      ) : null}
      <Settings>
        {/* Inside settings to keep ordering */}
        <TopSites />
        <Plugins />
      </Settings>
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
})

App.displayName = 'App'

export default App

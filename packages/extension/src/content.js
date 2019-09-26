import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/core'
import { Functional } from '@mujo/utils'
import React from 'react'
import ReactDOM from 'react-dom'
import { useColorScheme } from 'use-color-scheme'
import ContentApp from './components/content-app'
import { Font } from './components/fonts'
import { PluginProvider } from './components/plugin-provider'
import {
  onVisibilityChange,
  onViewingStart,
  onViewingEnd,
} from './content/timing'
import { ColorThemeProvider } from './hooks/use-theme'

const { compose } = Functional
const startTimer = () => {
  onViewingStart()
  window.document.addEventListener(
    'visibilitychange',
    onVisibilityChange,
    true
  )
  window.addEventListener('beforeunload', onViewingEnd)
}

const renderContentApp = () => {
  // React app in content script
  const id = 'mujo-extension'
  const el = document.createElement('div')
  // ensures we do not collide with other css
  const cache = createCache({ key: id })
  el.id = id

  document.body.appendChild(el)

  const App = () => {
    const { scheme } = useColorScheme()
    return (
      <CacheProvider value={cache}>
        <ColorThemeProvider value={scheme}>
          <PluginProvider env="content">
            <Font />
            <ContentApp />
          </PluginProvider>
        </ColorThemeProvider>
      </CacheProvider>
    )
  }

  ReactDOM.render(<App />, el)
}

const startContentScript = compose(
  renderContentApp,
  startTimer
)

if (!window.hasBeenInjected) {
  window.hasBeenInjected = true
  startContentScript()
}

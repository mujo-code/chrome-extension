import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/core'
import { Font, ColorThemeProvider } from '@mujo/ui'
import React from 'react'
import ReactDOM from 'react-dom'
import { useColorScheme } from 'use-color-scheme'
import { PluginProvider } from './components/plugin-provider'
import { Plugins } from './components/plugins'

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
            <Plugins />
          </PluginProvider>
        </ColorThemeProvider>
      </CacheProvider>
    )
  }

  ReactDOM.render(<App />, el)
}

if (!window.hasBeenInjected) {
  window.hasBeenInjected = true
  renderContentApp()
}

import React from 'react'
import ReactDOM from 'react-dom'
import { useColorScheme } from 'use-color-scheme'
import App from './app'
import { ErrorBox } from './components/error-box'
import { Font } from './components/fonts'
import { NTPPluginProvider } from './components/plugin-provider'
import { ExtensionProvider } from './hooks/use-extension'
import { SubscriptionProvider } from './hooks/use-subscription'
import { ColorThemeProvider } from './hooks/use-theme'

import './lib/tracker'

const NewHomePage = () => {
  const { scheme } = useColorScheme()
  return (
    <ErrorBox>
      <Font />
      <SubscriptionProvider>
        <ExtensionProvider shouldRegisterApp={true}>
          <NTPPluginProvider>
            <ColorThemeProvider value={scheme}>
              <App />
            </ColorThemeProvider>
          </NTPPluginProvider>
        </ExtensionProvider>
      </SubscriptionProvider>
    </ErrorBox>
  )
}

ReactDOM.render(
  <NewHomePage />,
  document.getElementById('mujo-extension')
)

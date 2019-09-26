import { Font, ColorThemeProvider } from '@mujo/ui'
import React from 'react'
import ReactDOM from 'react-dom'
import { useColorScheme } from 'use-color-scheme'
import App from './app'
import { ErrorBox } from './components/error-box'
import { PluginProvider } from './components/plugin-provider'
import { ExtensionProvider } from './hooks/use-extension'
import { SubscriptionProvider } from './hooks/use-subscription'

import '@mujo/utils'

const NewHomePage = () => {
  const { scheme } = useColorScheme()
  return (
    <ErrorBox>
      <Font />
      <SubscriptionProvider>
        <ExtensionProvider shouldRegisterApp={true}>
          <PluginProvider env="ntp">
            <ColorThemeProvider value={scheme}>
              <App />
            </ColorThemeProvider>
          </PluginProvider>
        </ExtensionProvider>
      </SubscriptionProvider>
    </ErrorBox>
  )
}

ReactDOM.render(
  <NewHomePage />,
  document.getElementById('mujo-extension')
)

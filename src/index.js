import React from 'react'
import ReactDOM from 'react-dom'
import { useColorScheme } from 'use-color-scheme'
import App from './app'
import { ErrorBox } from './components/error-box'
import { Font } from './components/fonts'
import { ColorThemeProvider } from './hooks/use-theme'

import './lib/tracker'

const NewHomePage = () => {
  const { scheme } = useColorScheme()
  return (
    <ErrorBox>
      <Font />
      <ColorThemeProvider value={scheme}>
        <App />
      </ColorThemeProvider>
    </ErrorBox>
  )
}

ReactDOM.render(
  <NewHomePage />,
  document.getElementById('mujo-extension')
)

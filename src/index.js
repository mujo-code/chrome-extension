import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { ErrorBox } from './components/error-box'
import { ColorThemeProvider } from './hooks/use-theme'

import './tracker'

const NewHomePage = () => (
  <ErrorBox>
    <ColorThemeProvider value="dark">
      <App />
    </ColorThemeProvider>
  </ErrorBox>
)

ReactDOM.render(
  <NewHomePage />,
  document.getElementById('mujo-extension')
)

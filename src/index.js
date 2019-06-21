import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ErrorBox } from './components/error-box'
import { ColorThemeProvider } from './hooks/use-theme'

import './tracker'

const Mujō = () => (
  <ErrorBox>
    <ColorThemeProvider value="dark">
      <App />
    </ColorThemeProvider>
  </ErrorBox>
)

ReactDOM.render(<Mujō />, document.getElementById('root'))

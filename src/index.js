import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ErrorBox } from './components/error-box'

import './tracker'

ReactDOM.render(
  <ErrorBox>
    <App />
  </ErrorBox>,
  document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import { ErrorBox } from './components/error-box'

ReactDOM.render(
  <ErrorBox>
    <App />
  </ErrorBox>,
  document.getElementById('root')
)

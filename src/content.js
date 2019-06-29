import React from 'react'
import ReactDOM from 'react-dom'
import { useColorScheme } from 'use-color-scheme'
import ContentApp from './components/content-app'
import { BREAK_TIMER_FEATURE } from './constants'
import {
  onVisibilityChange,
  onViewingStart,
  onViewingEnd,
} from './content/timing'
import { ColorThemeProvider } from './hooks/use-theme'

onViewingStart()
window.document.addEventListener(
  'visibilitychange',
  onVisibilityChange,
  true
)

window.addEventListener('beforeunload', onViewingEnd)

if (BREAK_TIMER_FEATURE) {
  // React app in content script
  const el = document.createElement('div')
  el.id = 'mujo-extension'

  document.body.appendChild(el)

  const App = () => {
    const { scheme } = useColorScheme()
    return (
      <ColorThemeProvider value={scheme}>
        <ContentApp />
      </ColorThemeProvider>
    )
  }

  ReactDOM.render(<App />, el)
}

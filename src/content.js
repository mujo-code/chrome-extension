import React from 'react'
import ReactDOM from 'react-dom'
import ContentApp from './components/content-app'

import {
  onVisibilityChange,
  onViewingStart,
  onViewingEnd,
} from './content/timing'

onViewingStart()
window.document.addEventListener(
  'visibilitychange',
  onVisibilityChange,
  true
)

window.addEventListener('beforeunload', onViewingEnd)

if (process.env.CONTENT_MODAL) {
  // React app in content script
  const el = document.createElement('div')
  el.id = 'mujo-extension'

  document.body.appendChild(el)

  ReactDOM.render(<ContentApp />, el)
}

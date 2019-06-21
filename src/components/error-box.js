import { Box } from '@jcblw/box'
import { css } from 'glamor'
import React from 'react'
import { track } from '../tracker'
import { HeaderL, HeaderS, BodyS } from './fonts'

const EXTENSION_ID = 'gdoejfdomlmojgepjgijhlmnndokminf'

const normalizePaths = stack => {
  const path = `chrome-extension://${EXTENSION_ID}`
  return stack.replace(new RegExp(path, 'gi'), '')
}

export class ErrorBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  /* eslint-disable-next-line */
  componentDidCatch(err) {
    track('event', 'exception', {
      description: err,
      fatal: false, // set to true if the error is fatal
    })
  }

  render() {
    const { hasError, error } = this.state
    if (hasError) {
      return (
        <Box
          position="fixed"
          backgroundColor="gravel"
          padding="l"
          {...css({
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
          })}
        >
          <HeaderL color="mischka">
            Just like everything, errors are impermanent
          </HeaderL>
          <HeaderS color="mischka">Try again later.</HeaderS>
          <BodyS Component="pre" color="white">
            <code>{normalizePaths(error.stack)}</code>
          </BodyS>
        </Box>
      )
    }

    return this.props.children
  }
}

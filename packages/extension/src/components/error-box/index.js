import { css } from '@emotion/core'
import { HeaderL, Box } from '@mujo/ui'
import ErrorStackParser from 'error-stack-parser'
import React from 'react'
import { ENVIRONMENT } from '../../env'
import { i18n } from '../../i18n'
import { tracker } from '../../lib/error-tracker'
import { Frames } from './frames'
import { Message } from './message'

export class ErrorBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    tracker.exceptionWithInfo(error, errorInfo).then(errorId => {
      this.setState({ error, errorId })
    })
  }

  render() {
    const { hasError, error, errorId } = this.state
    const isDev = ENVIRONMENT === 'development'
    let frames
    if (error && isDev) {
      try {
        frames = ErrorStackParser.parse(error)
      } catch (e) {
        // do nothing
      }
    }

    if (hasError) {
      return (
        <Box
          position="fixed"
          backgroundColor="outerSpace"
          padding="xl"
          {...css({
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: '100vh',
            width: '100vw',
          })}
        >
          <HeaderL
            maxWidth="500px"
            Component="div"
            color="saltBox"
            marginBottom="xl"
          >
            {i18n.t('errors-impermanent')}
          </HeaderL>
          {frames && isDev ? (
            <Frames frames={frames} error={error} />
          ) : (
            <Message errorId={errorId} />
          )}
        </Box>
      )
    }

    return <>{this.props.children}</>
  }
}

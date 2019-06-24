import { Box } from '@jcblw/box'
import ErrorStackParser from 'error-stack-parser'
import { css } from 'glamor'
import React from 'react'
import { mapStackTrace } from 'sourcemapped-stacktrace'
import { set } from '../lib/etters'
import { track } from '../tracker'
import { FixedS, FixedL } from './fonts'

const FN_SIZE = 25

const makeNiceFilenames = filename => filename.split('/').pop()
const makeNiceFunctionNames = fnName =>
  `at ${fnName}`.padStart(FN_SIZE, ' ')

const ErrorFrames = ({ frames, error }) => (
  <>
    <FixedL marginTop="xxs" marginBottom="xxs" color="white">
      {error.message}
    </FixedL>
    {frames.map((f, index) => (
      <Box
        marginTop="xxs"
        marginBottom="xxs"
        key={index}
        display="flex"
        direction="row"
      >
        <FixedS
          Component="pre"
          marginTop="zero"
          marginBottom="zero"
          marginRight="m"
          color="saltBox"
        >
          {makeNiceFunctionNames(f.functionName)}
        </FixedS>
        <FixedS marginTop="zero" marginBottom="zero" color="white">
          ({makeNiceFilenames(f.fileName)}:{f.lineNumber})
        </FixedS>
      </Box>
    ))}
  </>
)

export class ErrorBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error) {
    mapStackTrace(error.stack, stack => {
      set(error, 'stack', stack.join('\n'))
      this.setState({ error })
    })
    track('event', 'exception', {
      description: error,
      fatal: false, // set to true if the error is fatal
    })
  }

  render() {
    const { hasError, error } = this.state
    let frames
    if (error) {
      try {
        frames = ErrorStackParser.parse(error)
      } catch (e) {
        // do nothing
        console.log(e)
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
          <FixedL Component="div" color="saltBox" marginBottom="xl">
            Just like everything, errors are impermanent
          </FixedL>
          {frames && <ErrorFrames frames={frames} error={error} />}
        </Box>
      )
    }

    return this.props.children
  }
}

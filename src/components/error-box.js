import { Box } from '@jcblw/box'
import React from 'react'
import { HeaderS } from './fonts'

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
    gtag('event', 'exception', {
      description: err,
      fatal: false, // set to true if the error is fatal
    })
  }

  render() {
    const { hasError } = this.state
    if (hasError) {
      return (
        <Box
          backgroundColor="saltBox"
          maxWidth="300px"
          borderRadius="s"
          paddingLeft="s"
          paddingRight="s"
        >
          <HeaderS color="white">:| its broke</HeaderS>
        </Box>
      )
    }

    return this.props.children
  }
}

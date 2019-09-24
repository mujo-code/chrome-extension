import React from 'react'
import { tracker } from '../../lib/error-tracker'

export class PluginError extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    tracker.exceptionWithInfo(error, errorInfo).then(errorId => {
      this.setState({ error, errorId })
      console.error(error, errorId)
    })
  }

  render() {
    const { hasError } = this.state
    if (hasError) {
      return <></>
    }

    return <>{this.props.children}</>
  }
}

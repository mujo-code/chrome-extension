import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestRenderer from 'react-test-renderer'
import App from './app'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

it('should match the snapshot', async () => {
  const tree = ReactTestRenderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})

import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestRenderer from 'react-test-renderer'
import App from './app'
import { ExtensionProvider } from './hooks/use-extension'
import { SubscriptionProvider } from './hooks/use-subscription'

const Wrapper = ({ children }) => (
  <SubscriptionProvider>
    <ExtensionProvider>{children}</ExtensionProvider>
  </SubscriptionProvider>
)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Wrapper>
      <App />
    </Wrapper>,
    div
  )
})

it('should match the snapshot', async () => {
  const tree = ReactTestRenderer.create(
    <Wrapper>
      <App />
    </Wrapper>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

import React from 'react'
import { create, act } from 'react-test-renderer'
import { PluginError } from './plugin-error'

jest.mock('../../lib/error-tracker')
// eslint-disable-next-line import-order-alphabetical/order
const { tracker } = require('../../lib/error-tracker')

test('PluginError should match snapshot', () => {
  const tree = create(<PluginError>Foo</PluginError>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('PluginError should match when there is an error', () => {
  tracker.exceptionWithInfo.mockReset().mockResolvedValue('foo')
  console.error = jest.fn()
  const ErrorComponent = () => {
    throw new Error('foo')
  }
  const wrapper = create(
    <PluginError>
      <ErrorComponent />
    </PluginError>
  )
  act(() => {
    wrapper.update()
  })
  expect(wrapper.toJSON()).toMatchSnapshot()
})

test('PluginError should track errors', () => {
  tracker.exceptionWithInfo.mockReset().mockResolvedValue('foo')
  console.error = jest.fn()
  const ErrorComponent = () => {
    throw new Error('foo')
  }
  const wrapper = create(
    <PluginError>
      <ErrorComponent />
    </PluginError>
  )
  act(() => {
    wrapper.update()
  })
  expect(tracker.exceptionWithInfo).toBeCalled()
  expect(console.error).toBeCalled()
})

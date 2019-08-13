import React from 'react'
import { create, act } from 'react-test-renderer'
import { ErrorBox } from './error-box'

jest.mock('sourcemapped-stacktrace')

test('ErrorBox should match snapshot', () => {
  const tree = create(<ErrorBox />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ErrorBox should match when there is an error', () => {
  const ErrorComponent = () => {
    throw new Error('foo')
  }
  const wrapper = create(
    <ErrorBox>
      <ErrorComponent />
    </ErrorBox>
  )
  act(() => {
    wrapper.update()
  })
  expect(wrapper.toJSON()).toMatchSnapshot()
})

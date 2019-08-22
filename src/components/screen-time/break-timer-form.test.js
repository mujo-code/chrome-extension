import React from 'react'
import { create } from 'react-test-renderer'
import { minutesToMS } from '../../lib/time'
import { Input } from '../input'
import { BreakTimerForm } from './break-timer-form'

test('BreakTimerForm should match snapshot', () => {
  const tree = create(<BreakTimerForm />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('BreakTimerForm should match snapshot when enabled', () => {
  const tree = create(<BreakTimerForm enabled={true} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('BreakerTimerForm input should be positive', () => {
  const fn = jest.fn()
  const originalURL = 'foo'
  const enabled = true
  const wrapper = create(
    <BreakTimerForm
      originalURL={originalURL}
      setBreakTimer={fn}
      enabled={enabled}
    />
  )
  const { root } = wrapper
  const input = root.findByType(Input)

  input.props.onChange({ target: { value: -11 } })

  expect(fn).toBeCalledWith(originalURL, minutesToMS(11), enabled)
})

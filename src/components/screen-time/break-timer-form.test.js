import React from 'react'
import { create } from 'react-test-renderer'
import { BreakTimerForm } from './break-timer-form'

test('BreakTimerForm should match snapshot', () => {
  const tree = create(<BreakTimerForm />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('BreakTimerForm should match snapshot when enabled', () => {
  const tree = create(<BreakTimerForm enabled={true} />).toJSON()
  expect(tree).toMatchSnapshot()
})

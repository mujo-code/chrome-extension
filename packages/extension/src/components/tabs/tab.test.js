import React from 'react'
import { create } from 'react-test-renderer'
import { Tab } from './tab'

test('Tab component matches snapshot', () => {
  const tree = create(<Tab label="foo" />).toJSON()
  expect(tree).toMatchSnapshot()
})

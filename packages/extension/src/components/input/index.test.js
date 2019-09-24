import React from 'react'
import Renderer from 'react-test-renderer'
import { Input } from '.'

test('Input should match snapshot', () => {
  const tree = Renderer.create(<Input />).toJSON()
  expect(tree).toMatchSnapshot()
})

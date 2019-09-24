import React from 'react'
import { create } from 'react-test-renderer'
import { Plugins } from '.'

jest.mock('../../plugins')
// eslint-disable-next-line import-order-alphabetical/order
const { getPlugins } = require('../../plugins')

test('Tabs component matches snapshot', () => {
  console.error = jest.fn()
  getPlugins.mockReturnValue([
    function Foo() {
      return <>Foo</>
    },
    function Bar() {
      throw new Error('bar')
    },
  ])
  const tree = create(<Plugins />).toJSON()
  expect(tree).toMatchSnapshot()
})

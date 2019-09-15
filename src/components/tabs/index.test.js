import React from 'react'
import { create } from 'react-test-renderer'
import { Tabs } from '.'

jest.mock('../../hooks/use-extension')
// eslint-disable-next-line import-order-alphabetical/order
const { useExtension } = require('../../hooks/use-extension')

test('Tabs component matches snapshot', () => {
  useExtension.mockReturnValue({ tabs: ['foo', 'bar'] })
  const tree = create(<Tabs />).toJSON()
  expect(tree).toMatchSnapshot()
})

import React from 'react'
import { create } from 'react-test-renderer'
import { ColorThemeProvider } from '../../hooks/use-theme'
import { Dots } from './dots'

jest.mock('./use-dot-animation')
// eslint-disable-next-line import-order-alphabetical/order
const { useDotAnimation } = require('./use-dot-animation')

test('Dots component matches snapshot', () => {
  const interpolate = fn => fn(1)
  useDotAnimation.mockImplementation(() => ({
    props: {
      scale: { interpolate },
      outerScale: { interpolate },
    },
  }))
  const tree = create(
    <ColorThemeProvider value="dark">
      <Dots>Foo</Dots>
    </ColorThemeProvider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

import React from 'react'
import { create } from 'react-test-renderer'
import { ColorThemeProvider } from '../../hooks/use-theme'
import { CenterText } from './center-text'

test('CenterText component matches snapshot', () => {
  const tree = create(
    <ColorThemeProvider value="dark">
      <CenterText>Foo</CenterText>
    </ColorThemeProvider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

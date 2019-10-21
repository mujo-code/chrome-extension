import React from 'react'
import { create } from 'react-test-renderer'
import { ColorThemeProvider } from '../../hooks/use-theme'
import { EndCardWrapper } from './end-card-wrapper'

test('EndCardWrapper component matches snapshot', () => {
  const tree = create(
    <ColorThemeProvider value="dark">
      <EndCardWrapper>Foo</EndCardWrapper>
    </ColorThemeProvider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

import { ColorThemeProvider } from '@mujo/ui'
import React from 'react'
import { create } from 'react-test-renderer'
import { PostSessionAffirmation } from './post-session-affirmation'

test('PostSessionAffirmation component matches snapshot', () => {
  const tree = create(
    <ColorThemeProvider>
      <PostSessionAffirmation index={0} />
    </ColorThemeProvider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

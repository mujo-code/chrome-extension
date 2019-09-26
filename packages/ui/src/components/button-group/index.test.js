import React from 'react'
import { create } from 'react-test-renderer'
import { Button } from '../button'
import { ButtonGroup } from '.'

test('ButtonGroup component matches snapshot', () => {
  const tree = create(
    <ButtonGroup>
      <Button>Foo</Button>
      <Button>Bar</Button>
    </ButtonGroup>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

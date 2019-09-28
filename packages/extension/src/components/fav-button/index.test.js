import React from 'react'
import { create } from 'react-test-renderer'
import { FavButton } from '.'

test('FavButton component matches snapshot', () => {
  const tree = create(
    <FavButton url="foo" title="bar" disable={false} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

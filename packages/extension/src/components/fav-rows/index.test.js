import React from 'react'
import { create } from 'react-test-renderer'
import { FavRows } from '.'

const items = [
  {
    title: 'foo',
    url: 'https://foo.com',
  },
  {
    title: 'bar',
    url: 'https://bar.com',
    isUsed: true,
  },
]

test('FavRows component matches snapshot', () => {
  const tree = create(<FavRows items={items} />).toJSON()
  expect(tree).toMatchSnapshot()
})

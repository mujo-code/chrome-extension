import React from 'react'
import { create } from 'react-test-renderer'
import { MAX_BREAKTIMER_MODAL } from '../../constants'
import { Button } from '../button'
import { HeaderL, BodyL } from '../fonts'
import { UpsellModal } from '.'

test('UpsellModal should match snapshot', () => {
  // Use break timer modal for snapshot
  const context = { name: MAX_BREAKTIMER_MODAL, url: 'foo' }
  const tree = create(
    <UpsellModal isOpen={true} context={context} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('UpsellModal should allow for custom contexts', () => {
  const context = { title: 'foo', description: ['bar'] }
  const { root } = create(
    <UpsellModal isOpen={true} context={context} />
  )
  expect(root.findByType(HeaderL).props.children).toBe('foo')
  expect(root.findByType(BodyL).props.children).toBe('bar')
})

test('UpsellModal should allow for clicks to buttons', done => {
  expect.assertions(2)
  const context = {
    button: {
      children: 'foo',
      onClick: () => {
        expect(true).toBe(true)
        done()
      },
    },
  }
  const { root } = create(
    <UpsellModal isOpen={true} context={context} />
  )
  const button = root.findByType(Button)
  button.props.onClick()
  expect(button.props.children).toBe('foo')
})

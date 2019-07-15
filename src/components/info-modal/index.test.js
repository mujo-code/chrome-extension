import React from 'react'
import { create } from 'react-test-renderer'
import { MAX_BREAKTIMER_MODAL } from '../../constants'
import { Button } from '../button'
import { HeaderL, BodyL } from '../fonts'
import { InfoModal } from '.'

test('InfoModal should match snapshot', () => {
  // Use break timer modal for snapshot
  const context = { name: MAX_BREAKTIMER_MODAL, url: 'foo' }
  const tree = create(
    <InfoModal isOpen={true} context={context} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('InfoModal should allow for custom contexts', () => {
  const context = { title: 'foo', description: ['bar'] }
  const { root } = create(
    <InfoModal isOpen={true} context={context} />
  )
  expect(root.findByType(HeaderL).props.children).toBe('foo')
  expect(root.findByType(BodyL).props.children).toBe('bar')
})

test('InfoModal should allow for clicks to buttons', done => {
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
    <InfoModal isOpen={true} context={context} />
  )
  const button = root.findByType(Button)
  button.props.onClick()
  expect(button.props.children).toBe('foo')
})

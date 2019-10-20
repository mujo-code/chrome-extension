import { Icon, BreathPlayer } from '@mujo/ui'
import React from 'react'
import { create } from 'react-test-renderer'
import { SETTINGS_MODAL } from '../../constants'
import { PluginProvider } from '../plugin-provider'
import { Header } from '.'

test('Header component matches snapshot', () => {
  const tree = create(
    <PluginProvider>
      <Header />
    </PluginProvider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Header component matches open snapshot', () => {
  const tree = create(
    <PluginProvider>
      <Header playerIsOpen={true} />
    </PluginProvider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Header should open settings modal when the Icon is clicked', () => {
  const fn = jest.fn()
  const wrapper = create(
    <PluginProvider>
      <Header setUpsellModal={fn} />
    </PluginProvider>
  )
  const { root } = wrapper
  const icon = root.findByType(Icon)

  // mock click on modal
  icon.props.onClick({ target: icon })
  expect(fn).toBeCalledWith({ name: SETTINGS_MODAL })
})

test('Header should open settings modal when the Icon is clicked', () => {
  const fn = jest.fn()
  const wrapper = create(
    <PluginProvider>
      <Header setUpsellModal={fn} />
    </PluginProvider>
  )
  const { root } = wrapper
  const icon = root.findByType(Icon)

  // mock click on modal
  icon.props.onClick({ target: icon })
  expect(fn).toBeCalledWith({ name: SETTINGS_MODAL })
})

test('Clicking the Header player should open it', () => {
  const fn = jest.fn()
  const wrapper = create(
    <PluginProvider>
      <Header setPlayerIsOpen={fn} />
    </PluginProvider>
  )
  const { root } = wrapper
  const player = root.findByType(BreathPlayer)

  // mock click on modal
  player.props.onClick({ target: player })
  expect(fn).toBeCalledWith(true)
})

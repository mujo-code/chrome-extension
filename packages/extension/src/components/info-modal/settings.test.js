import { Switch } from '@mujo/ui'
import React from 'react'
import { create } from 'react-test-renderer'
import { settingsModal, SettingItem, Boolean } from './settings'

test('settingsModal should return an object', () => {
  const settings = [{ label: 'foo' }]
  expect(
    settingsModal(null, null, { settings, theme: {} }).title
  ).toBe('Settings')
})

test('SettingsItem should match snapshot', () => {
  const tree = create(
    <SettingItem label="foo" alt="bar" theme={{}} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('SettingsItem boolean type should match snapshot', () => {
  const tree = create(
    <SettingItem
      type="boolean"
      label="foo"
      alt="bar"
      value="baz"
      theme={{}}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('SettingsItem button type should match snapshot', () => {
  const tree = create(
    <SettingItem
      type="button"
      label="foo"
      alt="bar"
      value="baz"
      theme={{}}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Boolean should unshell the value from switch on change', () => {
  const onChange = jest.fn()
  const eventMock = { target: { value: 'foo' } }
  const { root } = create(
    <Boolean value={true} onChange={onChange} />
  )
  const sw = root.findByType(Switch)
  sw.props.onChange(eventMock)
  expect(onChange).toBeCalledWith('foo')
})

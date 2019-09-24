import { render } from '@testing-library/react'
import React from 'react'
import { PluginProvider } from './plugin-provider'
import { Setting } from './setting'

describe('Setting component', () => {
  test('Setting should not add a tab if it not the ntp env', () => {
    const pushSetting = jest.fn()
    const removeSetting = jest.fn()
    const updateSetting = jest.fn()
    render(
      <PluginProvider
        env="background"
        settings={{ pushSetting, removeSetting, updateSetting }}
      >
        <Setting />
      </PluginProvider>
    )
    expect(pushSetting).not.toBeCalled()
    expect(removeSetting).not.toBeCalled()
    expect(updateSetting).not.toBeCalled()
  })

  test('Setting should add a tab if it not the ntp env', () => {
    const pushSetting = jest.fn()
    const removeSetting = jest.fn()
    const updateSetting = jest.fn()
    render(
      <PluginProvider
        env="ntp"
        settings={{ pushSetting, removeSetting, updateSetting }}
      >
        <Setting label="foo" alt="bar" />
      </PluginProvider>
    )
    expect(pushSetting).toBeCalledWith({ label: 'foo', alt: 'bar' })
    expect(removeSetting).toBeCalledWith({ label: 'foo' })
    expect(updateSetting).toBeCalledWith({ label: 'foo', alt: 'bar' })
  })
})

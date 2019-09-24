import React from 'react'
import { create } from 'react-test-renderer'
import { NewTabPage } from './new-tab-page'
import { PluginProvider } from './plugin-provider'

describe('NewTabPage component', () => {
  test('NewTabPage renders children when env is set to ntp', () => {
    const Foo = jest.fn().mockReturnValue(null)
    const { root } = create(
      <PluginProvider env="ntp">
        <NewTabPage>
          <Foo />
        </NewTabPage>
      </PluginProvider>
    )

    expect(root.findByType(Foo)).toBeTruthy()
  })

  test('NewTabPage does not render children when env is not ntp', () => {
    const Foo = jest.fn().mockReturnValue(null)
    const { root } = create(
      <PluginProvider env="background">
        <NewTabPage>
          <Foo />
        </NewTabPage>
      </PluginProvider>
    )

    expect(() => root.findByType(Foo)).toThrow()
  })
})

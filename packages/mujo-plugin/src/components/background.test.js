import React from 'react'
import { create } from 'react-test-renderer'
import { Background } from './background'
import { PluginProvider } from './plugin-provider'

describe('Background component', () => {
  test('Background renders children when env is set to background', () => {
    const Foo = jest.fn().mockReturnValue(null)
    const { root } = create(
      <PluginProvider env="background">
        <Background>
          <Foo />
        </Background>
      </PluginProvider>
    )

    expect(root.findByType(Foo)).toBeTruthy()
  })

  test('Background does not render children when env is not background', () => {
    const Foo = jest.fn().mockReturnValue(null)
    const { root } = create(
      <PluginProvider env="ntp">
        <Background>
          <Foo />
        </Background>
      </PluginProvider>
    )

    expect(() => root.findByType(Foo)).toThrow()
  })
})

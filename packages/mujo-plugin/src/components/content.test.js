import React from 'react'
import { create } from 'react-test-renderer'
import { Content } from './content'
import { PluginProvider } from './plugin-provider'

describe('Content component', () => {
  test('Content renders children when env is set to content', () => {
    const Foo = jest.fn().mockReturnValue(null)
    const { root } = create(
      <PluginProvider env="content">
        <Content>
          <Foo />
        </Content>
      </PluginProvider>
    )

    expect(root.findByType(Foo)).toBeTruthy()
  })

  test('Content does not render children when env is not content', () => {
    const Foo = jest.fn().mockReturnValue(null)
    const { root } = create(
      <PluginProvider env="background">
        <Content>
          <Foo />
        </Content>
      </PluginProvider>
    )

    expect(() => root.findByType(Foo)).toThrow()
  })
})

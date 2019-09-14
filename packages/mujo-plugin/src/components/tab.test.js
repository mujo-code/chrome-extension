import { render } from '@testing-library/react'
import React from 'react'
import { PluginProvider } from './plugin-provider'
import { Tab } from './tab'

jest.mock('@mujo/ingress')
// eslint-disable-next-line import-order-alphabetical/order
const { Ingress } = require('@mujo/ingress')

describe('Tab component', () => {
  test('Tab should not add a tab if it not the ntp env', () => {
    const pushTab = jest.fn()
    const removeTab = jest.fn()
    render(
      <PluginProvider env="background" tabs={{ pushTab }}>
        <Tab />
      </PluginProvider>
    )
    expect(pushTab).not.toBeCalled()
    expect(removeTab).not.toBeCalled()
  })

  test('Tab should add a tab if it not the ntp env', () => {
    const pushTab = jest.fn()
    const removeTab = jest.fn()
    const constants = { TABS_TARGET: 'foo' }
    render(
      <PluginProvider
        env="ntp"
        tabs={{ pushTab, removeTab, currentTab: 'foo' }}
        constants={constants}
      >
        <Tab name="bar" />
      </PluginProvider>
    )
    expect(pushTab).toBeCalled()
    expect(removeTab).toBeCalled()
  })

  test('Tab should render children if the currentTab', async () => {
    const pushTab = jest.fn()
    const removeTab = jest.fn()
    const constants = { TABS_TARGET: 'foo' }
    const Foo = jest.fn().mockReturnValue(<>Foo</>)
    Ingress.mockImplementation(({ children }) => <>{children}</>)
    const { findByText } = render(
      <PluginProvider
        env="ntp"
        tabs={{ pushTab, removeTab, currentTab: 'foo' }}
        constants={constants}
      >
        <Tab name="foo">
          <Foo />
        </Tab>
      </PluginProvider>
    )

    expect(findByText(/Foo/)).toBeTruthy()
  })
})

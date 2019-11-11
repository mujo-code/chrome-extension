import React from 'react'
import { create, act } from 'react-test-renderer'
import { EndScreen } from './end-screen'

jest.mock('../../hooks/use-extension')

const { useExtension } = require('../../hooks/use-extension')

test('EndScreen should call close if no endscreen is found', async () => {
  const extension = { lookupEndScreen: jest.fn() }
  const close = jest.fn()
  useExtension.mockReturnValue(extension)

  const wrapper = create(<EndScreen close={close} type="foo" />)

  await act(async () => {
    wrapper.update()
  })

  expect(close).toBeCalled()
})

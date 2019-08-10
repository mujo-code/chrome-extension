import 'fake-indexeddb/auto'

import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })

jest.mock('./src/lib/extension')

beforeEach(() => {
  jest.resetAllMocks()
})

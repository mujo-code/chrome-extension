import 'fake-indexeddb/auto'
import './src/i18n'

jest.mock('./src/lib/extension')

beforeEach(() => {
  jest.resetAllMocks()
})

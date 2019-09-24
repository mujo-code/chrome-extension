import 'fake-indexeddb/auto'
import './src/i18n'
import { alarms, notifications } from './src/lib/__mocks__/extension'

window.chrome = {
  alarms,
  notifications,
}

jest.mock('./src/lib/extension')

beforeEach(() => {
  jest.resetAllMocks()
})

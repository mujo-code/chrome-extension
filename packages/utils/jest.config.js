const base = require('../../config/jest.base.js')

module.exports = {
  ...base,
  setupFiles: [...base.setupFiles, './jest.setup.js'],
}

const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
  presets: ['react-app'],
})

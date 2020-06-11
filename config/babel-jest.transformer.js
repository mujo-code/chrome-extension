const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
  presets: ['react-app'],
  plugins: ['@babel/plugin-proposal-export-namespace-from'],
})

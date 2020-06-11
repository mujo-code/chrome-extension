const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
  presets: ['react-app', '@babel/preset-env'],
  plugins: ['@babel/plugin-proposal-export-namespace-from'],
})

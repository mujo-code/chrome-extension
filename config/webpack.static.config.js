const webpack = require('webpack')
const paths = require('./paths')
const createWebpackConfig = require('./webpack.config')

module.exports = function webpackConfig(entry, filename, webpackEnv) {
  const mainConfig = createWebpackConfig(webpackEnv)
  return Object.assign({}, mainConfig, {
    entry,
    output: {
      // The build folder.
      path: paths.appBuild,
      filename,
    },
    optimization: {
      runtimeChunk: false,
      splitChunks: { chunks: 'initial' },
    },
    // remove plugins to avoid html injection
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],
  })
}

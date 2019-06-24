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
      minimize: true,
      splitChunks: {
        chunks: 'initial',
        name: false,
      },
      runtimeChunk: false,
    },
    // remove plugins to avoid html injection
    plugins: [],
  })
}

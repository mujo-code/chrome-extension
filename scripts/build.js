// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'
process.env.WEBPACK_ENV = 'production'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
require('../config/env')

const path = require('path')
const filesize = require('filesize')
const fs = require('fs-extra')
const chalk = require('react-dev-utils/chalk')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const webpack = require('webpack')
const paths = require('../config/paths')
const configFactory = require('../config/webpack.config')
const staticConfigFactory = require('../config/webpack.static.config')
const { logger } = require('./logger')

const copyPublicFolder = () => {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  })
}

const logBuild = ({ stats, warnings }, log) => {
  if (warnings.length) {
    log(chalk.yellow('Compiled with warnings.'))
    log(warnings.join('\n\n'))
    log(
      `\nSearch for the ${chalk.underline(
        chalk.yellow('keywords')
      )} to learn more about each warning.`
    )
    log(
      `To ignore, add ${chalk.cyan(
        '// eslint-disable-next-line'
      )} to the line before.`
    )
  } else {
    log(chalk.green('Compiled successfully.'))
  }

  const { assets } = stats.toJson({ all: false, assets: true })
  assets.forEach(asset => {
    log(`${asset.name}: ${chalk.yellow(filesize(asset.size))}`)
  })
}

const build = config => {
  const pathSegments = path.parse(config.entry.toString())
  const log = logger(`build:${pathSegments.base}`)
  log('Starting build...')

  const compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages
      if (err) {
        if (!err.message) {
          return reject(err)
        }
        messages = formatWebpackMessages({
          errors: [err.message],
          warnings: [],
        })
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        )
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1
        }
        return reject(new Error(messages.errors.join('\n\n')))
      }

      logBuild({ stats, warnings: messages.warnings }, log)

      return resolve({
        stats,
        warnings: messages.warnings,
      })
    })
  })
}

const makeBuilds = (configs, fileSizes) =>
  configs.reduce(
    (promise, config) => promise.then(() => build(config, fileSizes)),
    Promise.resolve()
  )

const startBuild = async configs => {
  fs.emptyDirSync(paths.appBuild)
  // todo make async
  copyPublicFolder()
  await makeBuilds(configs)
}

// Warn and crash if required files are missing
if (
  !checkRequiredFiles([
    paths.appHtml,
    paths.appIndexJs,
    paths.appBackgroundJs,
    paths.appContentJs,
  ])
) {
  process.exit(1)
}

startBuild([
  configFactory(process.env.WEBPACK_ENV),
  staticConfigFactory(
    paths.appBackgroundJs,
    'background.js',
    process.env.WEBPACK_ENV
  ),
  staticConfigFactory(
    paths.appContentJs,
    'content.js',
    process.env.WEBPACK_ENV
  ),
])

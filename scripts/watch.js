/* eslint-disable-next-line */
const { Gaze } = require('gaze')
const { log } = require('./logger')
const { runScript } = require('./script-runner')

const gaze = new Gaze('{public,src}/**/*.{json,js,html}')

log('starting up server')
const teardownHttp = runScript('serve')

let teardown = null
const runBuild = () => {
  if (teardown) {
    teardown()
  }
  log('rebuilding')
  teardown = runScript('build')
}

let hasShutdown = false
const teardownAll = () => {
  if (hasShutdown) return
  hasShutdown = true
  log('shutting down')
  teardownHttp()
  if (teardown) {
    teardown()
  }
  log('shutdown complete')
  process.exit(0)
}

process.on('SIGINT', teardownAll)
process.on('exit', teardownAll)
gaze.on('ready', runBuild)
gaze.on('all', runBuild)

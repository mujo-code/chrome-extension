/* eslint-disable-next-line */
const { Gaze } = require('gaze')
const { log } = require('./logger')
const { runScript } = require('./script-runner')

const gaze = new Gaze('{public,src}/**/*.{json,js,html}')

log('starting up server')
const teardownHttp = runScript('serve')
log('starting up devtools')
const teardownDevtools = runScript('devtools')

let teardown = null
const runBuild = () => {
  if (teardown) {
    teardown()
  }
  log('rebuilding development')
  teardown = runScript('build:dev', process.stdout)
}

let hasShutdown = false
const teardownAll = () => {
  if (hasShutdown) return
  hasShutdown = true
  log('shutting down')
  teardownHttp()
  teardownDevtools()
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

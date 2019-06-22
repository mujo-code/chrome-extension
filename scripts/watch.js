const { spawn } = require('child_process')
/* eslint-disable-next-line */
const { Gaze } = require('gaze')

const logger = label => str =>
  console.log(`${label || new Date()}: ${str}`)
const log = logger()
const gaze = new Gaze('{public,src}/**/*.{json,js,html}')

const http = spawn('npm', ['run', 'serve'], { stdio: 'inherit' })

http.on('error', error => {
  console.log(error)
  process.exit()
})

const createBuilder = () => {
  let isEnded = false
  const builder = spawn('npm', ['run', 'build'], {
    stdio: 'inherit',
    detached: true,
  })
  const ts = +new Date()
  log('Change detected rebuilding...')

  builder.on('close', code => {
    isEnded = true
    const exited =
      code === null ? 'was canceled' : `exited with the code ${code}`
    const endTS = +new Date()
    log(`Build process ${exited} in ${endTS - ts}ms`)
  })
  return () => {
    if (!isEnded) {
      // setup queue system ?
      process.kill(-builder.pid)
    }
  }
}

let teardown = null
const runBuild = () => {
  if (typeof lastBuilder === 'function') {
    teardown()
  }
  teardown = createBuilder()
}

gaze.on('ready', runBuild)
gaze.on('all', runBuild)

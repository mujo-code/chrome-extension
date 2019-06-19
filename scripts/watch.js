const { spawn } = require('child_process')
/* eslint-disable-next-line */
const { Gaze } = require('gaze')

const logger = label => str => console.log(`${label || new Date()}: ${str}`)
const log = logger()

const gaze = new Gaze('{public,src}/**/*.{json,js,html}')
let isBuilding = false

const runBuild = () => {
  if (isBuilding) {
    // setup queue system ?
    return
  }
  const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' })
  const ts = +new Date()
  log('Change detected rebuilding...')
  isBuilding = true

  build.on('close', code => {
    isBuilding = false
    const endTS = +new Date()
    log(`Build completed with the code ${code} in ${endTS - ts}ms`)
  })
}

gaze.on('ready', runBuild)
gaze.on('all', runBuild)

const { spawn } = require('child_process')
/* eslint-disable-next-line */
const { Gaze } = require('gaze')

const gaze = new Gaze('{public,src}/*.{json,js,html}')
let isBuilding = false

const runBuild = () => {
  if (isBuilding) {
    // setup queue system ?
    return
  }
  const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' })
  const ts = +new Date()
  console.log(`${ts}: Change detected rebuilding....`)
  isBuilding = true

  build.on('close', code => {
    isBuilding = false
    const endTS = +new Date()
    console.log(`Build closed with the code ${code}`)
    console.log(`${endTS}: Build completed in ${endTS - ts}ms`)
  })
}

gaze.on('ready', runBuild)
gaze.on('all', runBuild)

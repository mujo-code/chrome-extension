const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const dir = promisify(fs.readdir)
const write = promisify(fs.writeFile)
const read = promisify(fs.readFile)

const JS_DIR = 'static/js'
const BUILD_DIR = path.resolve(process.cwd(), './build/')
const DIST_DIR = path.resolve(BUILD_DIR, JS_DIR)
const SERVER = 'http://localhost:5000'

const updateSourceMaps = async (directory, outputDirectory) => {
  const files = await dir(directory)
  files
    .filter(file => /.js$/.test(file))
    .forEach(async file => {
      const filepath = path.resolve(directory, file)
      const content = await read(filepath, 'utf8')
      const parsed = content.split('\n')
      const mapping = parsed.pop()
      const serverMapped = /http/.test(mapping)
        ? mapping
        : mapping.replace('=', `=${SERVER}/${outputDirectory}`)
      parsed.push(serverMapped)
      await write(filepath, parsed.join('\n'))
    })
}

updateSourceMaps(DIST_DIR, `${JS_DIR}/`)
updateSourceMaps(BUILD_DIR, '')

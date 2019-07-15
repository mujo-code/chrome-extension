const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const write = promisify(fs.writeFile)
const read = promisify(fs.readFile)
const BUILD_PATH = path.resolve(__dirname, '../build')
const MANIFEST_PATH = path.resolve(BUILD_PATH, './manifest.json')
const BETA_ICON = 'favicon-beta.png'

const beta = str => `[BETA] ${str}`
const readJSON = async dir => JSON.parse(await read(dir))
const serialize = json => JSON.stringify(json, null, '\t')

const decorateBETA = async () => {
  const manifest = await readJSON(MANIFEST_PATH)
  const betaManifest = Object.assign({}, manifest, {
    name: beta(manifest.name),
    short_name: beta(manifest.short_name),
    browser_action: { default_icon: BETA_ICON },
    icons: {
      16: BETA_ICON,
      32: BETA_ICON,
      48: BETA_ICON,
      96: BETA_ICON,
      128: BETA_ICON,
      512: BETA_ICON,
    },
    version: `${manifest.version}.${`${+new Date()}`.slice(0, 4)}`,
    version_name: `${manifest.version} BETA`,
  })
  return write(MANIFEST_PATH, serialize(betaManifest))
}

decorateBETA()

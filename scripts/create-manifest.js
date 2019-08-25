const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const ChangeCase = require('change-case')
const cosmiconfig = require('cosmiconfig')
const chalk = require('react-dev-utils/chalk')
const assets = require('../build/asset-manifest.json')
const paths = require('../config/paths')
const pkg = require('../package.json')

const write = promisify(fs.writeFile)

const BACKGROUND_PATTERN = /background|vendor/
const MAP_PATTERN = /map/

const stampDefaultManifest = () => ({
  manifest_version: 2,
  short_name: pkg.name,
  version: pkg.version,
  offline_enabled: true,
  background: {},
})

const getScripts = PATTERN =>
  // TODO this needs to be ran post build
  Object.keys(assets.files)
    .filter(
      filename =>
        PATTERN.test(filename) && !MAP_PATTERN.test(filename)
    )
    .map(file => assets.files[file].replace('./', ''))

const changeKeyCasing = (object, fn) => {
  const keys = Object.keys(object)
  return keys
    .map(fn)
    .reduce(
      (accum, key, i) => ({ ...accum, [key]: object[keys[i]] }),
      {}
    )
}

const createSecurityPolicyString = contentSecurityPolicy =>
  Object.keys(contentSecurityPolicy)
    .reduce((accum, key) => {
      const values = contentSecurityPolicy[key] || []
      return `${accum} ${key} ${values.join(' ')};`
    }, '')
    .trim()

const createManifest = async () => {
  const name = pkg.name.toLowerCase()
  const explorer = cosmiconfig(name)
  const results = await explorer.search()
  const manifestDefaults = stampDefaultManifest()
  if (!results || !results.config) {
    throw new TypeError(
      'No config found please create a .mujorc.yml in the root diretory'
    )
  }
  const { plugins, ...config } = results.config
  const manifestOverrides = changeKeyCasing(
    config,
    ChangeCase.snakeCase
  )
  const backgroundScripts = getScripts(BACKGROUND_PATTERN)
  backgroundScripts.unshift(await createBackgroundAssetMap())
  return {
    ...manifestDefaults,
    ...manifestOverrides,
    content_security_policy: createSecurityPolicyString(
      changeKeyCasing(
        manifestOverrides.content_security_policy,
        ChangeCase.paramCase
      )
    ),
    background: {
      scripts: backgroundScripts,
      persistent: true,
    },
  }
}

const createBackgroundAssetMap = async () => {
  const fileName = 'asset-map.js'
  const outputFile = path.resolve(paths.appBuild, fileName)
  const content = `window.mujo_assets = ${JSON.stringify(assets)}`
  await write(outputFile, content)
  return fileName
}

// run it all
;(async () => {
  const outputfile = path.resolve(paths.appBuild, 'manifest.json')
  const manifest = await createManifest()
  await write(outputfile, JSON.stringify(manifest, null, '  '))
  console.log(`Manifest.json created: ${chalk.green(outputfile)}`)
})()

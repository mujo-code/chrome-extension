const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const cosmiconfig = require('cosmiconfig')
const rimraf = require('rimraf')
const paths = require('../config/paths')
const pkg = require('../package.json')

const stat = promisify(fs.stat)
const write = promisify(fs.writeFile)
const symlink = promisify(fs.symlink)
const rmrf = promisify(rimraf)
const mkdir = promisify(fs.mkdir)

const promiseSeq = async (fn, arr) => {
  const resolves = []
  await arr.reduce(
    (promise, plugin, i) =>
      promise.then(async () => {
        const resolve = await fn(plugin, i)
        resolves.push(resolve)
        return Promise.resolve()
      }),
    Promise.resolve()
  )
  return resolves
}

const cleanDirectory = async () => {
  // cleans out synlinks
  await rmrf(paths.appPluginsDir)
  await mkdir(paths.appPluginsDir)
}

const run = async () => {
  const name = pkg.name.toLowerCase()
  const explorer = cosmiconfig(name)
  const { config } = await explorer.search()
  const pluginFolder = config.plugins
  await cleanDirectory()
  const plugins = await promiseSeq(resolvePlugin, pluginFolder)
  await promiseSeq(symlinkPlugin(pluginFolder), plugins)
  await createPluginFile(pluginFolder)
}

const symlinkPlugin = plugins => async (pluginPath, i) => {
  await symlink(
    pluginPath,
    path.resolve(paths.appPluginsDir, plugins[i])
  )
}

const doesExist = async pluginPath => {
  try {
    await stat(pluginPath)
    return true
  } catch (e) {
    // will error if does not exist
  }
  return false
}

const createPluginFile = async plugins => {
  const content = `module.exports = [${plugins
    .map(plugin => {
      const pluginPath = path.relative(
        paths.appSrc,
        path.resolve(paths.appPluginsDir, plugin)
      )
      return `require('./${pluginPath}').default`
    })
    .join(',\n')}]`

  await write(paths.appPluginsJs, content)
}

const resolvePlugin = async pluginName => {
  const nodeModulePath = path.resolve(
    paths.appNodeModules,
    pluginName
  )
  const isInNodeModule = await doesExist(
    path.resolve(paths.appNodeModules, pluginName)
  )
  const inRepoPath = path.resolve(paths.inRepoPlugins, pluginName)
  const isInRepo = await doesExist(inRepoPath)
  const exists = isInNodeModule || isInRepo
  if (!exists) {
    throw new TypeError(`Plugin "${pluginName}" does not exist`)
  }
  // TODO we will eventually need to require the component in node
  // to pull off any values for the manifest
  console.log({ isInRepo, isInNodeModule })
  return isInRepo ? inRepoPath : nodeModulePath
}

run()

require('@babel/register')

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const cosmiconfig = require('cosmiconfig')
const paths = require('../config/paths')
const pkg = require('../package.json')

const stat = promisify(fs.stat)
const write = promisify(fs.writeFile)
const symlink = promisify(fs.symlink)

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

const run = async () => {
  const name = pkg.name.toLowerCase()
  const explorer = cosmiconfig(name)
  const { config } = await explorer.search()
  const pluginFolders = config.plugins
  const plugins = await promiseSeq(resolvePlugin, pluginFolders)
  await promiseSeq(symlinkPlugin(pluginFolders), plugins)
  await createPluginFile(pluginFolders)
}

const symlinkPlugin = plugins => async (pluginPath, i) => {
  // TODO: symlink folder path into src/plugins/"plugin"
  // this will allow use to build it into webpack bundles
  // will fail if there is already a symlink
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
    .map(
      plugin =>
        `require('${path.resolve(
          paths.appPluginsDir,
          plugin
        )}').default`
    )
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

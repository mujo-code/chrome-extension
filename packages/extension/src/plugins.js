export const getPlugins = () => {
  let plugins
  try {
    /* eslint-disable-next-line global-require */
    plugins = require('./mujo-plugins')
  } catch (e) {
    console.error('Error loading plugins', e)
    plugins = []
  }
  return plugins
}

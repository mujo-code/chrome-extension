import { DATABASE_STORE, PAGE_VIEWS_KEY } from '../../../constants'
import { set } from '../../../lib/util'
import model from '../../../model'
import localStorageInterface from '../local-storage'

export const version1Migration = async (transaction, log) => {
  log('Attempting to migrate from local storage to indexDB')
  const keys = Object.keys(model)
  const localStorageData = (await Promise.all(
    keys.map(async key => {
      const type = typeof model[key].type()
      return [key, await localStorageInterface.getters[type](key)]
    })
  )).reduce((accum, [key, val]) => {
    if (val !== null) {
      set(accum, key, val)
    }
    return accum
  }, {})
  const localStorageKeys = Object.keys(localStorageData)
  const hasData = Object.keys(localStorageData).length
  const isInvalidData = isNaN(localStorageData[PAGE_VIEWS_KEY])
  if (!hasData || isInvalidData) {
    log('No data found migration complete')
    return
  }

  try {
    await localStorageKeys.reduce(
      (promise, key) =>
        promise.then(() =>
          transaction
            .objectStore(DATABASE_STORE)
            .put(localStorageData[key], key)
        ),
      Promise.resolve()
    )
  } catch (e) {
    log('Failed. Please contact support')
    console.error(e)
    return
  }
  log('Success removing old data')
  localStorage.clear()
  await transaction.done
}

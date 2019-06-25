import statsModel from '../../model'
import localStorage from './local-storage'
import { Storage } from './storage'

export const storage = Storage.from({
  version: '1',
  model: statsModel,
  storageInterface: localStorage,
})

// TODO: Think about breaking these out
export const onGetStorage = async (key, callback) => {
  const value = await storage.get(key)
  callback({ key, value })
}

export const onSetStorage = async (key, value, callback) => {
  await storage.set(key, value)
  callback({ key, value })
}

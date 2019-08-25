import EventEmitter from 'eventemitter3'
import statsModel from '../../model'
import indexDB from './index-db'
import { Storage } from './storage'

export { getActivity, resetActivity } from './index-db'

export const changeEmitter = new EventEmitter()

export const storage = Storage.from({
  version: '1',
  model: statsModel,
  storageInterface: indexDB,
})

// TODO: Think about breaking these out
export const onGetStorage = async (key, callback) => {
  const value = await storage.get(key)
  return callback({ key, value })
}

export const onSetStorage = async (key, value, callback) => {
  await storage.set(key, value)
  changeEmitter.emit(key, value)
  return callback({ key, value })
}

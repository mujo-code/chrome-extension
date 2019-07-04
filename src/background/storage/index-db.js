import { openDB } from 'idb'
import {
  DATABASE_NAME,
  DATABASE_VERSION,
  DATABASE_STORE,
  LAST_ACTIVITY_TABLE,
  ACTIVITY_NUMBER_KEY,
} from '../../constants'
import { set } from '../../lib/util'
import { types } from './types'

export const open = async () =>
  openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
      db.createObjectStore(DATABASE_STORE)
      const activityStore = db.createObjectStore(
        LAST_ACTIVITY_TABLE,
        {
          keyPath: 'id',
          autoIncrement: true,
        }
      )
      activityStore.createIndex('date', 'date')
    },
  })

export const database = open()

export const createMethods = (db, store) => ({
  async get(key) {
    return (await db).get(store, key)
  },
  async set(key, val) {
    return (await db).put(store, val, key)
  },
  async delete(key) {
    return (await db).delete(store, key)
  },
  async clear() {
    return (await db).clear(store)
  },
  async keys() {
    return (await db).getAllKeys(store)
  },
})

export const store = createMethods(database, DATABASE_STORE)

export const addLatestActivity = async date => {
  const db = await database
  const activityNumber = (await store.get(ACTIVITY_NUMBER_KEY)) || 0
  return db.add(LAST_ACTIVITY_TABLE, {
    date,
    activityNumber,
  })
}

export default {
  getters: types.reduce((accum, type) => {
    set(accum, type, store.get)
    return accum
  }, {}),
  setters: types.reduce((accum, type) => {
    set(accum, type, store.set)
    return accum
  }, {}),
}

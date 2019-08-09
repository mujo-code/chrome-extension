import uuid from 'uuid/v4'
import { ID_KEY } from '../constants'
import { storage } from './storage'

export const initIdentity = async () => {
  let id = await storage.get(ID_KEY)
  if (!id) {
    id = uuid()
    await storage.set(ID_KEY, uuid())
  }
  return id
}

/*
  Extension Lib Mock
*/
import model from '../../model'
import { noop } from '../functional'

export const message = async () => ({})

export const getStorage = async key => model[key].defaultValue
export const setStorage = async key => model[key].defaultValue
export const onMessage = noop

export const alarms = {}
export const notifications = {}
export const tabs = {}
export const webNavigation = {}
export const runtime = {}
export const topSites = {}

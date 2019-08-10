/* eslint-disable import-order-alphabetical/order */
import { P_ALARM, PREDICTED_BREAK_TIMES } from '../../constants'
import {
  alarmKey,
  currentAlarms,
  isOutDated,
  checkPredictions,
} from './prediction'

jest.mock('../storage')
jest.mock('../../lib/mujo-sdk')
jest.mock('./util')
jest.mock('../tracking')
const { api } = require('../../lib/mujo-sdk')
const { storage, getActivity } = require('../storage')
const { exception } = require('../tracking')
const { upsertAlarm } = require('./util')

beforeEach(() => {
  storage.get = jest.fn()
  storage.set = jest.fn()
  api.postActivity = jest.fn()
  api.getBreaks = jest.fn()
})

test('alarmKey should return a prefix id', () => {
  expect(alarmKey('foo')).toBe(`${P_ALARM}_foo`)
})

test('currentAlarms should return false the prediction is old', () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 1)
  expect(currentAlarms({ date })).toBe(false)
})

test('currentAlarms should return false the prediction is new', () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  expect(currentAlarms({ date })).toBe(true)
})

test('isOutDated should return true if the last prediction isnt today', () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 1)
  expect(isOutDated([{ date }])).toBe(true)
})

test('isOutDated should return false if the last prediction is today', () => {
  const date = new Date()
  expect(isOutDated([{ date }])).toBe(false)
})

test(`
  checkPredictions should check storage and nothing else
  if the predictions are not outdated
`, () => {
  const date = new Date()
  date.setHours(date.getHours() + 1)
  storage.get.mockResolvedValue([{ date }])
  checkPredictions()
  expect(storage.get).toBeCalledWith(PREDICTED_BREAK_TIMES)
  expect(getActivity).not.toBeCalled()
})

test(`
  checkPredictions should check storage and nothing else
  if the predictions are not outdated
`, async () => {
  const date = new Date()
  date.setHours(date.getHours() + 1)
  storage.get.mockResolvedValue([{ date }])
  await checkPredictions()
  expect(storage.get).toBeCalledWith(PREDICTED_BREAK_TIMES)
  expect(getActivity).not.toBeCalled()
})

test('checkPredictions should sync any new activity to the api', async () => {
  const date = new Date()
  date.setHours(date.getHours() + 1)
  const yesterday = new Date()
  yesterday.setDate(yesterday.setDate() - 1)
  storage.get.mockResolvedValue([{ date: yesterday }])
  // needed or it will break
  api.getBreaks.mockResolvedValue([{ date }])
  const activity = [{ date }, { date }]
  getActivity.mockResolvedValue(activity)
  await checkPredictions()
  expect(api.postActivity).toBeCalledWith(activity)
})

test('checkPredictions should log an exception if syncing fails', async () => {
  const date = new Date()
  const yesterday = new Date()
  const fooError = new Error('foo')
  date.setHours(date.getHours() + 1)
  yesterday.setDate(yesterday.setDate() - 1)
  storage.get.mockResolvedValue([{ date: yesterday }])
  api.postActivity.mockRejectedValue(fooError)
  // needed or it will break
  api.getBreaks.mockResolvedValue([{ date }])
  const activity = [{ date }, { date }]
  getActivity.mockResolvedValue(activity)
  await checkPredictions()
  expect(exception).toBeCalledWith(fooError)
})

test('checkPredictions should store new predictions', async () => {
  const date = new Date()
  const yesterday = new Date()
  const breaks = [{ date }]
  const activity = [{ date }, { date }]

  date.setHours(date.getHours() + 1)
  yesterday.setDate(yesterday.setDate() - 1)
  storage.get.mockResolvedValue([{ date: yesterday }])
  getActivity.mockResolvedValue(activity)
  // needed or it will break
  api.getBreaks.mockResolvedValue(breaks)

  await checkPredictions({ isActive: true })
  expect(storage.set).toBeCalledWith(PREDICTED_BREAK_TIMES, breaks)
})

test('checkPredictions should log any errors getting breaks', async () => {
  const date = new Date()
  const yesterday = new Date()
  const fooError = new Error('foo')
  const activity = [{ date }, { date }]

  date.setHours(date.getHours() + 1)
  yesterday.setDate(yesterday.setDate() - 1)
  storage.get.mockResolvedValue([{ date: yesterday }])
  api.getBreaks.mockRejectedValue(fooError)
  getActivity.mockResolvedValue(activity)

  await checkPredictions({ isActive: true })
  expect(exception).toBeCalledWith(fooError)
})

test('checkPredictions should add any upcoming alarms', async () => {
  const now = new Date()
  const date = new Date()
  const yesterday = new Date()
  date.setHours(date.getHours() + 1)
  yesterday.setDate(yesterday.setDate() - 1)

  const activity = [{ date }, { date }]
  const breaks = [
    { date, originalDate: date.toISOString() },
    { date: yesterday },
  ]

  storage.get.mockResolvedValue([{ date: yesterday }])
  api.getBreaks.mockResolvedValue(breaks)
  getActivity.mockResolvedValue(activity)

  await checkPredictions({ now, isActive: true })

  const when = +date - +now
  const options = { when }
  // omits old alarm
  expect(upsertAlarm).toHaveBeenCalledTimes(1)
  expect(upsertAlarm).toHaveBeenLastCalledWith(
    `${P_ALARM}_${date.toISOString()}`,
    options
  )
})

import { isAfter, isSameDay } from 'date-fns'
import { PREDICTED_BREAK_TIMES, P_ALARM } from '../../constants'
import { last } from '../../lib/functional'
import { api } from '../../lib/mujo-sdk'
import { storage, getActivity } from '../storage'
import { upsertAlarm } from './util'

export const alarmKey = date => `${P_ALARM}_${date}`

export const currentAlarms = prediction =>
  isAfter(prediction.date, new Date())

export const isOutDated = (predictions = []) => {
  const lastPrediction = last(predictions) || {}
  return !isSameDay(new Date(lastPrediction.date), new Date())
}

export const checkPredictions = async () => {
  let predictions = await storage.get(PREDICTED_BREAK_TIMES)
  if (isOutDated(predictions) || !predictions) {
    try {
      predictions = await api.todaysBreaks(await getActivity())
      await storage.set(PREDICTED_BREAK_TIMES, predictions)
      // TODO clear table after it has been synced with the server
    } catch (e) {
      console.error(e)
      // TODO track error
      predictions = []
    }
  }
  const upcomingPredictions = predictions.filter(currentAlarms)
  upcomingPredictions.forEach(prediction => {
    const when = prediction.date
    upsertAlarm(alarmKey(prediction.originalDate), { when })
  })
}

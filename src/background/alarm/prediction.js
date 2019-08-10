import { isAfter, isSameDay } from 'date-fns'
import {
  PREDICTED_BREAK_TIMES,
  P_ALARM,
  MAX_ACTIVITY_ROWS,
} from '../../constants'
import { last } from '../../lib/functional'
import { api } from '../../lib/mujo-sdk'
import { storage, getActivity, resetActivity } from '../storage'
import { exception } from '../tracking'
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
  if (predictions && !isOutDated(predictions)) return
  const activity = await getActivity()
  if (activity.length) {
    try {
      // sync up new activties
      await api.postActivity(activity.slice(MAX_ACTIVITY_ROWS * -1))
      await resetActivity()
    } catch (e) {
      exception(e)
    }
  }
  try {
    // get predictions
    predictions = await api.getBreaks()
    await storage.set(PREDICTED_BREAK_TIMES, predictions)
  } catch (e) {
    exception(e)
    predictions = []
  }
  const upcomingPredictions = predictions.filter(currentAlarms)
  upcomingPredictions.forEach(prediction => {
    const when = new Date(prediction.date)
    upsertAlarm(alarmKey(prediction.originalDate), { when })
  })
}

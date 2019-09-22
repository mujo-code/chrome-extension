import { useHeartBeat, context, useStorage } from '@mujo/plugins'
import { isAfter, isSameDay, parseISO } from 'date-fns'
import { useContext, useCallback, useEffect, useState } from 'react'
import { PREDICTED_BREAK_TIMES, P_ALARM } from '../constants'
import { identify } from '../mujo-sdk'

export const alarmKey = date => `${P_ALARM}_${date}`
export const getNow = date => date || new Date()

export const currentAlarms = (prediction, now) =>
  isAfter(parseISO(prediction.date), getNow(now))

export const isOutDated = (predictions = [], now) => {
  const lastPrediction = predictions[predictions.length - 1] || {}
  return !isSameDay(parseISO(lastPrediction.date), getNow(now))
}

export const PredictiveBreakTimes = ({ api, identity }) => {
  const { extension } = useContext(context)
  const [predictions, setPredictions] = useStorage(PREDICTED_BREAK_TIMES, [])
  const [initialized, setInitialized] = useState(false)
  const { alarms } = extension

  const checkPredictions = useCallback(
    async isActive => {
      if (!isActive) return
      if (!isOutDated(predictions)) return
      try {
        const newPerdictions = await api.getBreaks()
        setPredictions(newPerdictions)
      } catch (e) {
        setPredictions([])
      }
    },
    [api, predictions, setPredictions]
  )

  useEffect(() => {
    const now = new Date()
    // TODO: fix needs to happen in background storage to not overwrite
    // defaults
    const upcomingPredictions = (predictions || []).filter(currentAlarms)
    upcomingPredictions.forEach(prediction => {
      const when = +new Date(prediction.date) - +getNow(now)
      const alarmOptions = { when }
      alarms.upsertAlarm(alarmKey(prediction.date), alarmOptions)
    })
  }, [predictions, alarms])

  useEffect(() => {
    if (!initialized && identity) {
      setInitialized(true)
      identify(identity)
      checkPredictions(true)
    }
  }, [initialized, checkPredictions, setInitialized, identity])

  useHeartBeat(checkPredictions)

  return null
}

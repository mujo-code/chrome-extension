import { useHeartBeat, context, useStorage } from '@mujo/plugins'
import { isAfter, parseISO } from 'date-fns'
import { useContext, useCallback, useEffect, useState } from 'react'
import { PREDICTED_BREAK_TIMES, P_ALARM } from '../constants'
import { identify, api } from '../mujo-sdk'

export const alarmKey = date => `${P_ALARM}_${date}`
export const getNow = date => date || new Date()

export const afterNow = (prediction, now) =>
  isAfter(parseISO(prediction.date), getNow(now))

export const isOutDated = (predictions = [], now) => {
  const lastPrediction = predictions[predictions.length - 1] || {}
  return !afterNow(lastPrediction, now)
}

export const SmartBreaksBackground = () => {
  const { extension, constants } = useContext(context)
  const [predictions, setPredictions, { pending }] = useStorage(
    PREDICTED_BREAK_TIMES,
    []
  )
  const [identity] = useStorage(constants.ID_KEY)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    identify(identity)
  }, [identity])
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
    [predictions, setPredictions]
  )

  useEffect(() => {
    const now = Date.now()
    // TODO: fix needs to happen in background storage to not overwrite
    // defaults
    const upcomingPredictions = (predictions || []).filter(afterNow)
    upcomingPredictions.forEach(prediction => {
      const delayInMS = +new Date(prediction.date) - now
      const delayInMinutes = Math.floor(delayInMS / 1000 / 60)
      const alarmOptions = { delayInMinutes }
      alarms.upsertAlarm(alarmKey(prediction.date), alarmOptions)
    })
  }, [predictions, alarms])

  useEffect(() => {
    if (!initialized && identity && !pending) {
      setInitialized(true)
      identify(identity)
      checkPredictions(true)
    }
  }, [initialized, checkPredictions, setInitialized, identity, pending])

  useHeartBeat(checkPredictions)

  return null
}

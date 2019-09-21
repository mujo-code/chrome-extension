import { useStorage, context } from '@mujo/plugins'
import React, { useContext, useEffect } from 'react'
import { API_HOST } from '../constants'
import { apiFrom, identify } from '../mujo-sdk'
import { PredictiveBreakTimes } from './predictions'
import { ScreenTimeTracking } from './tracking'

const api = apiFrom({ apiHost: API_HOST })

export const ScreenTimeBackground = () => {
  const { constants } = useContext(context)
  const [identity] = useStorage(constants.ID_KEY)

  useEffect(() => {
    identify(identity)
  }, [identity])

  return (
    <>
      <ScreenTimeTracking api={api} />
      <PredictiveBreakTimes api={api} identity={identity} />
    </>
  )
}

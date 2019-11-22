import { Setting, useStorage } from '@mujo/plugins'
import React from 'react'
import { Extension } from '@mujo/utils'
import { ALARM_KEY } from './constants'

export const BreakAlarmNewTabPage = () => {
  const [alarmEnabled, setAlarmEnabled] = useStorage(ALARM_KEY)
  const { useTranslation } = Extension
  const { t } = useTranslation()
  return (
    <>
      <Setting
        label={t('reminder')}
        type="boolean"
        alt={t('reminder-alt')}
        onChange={setAlarmEnabled}
        value={alarmEnabled}
      />
    </>
  )
}

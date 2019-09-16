import { Setting, context, useStorage } from '@mujo/plugins'
import React, { useContext, useCallback } from 'react'
import { ALARM_KEY } from './constants'

// {
//   label: t('reminder'),
//   type: 'boolean',
//   alt: t('reminder-alt'),
//   setter: PREDICTED_TIMES_FEATURE
//   value: alarmEnabled,
// },

export const BreakAlarmNewTabPage = () => {
  const { extension } = useContext(context)
  //  TODO: needs useStorage client hook
  const [alarmEnabled, setAlarmEnabled] = useStorage(ALARM_KEY)
  const onChange = useCallback(enabled => setAlarmEnabled(enabled), [
    setAlarmEnabled,
  ])
  const { i18n } = extension
  return (
    <>
      <Setting
        label={i18n.t('reminder')}
        type="boolean"
        alt={i18n.t('reminder-alt')}
        onChange={onChange}
        value={alarmEnabled}
      />
    </>
  )
}

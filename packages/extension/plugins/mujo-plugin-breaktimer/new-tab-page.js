import { Setting, context, useStorage } from '@mujo/plugins'
import React, { useContext } from 'react'
import { ALARM_KEY, CONDITIONAL_NEW_TAB_PAGE_KEY } from './constants'

export const BreakAlarmNewTabPage = () => {
  const { extension } = useContext(context)
  const [alarmEnabled, setAlarmEnabled] = useStorage(ALARM_KEY)
  const { i18n } = extension
  return (
    <>
      <Setting
        label={i18n.t('reminder')}
        type="boolean"
        alt={i18n.t('reminder-alt')}
        onChange={setAlarmEnabled}
        value={alarmEnabled}
      />
    </>
  )
}

export const ConditionalNewTabPage = () => {
  const { extension } = useContext(context)
  const [
    conditionalNewTabPageEnabled,
    setConditionalNewTabPageEnabled,
  ] = useStorage(CONDITIONAL_NEW_TAB_PAGE_KEY)
  const { i18n } = extension
  return (
    <>
      <Setting
        label={i18n.t('conditional-new-tab-page')}
        type="boolean"
        alt={i18n.t('conditional-new-tab-page-alt')}
        onChange={setConditionalNewTabPageEnabled}
        value={conditionalNewTabPageEnabled}
      />
    </>
  )
}

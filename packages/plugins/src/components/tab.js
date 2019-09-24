import { Ingress } from '@mujo/ingress'
import React, { useEffect, useContext } from 'react'
import { context } from './plugin-provider'

export const Tab = ({ name, children }) => {
  const { constants, tabs, env } = useContext(context)
  const { pushTab, removeTab, currentTab } = tabs

  useEffect(() => {
    if (env !== 'ntp') return () => {}
    pushTab(name)
    return removeTab(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])
  // only supported on ntp page
  if (env !== 'ntp') return null
  if (name !== currentTab) return null
  return <Ingress target={constants.TABS_TARGET}>{children}</Ingress>
}

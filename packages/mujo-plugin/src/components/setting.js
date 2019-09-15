import { useEffect, memo, useContext } from 'react'
import { context } from './plugin-provider'

export const Setting = memo(({ label, type, value, alt, onChange }) => {
  const { settings, env } = useContext(context)
  const { pushSetting, removeSetting, updateSetting } = settings

  useEffect(() => {
    if (env !== 'ntp') return () => {}
    pushSetting({ label, type, value, alt, onChange })
    return removeSetting({ label })
  }, []) // only on mount of the component

  useEffect(() => {
    if (env !== 'ntp') return
    updateSetting({ label, type, value, alt, onChange })
  }, [value, onChange]) // values that can update

  return null
})

Setting.displayName = 'Setting'

import { useEffect, useContext } from 'react'
import { context } from './plugin-provider'

export const EndScreen = ({ type, children }) => {
  const { endScreen, env } = useContext(context)
  const { registerEndScreen, removeEndScreen } = endScreen

  useEffect(() => {
    if (env !== 'ntp') return () => {}
    const endScreenType = type
    registerEndScreen({ endScreenType, children })
    return () => removeEndScreen({ endScreenType })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, children])
  // only supported on ntp page
  return null
}

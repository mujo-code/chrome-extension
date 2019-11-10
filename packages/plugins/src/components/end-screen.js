import { useEffect, useContext } from 'react'
import { context } from './plugin-provider'

export const EndScreen = ({ type, Component }) => {
  const { endScreen, env } = useContext(context)
  if (env !== 'ntp') return null
  const { registerEndScreen, removeEndScreen } = endScreen

  // eslint-disable-next-line
  useEffect(() => {
    if (env !== 'ntp') return () => {}
    const endScreenType = type
    registerEndScreen({ endScreenType, Component })
    return () => removeEndScreen({ endScreenType })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, Component])
  return null
}

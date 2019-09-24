import React, { useContext } from 'react'
import { context } from './plugin-provider'

export const NewTabPage = ({ children }) => {
  const { env } = useContext(context)
  if (env === 'ntp') {
    return <>{children}</>
  }
  return null
}

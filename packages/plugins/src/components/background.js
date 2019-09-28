import React, { useContext } from 'react'
import { context } from './plugin-provider'

export const Background = ({ children }) => {
  const { env } = useContext(context)
  if (env === 'background') {
    return <>{children}</>
  }
  return null
}

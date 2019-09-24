import React, { useContext } from 'react'
import { context } from './plugin-provider'

export const Content = ({ children }) => {
  const { env } = useContext(context)
  if (env === 'content') {
    return <>{children}</>
  }
  return null
}

import React from 'react'
import { getPlugins } from '../../plugins'
import { PluginError } from './plugin-error'

export const Plugins = () => (
  <>
    {getPlugins().map((Plugin, i) => (
      <PluginError key={`plugin-${i}`}>
        <Plugin />
      </PluginError>
    ))}
  </>
)

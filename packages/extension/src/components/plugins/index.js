import React, { memo } from 'react'
import { getPlugins } from '../../plugins'
import { PluginError } from './plugin-error'

export const Plugins = memo(() => (
  <>
    {getPlugins().map((Plugin, i) => (
      <PluginError key={`plugin-${i}`}>
        <Plugin />
      </PluginError>
    ))}
  </>
))

Plugins.displayName = 'Plugins'

import { PluginProvider } from '@mujo/plugins'
import React from 'react'
import { isActive } from '../../background/activity'
import { alarms } from '../../background/alarm'
import { storage, changeEmitter } from '../../background/storage'
import * as constants from '../../constants'
import * as extension from '../../lib/extension'
import model from '../../model'
import { getPlugins } from '../../plugins'

export const BackgroundApp = () => (
  <PluginProvider
    env="background"
    constants={constants}
    extension={extension}
    model={model}
    storage={storage}
    changeEmitter={changeEmitter}
    alarms={alarms}
    isActive={isActive}
  >
    {getPlugins().map((Plugin, i) => (
      <Plugin key={`plugin-${i}`} />
    ))}
  </PluginProvider>
)

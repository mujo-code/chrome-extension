import { PluginProvider } from '@mujo/plugins'
import React from 'react'
import { isActive } from '../../background/activity'
import { alarms } from '../../background/alarm'
import { messageEmitter } from '../../background/message-reducer'
import { storage, changeEmitter } from '../../background/storage'
import * as constants from '../../constants'
import * as extension from '../../lib/extension'
import model from '../../model'
import { Plugins } from '../plugins'

export const BackgroundApp = () => (
  <PluginProvider
    env="background"
    constants={constants}
    extension={extension}
    model={model}
    storage={storage}
    changeEmitter={changeEmitter}
    messageEmitter={messageEmitter}
    alarms={alarms}
    isActive={isActive}
  >
    <Plugins />
  </PluginProvider>
)

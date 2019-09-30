import { PluginProvider } from '@mujo/plugins'
import { Extension } from '@mujo/utils'
import React from 'react'
import { isActive } from '../../background/activity'
import { alarms } from '../../background/alarm'
import { messageEmitter } from '../../background/message-reducer'
import { storage, changeEmitter } from '../../background/storage'
import { track } from '../../background/tracking'
import * as constants from '../../constants'
import { i18n } from '../../i18n'
import model from '../../model'
import { Plugins } from '../plugins'

// TODO: remove extension from dep injection
export const BackgroundApp = () => (
  <PluginProvider
    env="background"
    constants={constants}
    extension={{
      ...Extension,
      i18n: {
        ...Extension.i18n,
        t: i18n.t.bind(i18n),
      },
    }}
    model={model}
    storage={storage}
    changeEmitter={changeEmitter}
    messageEmitter={messageEmitter}
    alarms={alarms}
    isActive={isActive}
    track={track}
  >
    <Plugins />
  </PluginProvider>
)

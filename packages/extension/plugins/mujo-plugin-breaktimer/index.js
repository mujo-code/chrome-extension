import { Background, NewTabPage } from '@mujo/plugins'
import React from 'react'
import { BreakAlarmBackground } from './background'
import {
  BreakAlarmNewTabPage,
  ConditionalNewTabPage,
} from './new-tab-page'

const BreakAlarm = () => (
  <>
    <Background>
      <BreakAlarmBackground />
    </Background>
    <NewTabPage>
      <BreakAlarmNewTabPage />
    </NewTabPage>
  </>
)

const ConditionalNewPage = () => (
  <>
    <NewTabPage>
      <ConditionalNewTabPage />
    </NewTabPage>
  </>
)

const Plugins = () => (
  <>
    <BreakAlarm />
    <ConditionalNewPage />
  </>
)

export default Plugins

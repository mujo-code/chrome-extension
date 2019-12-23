import { Background, NewTabPage } from '@mujo/plugins'
import React from 'react'
import { BreakAlarmBackground } from './background'
import { BreakAlarmNewTabPage } from './new-tab-page'

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

export default BreakAlarm

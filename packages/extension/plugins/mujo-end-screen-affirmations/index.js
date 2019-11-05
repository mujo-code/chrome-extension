import { NewTabPage } from '@mujo/plugins'
import React from 'react'
import { EndScreenAffirmation } from './end-screen-affirmation'

const EndScreen = ({ constants }) => (
  <NewTabPage>
    <EndScreen type={constants.DEFAULT_END_SCREEN}>
      {({ close }) => <EndScreenAffirmation close={close} />}
    </EndScreen>
  </NewTabPage>
)

export default EndScreen

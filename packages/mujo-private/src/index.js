import React from 'react'
import { SMART_BREAKS_FEATURE } from './constants'
import { ScreenTime } from './screen-time'
import { SmartBreaks } from './smart-breaks'

export const MujoPlugins = () => (
  <>
    <ScreenTime />
    {SMART_BREAKS_FEATURE ? <SmartBreaks /> : null}
  </>
)

export default MujoPlugins

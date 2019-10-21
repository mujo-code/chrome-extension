import { Background, Content } from '@mujo/plugins'
import React from 'react'
import { TabFocusBackground } from './background'
import { TabFocusDetector } from './detector'

const TabFocus = ({ constants }) => (
  <>
    <Background>
      <TabFocusBackground />
    </Background>
    <Content>
      <TabFocusDetector />
    </Content>
  </>
)

export default TabFocus

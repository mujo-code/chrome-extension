import { Box } from '@mujo/box'
import { EndScreen } from '@mujo/plugins'
import { HeaderL, BodyL, Steps, Step } from '@mujo/ui'
import React from 'react'

const CenterBox = ({ children }) => (
  <Box
    maxWidth="600px"
    display="flex"
    height="300px"
    direction="column"
    justifyContent="center"
    alignItems="center"
    margin="l"
  >
    {children}
  </Box>
)

export const EndScreenOnboarding = ({ close, index }) => (
  <Steps onFinish={close} lastCTA="Start journey">
    <Step name="intro">
      <CenterBox>
        <HeaderL>It feels good to take a break</HeaderL>
        <BodyL>
          Mujō wants to help you engage in a more mindful experiences
          on the web. Let us go through some of the features that help
          you be more mindful.
        </BodyL>
      </CenterBox>
    </Step>
    <Step name="breathe">
      <CenterBox>
        <HeaderL>Just breathe</HeaderL>
        <BodyL>
          The core of Mujō is to get you to connect with your breath,
          and to be more intentional with your actions on the web.
          Mujō will also has little nudges that remind you to connect
          with your breath.
        </BodyL>
      </CenterBox>
    </Step>
    <Step name="thanks">
      <CenterBox>
        <HeaderL>Thanks for installing Mujō.</HeaderL>
        <BodyL>
          It is time to start your journey to a more intentional web
          experience.
        </BodyL>
      </CenterBox>
    </Step>
  </Steps>
)

export const EndScreenComponent = () => (
  <EndScreen type="install" Component={EndScreenOnboarding} />
)

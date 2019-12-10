import { Box } from '@mujo/box'
import { EndScreen, context } from '@mujo/plugins'
import { HeaderL, BodyL, Steps, Step } from '@mujo/ui'
import React, { useContext } from 'react'

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

export const EndScreenOnboarding = ({ close, index }) => {
  const { extension } = useContext(context)
  const { i18n } = extension
  return (
    <Steps
      onFinish={close}
      nextCTA={i18n.t('next')}
      lastCTA={i18n.t('start-journey')}
    >
      <Step name="intro">
        <CenterBox>
          <HeaderL>{i18n.t('feels-good-break')}</HeaderL>
          <BodyL>{i18n.t('feels-good-break-desc')}</BodyL>
        </CenterBox>
      </Step>
      <Step name="breathe">
        <CenterBox>
          <HeaderL>{i18n.t('just-breathe')}</HeaderL>
          <BodyL>{i18n.t('just-breathe-desc')}</BodyL>
        </CenterBox>
      </Step>
      <Step name="thanks">
        <CenterBox>
          <HeaderL>{i18n.t('thanks-install')}</HeaderL>
          <BodyL>{i18n.t('thanks-install-desc')}</BodyL>
        </CenterBox>
      </Step>
    </Steps>
  )
}

export const EndScreenComponent = () => (
  <EndScreen type="install" Component={EndScreenOnboarding} />
)

import { EndScreen, context } from '@mujo/plugins'
import { Steps, Step, useTheme } from '@mujo/ui'
import React, { useContext } from 'react'
import { FeelsGoodBreak } from './feels-good-break'
import { JustBreathe } from './just-breathe'
import { Launch } from './launch'
import { OnboardingScreen } from './onboarding-screen'

export const EndScreenOnboarding = ({ close, index }) => {
  const { extension } = useContext(context)
  const { highlight, background } = useTheme()
  const { i18n } = extension
  return (
    <Steps
      onFinish={close}
      nextCTA={i18n.t('next')}
      lastCTA={i18n.t('start-journey')}
    >
      <Step name="intro">
        <OnboardingScreen
          icon={
            <FeelsGoodBreak
              highlight={highlight}
              foreground={background}
            />
          }
          title={i18n.t('feels-good-break')}
          description={i18n.t('feels-good-break-desc')}
        />
      </Step>
      <Step name="breathe">
        <OnboardingScreen
          icon={
            <JustBreathe
              highlight={highlight}
              foreground={background}
            />
          }
          title={i18n.t('just-breathe')}
          description={i18n.t('just-breathe-desc')}
        />
      </Step>
      <Step name="thanks">
        <OnboardingScreen
          icon={
            <Launch highlight={highlight} foreground={background} />
          }
          title={i18n.t('thanks-install')}
          description={i18n.t('thanks-install-desc')}
        />
      </Step>
    </Steps>
  )
}

export const EndScreenComponent = () => (
  <EndScreen type="install" Component={EndScreenOnboarding} />
)

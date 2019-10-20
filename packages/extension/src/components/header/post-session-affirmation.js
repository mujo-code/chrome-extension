import { Box } from '@mujo/box'
import { HeaderL, useTheme } from '@mujo/ui'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_FILE } from '../../constants'
import { HappyFace } from './happy-face'

const TIMEOUT = 5000

const getRandomAffirmation = t => {
  const affirmations = [
    t('youre-amazing'),
    t('youre-mindful'),
    t('youre-the-best'),
    t('youre-pro'),
  ]
  const random = Math.floor(Math.random() * affirmations.length)
  return affirmations[random]
}

export const PostSessionAffirmation = ({ close }) => {
  const { t } = useTranslation(TRANSLATION_FILE)
  const { foregroundSecondary, highlight } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      close()
    }, TIMEOUT)
    return () => {
      clearTimeout(timer)
    }
  }, [close])

  return (
    <Box>
      <HappyFace
        foreground={highlight}
        background={foregroundSecondary}
        marginBottom="s"
      />
      <HeaderL>{getRandomAffirmation(t)}</HeaderL>
    </Box>
  )
}

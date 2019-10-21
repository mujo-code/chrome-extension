import { Box } from '@mujo/box'
import { HeaderL, useTheme } from '@mujo/ui'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_FILE } from '../../constants'
import { HappyFace } from './happy-face'

const TIMEOUT = 5000

const randomN = n => Math.floor(Math.random() * n)

const getRandomAffirmation = (t, i) => {
  const messages = [
    t('youre-amazing'),
    t('youre-mindful'),
    t('youre-the-best'),
    t('youre-pro'),
  ]
  const number = typeof i === 'number' ? i : randomN(messages.length)
  return messages[number]
}

export const PostSessionAffirmation = ({ close, index }) => {
  const { t } = useTranslation(TRANSLATION_FILE)
  const { foregroundSecondary, highlight } = useTheme()
  const message = useMemo(() => getRandomAffirmation(t, index), [
    index,
    t,
  ])

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
      <HeaderL>{message}</HeaderL>
    </Box>
  )
}

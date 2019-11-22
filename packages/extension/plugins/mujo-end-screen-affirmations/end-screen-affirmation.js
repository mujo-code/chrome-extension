import { Box } from '@mujo/box'
import { context, EndScreen } from '@mujo/plugins'
import { HeaderL, useTheme } from '@mujo/ui'
import React, { useEffect, useMemo, useContext } from 'react'
import { Extension } from '@mujo/utils'
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

export const EndScreenAffirmation = ({ close, index }) => {
  const { useTranslation } = Extension
  const { t } = useTranslation()
  const { foregroundSecondary, highlight } = useTheme()
  const message = useMemo(() => getRandomAffirmation(t, index), [
    t,
    index,
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

export const EndScreenComponent = () => {
  const { constants } = useContext(context)
  return (
    <EndScreen
      type={constants.DEFAULT_END_SCREEN}
      Component={EndScreenAffirmation}
    />
  )
}

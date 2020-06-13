import { BodyS, HeaderS, Box } from '@mujo/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_FILE } from '../../constants'

export const Message = ({ errorId }) => {
  const { t } = useTranslation(TRANSLATION_FILE)
  return (
    <>
      <HeaderS maxWidth="500px" color="mischka">
        {t('sorry-for-issue')}
      </HeaderS>
      <BodyS maxWidth="500px" color="mischka">
        {t('created-an-issue')}
        <Box Component="span" color="saltBox">
          ${errorId}
        </Box>
        {t('error-persists')}
      </BodyS>
    </>
  )
}

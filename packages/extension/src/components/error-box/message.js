import { Box } from '@mujo/box'
import { BodyS, HeaderS } from '@mujo/ui'
import React from 'react'
import { Extension } from '@mujo/utils'

export const Message = ({ errorId }) => {
  const { useTranslation } = Extension
  const { t } = useTranslation()
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

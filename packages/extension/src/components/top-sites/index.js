import { css } from '@emotion/core'
import { Box } from '@mujo/box'
import { Tab } from '@mujo/plugins'
import { Extension } from '@mujo/utils'
import { useTheme, ToolTip, HeaderS } from '@mujo/ui'
import React, { useState } from 'react'
import { useExtension } from '../../hooks/use-extension'
import { FavRows } from '../fav-rows'

const siteWrapper = css({
  transition: 'all 0.5s ease-in 0.2s',
  opacity: 0,
  transform: 'scale(0.9)',
  ':not(:empty)': {
    opacity: 1,
    transform: 'scale(1)',
  },
})

export const TopSites = () => {
  const { topSites, updateSitesUsed } = useExtension()
  const [toolTipOpen, setToolTipOpen] = useState(false)
  const { foreground } = useTheme()
  const { useTranslation } = Extension
  const { t } = useTranslation()

  return (
    <Tab name={t('top-sites')}>
      <Box
        display="flex"
        flex={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        position="relative"
        layer="1"
        {...siteWrapper}
      >
        <HeaderS
          position="relative"
          cursor="pointer"
          color={foreground}
          onMouseLeave={() => setToolTipOpen(false)}
          onMouseEnter={() => setToolTipOpen(true)}
        >
          {t('top-sites')}
          <ToolTip isOpen={toolTipOpen}>
            {t('top-sites-usage')}
          </ToolTip>
        </HeaderS>
        {topSites.length ? (
          <FavRows
            items={topSites}
            updateSitesUsed={updateSitesUsed}
          />
        ) : null}
      </Box>
    </Tab>
  )
}

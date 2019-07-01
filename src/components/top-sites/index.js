import { Box } from '@jcblw/box'
import { css } from 'glamor'
import React, { useState } from 'react'
import { useTheme } from '../../hooks/use-theme'
import { FavRows } from '../fav-rows'
import { HeaderS } from '../fonts'
import { ToolTip } from '../tool-tip'

const siteWrapper = css({
  transition: 'all 0.5s ease-in 0.2s',
  opacity: 0,
  transform: 'scale(0.9)',
  ':not(:empty)': {
    opacity: 1,
    transform: 'scale(1)',
  },
})

export const TopSites = ({ topSites, updateSitesUsed }) => {
  const [toolTipOpen, setToolTipOpen] = useState(false)
  const { foreground } = useTheme()
  return (
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
        Top Sites
        <ToolTip isOpen={toolTipOpen}>
          Top sites is based on your site usage
        </ToolTip>
      </HeaderS>
      {topSites.length ? (
        <FavRows items={topSites} updateSitesUsed={updateSitesUsed} />
      ) : null}
    </Box>
  )
}

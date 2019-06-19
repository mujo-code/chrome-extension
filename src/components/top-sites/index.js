import { Box } from '@jcblw/box'
import { css } from 'glamor'
import React from 'react'
import { FavRows } from '../fav-rows'
import { HeaderS } from '../fonts'

const siteWrapper = css({
  transition: 'all 0.5s ease-in 0.2s',
  opacity: 0,
  transform: 'scale(0.9)',
  ':not(:empty)': {
    opacity: 1,
    transform: 'scale(1)',
  },
})

export const TopSites = ({ topSites, updateSitesUsed }) => (
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
    <HeaderS color="outerSpace">Top Sites</HeaderS>
    {topSites.length ? (
      <FavRows items={topSites} updateSitesUsed={updateSitesUsed} />
    ) : null}
  </Box>
)

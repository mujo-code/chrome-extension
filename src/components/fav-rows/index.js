import { Box } from '@mujo/box'
import React from 'react'
import { FavButton } from '../fav-button'

const createNArray = n => Array.from(new Array(n)).map(() => [])

const createRows = items => {
  const rows = createNArray(Math.min(items.length, 5))

  let cursor = 0
  items.forEach(item => {
    rows[cursor].push(item)
    cursor = cursor + 1 === rows.length ? 0 : cursor + 1
  })
  return rows
}

export const FavRows = ({ items, updateSitesUsed }) => {
  const rows = createRows(items)
  return (
    <Box display="flex" flexWrap="wrap">
      {rows.map((column, i) => (
        <Box
          key={`row-${i}`}
          flex={1}
          display="flex"
          direction="column"
          padding="s"
          maxWidth="xxl"
          maxHeight="xxl"
          height="xxl"
          width="xxl"
        >
          {column.map(item => (
            <FavButton
              key={item.title}
              marginBottom="m"
              url={item.url}
              title={item.title}
              disabled={item.isUsed}
              onClick={e => {
                const url = e.currentTarget.href
                if (url) {
                  updateSitesUsed(item)
                  window.location = url
                }
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  )
}

FavRows.defaultProps = { items: [] }

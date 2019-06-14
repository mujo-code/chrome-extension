import { Box } from '@jcblw/box'
import React, { useState } from 'react'
import { Graph } from '../graph'

const parseUrl = url =>
  new URL(url).hostname
    .split('.')
    .slice(-2)
    .join('.')

const aggregateData = (data, amount = 5) => {
  const iterable = Object.keys(data)
  const totals = iterable
    .map(key => data[key])
    .reduce((total, value) => {
      total += value
      return total
    }, 0)
  return iterable
    .map(key => {
      const percent = data[key] / totals
      return {
        label: parseUrl(key),
        percent,
        originalData: { [key]: data[key] },
      }
    })
    .sort((prev, next) => next.percent - prev.percent)
    .reduce((accum, next, i, all) => {
      const oneIndex = i + 1
      if (oneIndex < amount) {
        accum.push(next)
      } else if (oneIndex === amount) {
        const combinedTotal = all.slice(i).reduce((total, seg) => {
          total += seg.percent
          return total
        }, 0)
        accum.push({
          label: 'other',
          percent: combinedTotal,
          originalData: all.slice(i),
        })
      }
      return accum
    }, [])
}

export const ScreenTime = ({ data }) => {
  const graphData = aggregateData(data)
  const [selectedSegment, setSelectedSegment] = useState(null)
  return (
    <Box flex="0">
      <Graph
        data={graphData}
        width={500}
        height={500}
        textFill="mischka"
        stroke="saltBox"
        onSegmentSelect={seg => {
          // TODO: on click set segment into state,
          // show time underneath graph
          setSelectedSegment(seg.originalData)
        }}
      />
      {selectedSegment ? (
        <Box>
          {Object.keys(selectedSegment)[0]}:{' '}
          {Object.values(selectedSegment)[0]}
        </Box>
      ) : null}
    </Box>
  )
}

ScreenTime.defaultProps = { data: {} }

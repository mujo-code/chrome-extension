import { Box } from '@jcblw/box'
import React from 'react'
import { createGraphAttibutes } from './attributes'

const sampleData = [
  { label: 'Google', percent: 0.35 },
  { label: 'Facebook', percent: 0.25 },
  { label: 'Stack-Overflow', percent: 0.1 },
  { label: 'Twitter', percent: 0.1 },
  { label: 'Other', percent: 0.2 },
]

export const Graph = ({
  data,
  width,
  height,
  radius,
  spacingAngle,
  labelRadiusOffest,
  textFill,
  stroke,
  strokeWidth,
  strokeLinecap,
  rotateGraph,
  onSegmentClick,
}) => {
  const center = [width / 2, height / 2]
  const segments = createGraphAttibutes({
    data,
    radius,
    center,
    spacingAngle,
    labelRadiusOffest,
    rotateGraph,
  })
  return (
    <Box
      Component="svg"
      width={`${width}px`}
      height={`${height}px`}
      style={{ width, height }}
    >
      <Box
        Component="g"
        transform={`rotate(${rotateGraph}, ${center[0]}, ${
          center[1]
        })`}
      >
        {segments.map((seg, i) => (
          <Box
            key={`path-${i}`}
            fill="transparent"
            strokeWidth={strokeWidth}
            stroke={stroke}
            strokeLinecap={strokeLinecap}
            Component="path"
            onClick={onSegmentClick.bind(null, seg)}
            {...seg.path}
          />
        ))}
      </Box>
      <Box Component="g">
        {segments.map((seg, i) => (
          <Box
            key={`label-${i}`}
            fill={textFill}
            Component="text"
            onClick={onSegmentClick.bind(null, seg)}
            {...seg.label}
          />
        ))}
      </Box>
    </Box>
  )
}

Graph.defaultProps = {
  width: 350,
  height: 350,
  spacingAngle: 20,
  labelRadiusOffest: 20,
  radius: 200,
  data: sampleData,
  strokeWidth: 16,
  textFill: 'outerSpace',
  stroke: 'saltBox',
  strokeLinecap: 'square',
  rotateGraph: -90,
  onSegmentClick: () => {},
}

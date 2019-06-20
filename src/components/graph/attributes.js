const angleToRadian = angle => angle * (Math.PI / 180)

const getCirclePoint = (center, radius) => angle => {
  const radian = angleToRadian(angle)
  const x = center[0] + radius * Math.cos(radian)
  const y = center[1] + radius * Math.sin(radian)
  return { x, y }
}

const angleOfPercent = percent => 360 * percent
const toPercents = segment => segment.percent
const zipData = originalData => (angles, i) => ({
  angles,
  label: originalData[i].label,
  originalData: originalData[i].originalData,
})

const getPathAttributes = ({ angles, getInnerPoint, radius }) => {
  const startPoint = getInnerPoint(angles[0])
  const endPoint = getInnerPoint(angles[1])
  const largeArcFlag = angles[1] - angles[0] <= 180 ? '0' : '1'
  const sweepFlag = angles[1] - angles[0] <= 0 ? '0' : '1'
  const d = `M ${startPoint.x} ${
    startPoint.y
  } A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${
    endPoint.x
  } ${endPoint.y}
  `
  return { d }
}

const getLabelAttributes = ({
  label,
  angles,
  center,
  getOuterPoint,
  rotateGraph,
}) => {
  const fullAngle = angles[1] - angles[0]
  const labelPoint = getOuterPoint(
    angles[0] + fullAngle / 2 + rotateGraph
  )
  const textAnchor = labelPoint.x > center[0] ? 'start' : 'end'
  const alignmentBaseline =
    labelPoint.y > center[1] ? 'hanging' : 'baseline'
  return {
    children: label,
    x: labelPoint.x,
    y: labelPoint.y,
    textAnchor,
    alignmentBaseline,
  }
}

const createSegmentAttributes = ({
  getInnerPoint,
  getOuterPoint,
  radius,
  center,
  rotateGraph,
}) => ({ angles, label, originalData }) => {
  const path = getPathAttributes({ angles, getInnerPoint, radius })
  const text = getLabelAttributes({
    label,
    angles,
    center,
    getOuterPoint,
    rotateGraph,
  })
  return { path, label: text, originalData }
}

const reduceAngles = spacingAngle => (angles, angle, i) => {
  let startAngle
  if (angle < 0 || angle < spacingAngle) {
    // NOTE: these are tiny angles, ones that just will not render
    angles.push([undefined, undefined, angle])
    return angles
  }
  if (!i) {
    startAngle = 0
  } else {
    startAngle = angles[angles.length - 1][1] + spacingAngle
  }
  angles.push([startAngle, startAngle + angle])
  return angles
}

const defaultOptions = {
  radius: 70,
  center: [150, 150],
  labelRadiusOffest: 20,
  spacingAngle: 20,
  rotateGraph: -90,
}

export const createGraphAttibutes = (passedOptions = {}) => {
  const {
    data,
    radius,
    center,
    labelRadiusOffest,
    spacingAngle,
    rotateGraph,
  } = Object.assign({}, defaultOptions, passedOptions)

  const getInnerPoint = getCirclePoint(center, radius)
  const getOuterPoint = getCirclePoint(
    center,
    radius + labelRadiusOffest
  )
  const removeSpacing = angle => angle - spacingAngle

  let lastAggregated = false

  const sortedData = data.sort(
    (next, prev) => prev.percent - next.percent
  )

  return sortedData
    .map(toPercents)
    .map(angleOfPercent)
    .map(removeSpacing)
    .reduce(reduceAngles(spacingAngle), [])
    .map(zipData(sortedData))
    .reduce((accum, segment, i, allSegments) => {
      if (lastAggregated) return accum
      if (segment.angles[1]) {
        accum.push(segment)
      } else {
        const rest = allSegments.slice(i)
        const last = allSegments[i - 1]
        let startAngle = last.angles[1] + spacingAngle
        let endAngle = 360 - spacingAngle
        if (endAngle < startAngle) {
          const middle = (360 - last.angles[1]) / 2
          startAngle = 360 - middle - 0.5
          endAngle = 360 - middle + 0.5
        }
        accum.push({
          label: 'other',
          angles: [startAngle, endAngle],
          originalData: Object.assign(
            {},
            ...rest.map(r => r.originalData)
          ),
        })
        lastAggregated = true
      }
      return accum
    }, [])
    .map(
      createSegmentAttributes({
        getInnerPoint,
        getOuterPoint,
        radius,
        center,
        rotateGraph,
      })
    )
}

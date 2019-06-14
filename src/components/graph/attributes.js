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
  const sweepFlag = angles[1] - angles[0] <= 180 ? '1' : '0'
  console.log({ fullAngle: angles[1] - angles[0], angles })
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

  console.log(data)

  return data
    .map(toPercents)
    .map(angleOfPercent)
    .map(removeSpacing)
    .reduce((angles, angle, i) => {
      let startAngle
      if (!i) {
        startAngle = 0
      } else {
        startAngle = angles[i - 1][1] + spacingAngle
      }
      if (startAngle > startAngle + angle) {
        console.log({ startAngle, angle })
      }
      angles.push([startAngle, startAngle + angle])
      return angles
    }, [])
    .map(zipData(data))
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

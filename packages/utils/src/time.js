// format MS to M, S, H
export const factor = (units, conv) => Math.floor(units / conv)

export const getTime = ms => {
  const seconds = factor(ms, 1000)
  const minutes = factor(seconds, 60)
  const hours = factor(minutes, 60)
  return {
    hours,
    minutes: minutes - hours * 60,
    seconds: seconds - minutes * 60,
    ms: ms - seconds * 1000,
  }
}

export const minutesToMS = minutes => minutes * 60 * 1000
export const msToMinutes = ms => factor(factor(ms, 1000), 60)

export const readableTime = num => {
  if (typeof num !== 'number') {
    throw new Error(
      `Children must be a "number" in <Time /> Component got: ${typeof num}`
    )
  }
  const time = getTime(num)
  const timeStr = [] // but array 🤔
  if (time.hours) {
    timeStr.push(`${time.hours} hour${time.hours > 1 ? 's' : ''}`)
  }
  if (time.minutes) {
    timeStr.push(`${time.minutes} minute${time.minutes > 1 ? 's' : ''}`)
  }
  if (time.seconds) {
    timeStr.push(`${time.seconds} second${time.seconds > 1 ? 's' : ''}`)
  }
  if (timeStr.length === 0) {
    return `${Math.floor(time.ms)} milliseconds`
  }
  return [timeStr.slice(0, -1).join(', '), timeStr.pop()]
    .filter(x => x)
    .join(' and ')
}

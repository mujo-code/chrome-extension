const reset = '\x1b[0m'
const cyan = '\x1b[36m'
const formatDate = date =>
  `${date.getHours()}h:${date.getMinutes()}m:${date.getSeconds()}s\x1b[0m`

const last = new Date()
const timeTaken = () => {
  const now = new Date()
  return `${+now - +last}ms`.padStart(4, '')
}

const logger = label => str => {
  const prefix = `${label || formatDate(new Date())}:`.padEnd(15, ' ')
  console.log(
    `${cyan}${prefix}${reset} ${str} - ${cyan}${timeTaken()}${reset}`
  )
}

module.exports.log = logger()

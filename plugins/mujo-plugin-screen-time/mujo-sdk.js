import ky from 'ky-universal'

let identity

export const getOptions = ({
  method,
  json,
  searchParams,
  apiHost,
}) => ({
  method,
  json,
  searchParams,
  prefixUrl: `${apiHost}/api`,
  headers: {
    'request-origin': `Mujo Chrome Extension - ${process.env
      .VERSION || 'no-version'}`,
    'mujo-identity': identity,
  },
})

export const http = async ({
  endpoint,
  method,
  searchParams,
  json,
  version,
  apiHost,
}) => {
  console.log(
    getOptions({ method, searchParams, json, version, apiHost })
  )
  const resp = await ky(
    endpoint,
    getOptions({ method, searchParams, json, version, apiHost })
  )
  return resp.json()
}

export const identify = async id => {
  identity = id
  return id
}

export const availableAPIs = [
  { method: 'getBreaks', endpoint: 'breaks.js', type: 'get' },
  { method: 'addActivity', endpoint: 't.js', type: 'get' },
  { method: 'postActivity', endpoint: 'activity.js', type: 'post' },
]

const typesFrom = ({ apiHost }) => ({
  post: endpoint => json =>
    http({ endpoint, method: 'post', json, apiHost }),
  get: endpoint => params => {
    const searchParams = new URLSearchParams()
    Object.keys(params || {}).forEach(key => {
      searchParams.append(key, params[key])
    })
    return http({
      endpoint,
      method: 'get',
      searchParams,
      apiHost,
    })
  },
})

export const apiFrom = ({ apiHost, version }) => {
  const types = typesFrom({ apiHost, version })
  return availableAPIs.reduce((accum, { method, endpoint, type }) => {
    Object.assign(accum, { [method]: types[type](endpoint) })
    return accum
  }, {})
}

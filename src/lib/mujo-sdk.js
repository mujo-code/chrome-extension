import ky from 'ky-universal'
import { API_HOST, VERSION } from '../constants'

let identity

export const getOptions = ({ method, json, searchParams }) => ({
  method,
  json,
  searchParams,
  prefixUrl: `${API_HOST}/api`,
  headers: {
    'request-origin': `Mujo Chrome Extension - ${VERSION}`,
    'mujo-identity': identity,
  },
})

export const http = async ({
  endpoint,
  method,
  searchParams,
  json,
}) => {
  const resp = await ky(
    endpoint,
    getOptions({ method, searchParams, json })
  )
  return resp.json()
}

export const identify = async id => {
  identity = id
}

export const availableAPIs = [
  { method: 'getBreaks', endpoint: 'breaks.js', type: 'get' },
  { method: 'postActivity', endpoint: 'activity.js', type: 'post' },
]

const types = {
  post: endpoint => json => http({ endpoint, method: 'post', json }),
  get: endpoint => searchParams =>
    http({ endpoint, method: 'get', searchParams }),
}

export const api = availableAPIs.reduce(
  (accum, { method, endpoint, type }) => {
    Object.assign(accum, { [method]: types[type](endpoint) })
    return accum
  },
  {}
)

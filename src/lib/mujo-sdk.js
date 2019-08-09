import { http } from './http'

export const identify = async id => {
  http.identify(id)
}

export const availableAPIs = [
  { method: 'getBreaks', endpoint: 'breaks.js', type: 'get' },
  { method: 'postActivity', endpoint: 'activity.js', type: 'post' },
]

const types = {
  post: endpoint => body => http.post(`/api/${endpoint}`, { body }),
  get: endpoint => body => http.get(`/api/${endpoint}`, { body }),
}

export const api = availableAPIs.reduce(
  (accum, { method, endpoint, type }) => {
    Object.assign(accum, { [method]: types[type](endpoint) })
    return accum
  },
  {}
)

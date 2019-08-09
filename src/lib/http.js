import { API_HOST, VERSION } from '../constants'

let id

const request = async (
  endpoint,
  { method = 'GET', body, headers = {} }
) => {
  const url = `${API_HOST}${endpoint}`
  const strBody = JSON.stringify(body)
  const defaultHeaders = {
    'content-type': 'application/json',
    'request-origin': `Mujo Chrome Extension - ${VERSION}`,
    'mujo-identity': id,
  }
  const resp = await fetch(url, {
    method,
    headers: Object.assign({}, defaultHeaders, headers),
    body: strBody,
  })
  if (!resp.ok) {
    const error = new Error('Fetch error:', resp.statusText)
    error.response = resp
    throw error
  }
  return resp.json()
}

export const requestMethod = method => (
  endpoint,
  { body, headers }
) => request(endpoint, { method, body, headers })

export const http = {
  post: requestMethod('POST'),
  get: requestMethod('GET'),
  put: requestMethod('PUT'),
  delete: requestMethod('DELETE'),
  identify: currentId => {
    id = currentId
  },
}

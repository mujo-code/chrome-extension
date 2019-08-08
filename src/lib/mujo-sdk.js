import Got from 'got'
import { API_HOST, VERSION } from '../constants'
import { compose } from './functional'

const makeGot = compose(
  Got.mergeOptions.bind(Got),
  Got.extend.bind(Got)
)

const options = {
  json: true,
  baseUrl: API_HOST,
  headers: { 'user-agent': `Mujō extension - ${VERSION}` },
}

let got = makeGot(options)

export const identify = async id => {
  const opts = { headers: { 'mujo-identity': id } }
  got = makeGot(options, opts)
  const ogPost = got.post
  got.post = (...args) => console.log(...args) || ogPost(...args)
}

export const availableAPIs = [
  { method: 'todaysBreaks', endpoint: 'todays-breaks.js' },
]

const postAPI = endpoint => body =>
  got.post(`/api/${endpoint}`, { body })

export const api = availableAPIs.reduce(
  (accum, { method, endpoint }) => {
    Object.assign(accum, { [method]: postAPI(endpoint) })
    return accum
  },
  {}
)

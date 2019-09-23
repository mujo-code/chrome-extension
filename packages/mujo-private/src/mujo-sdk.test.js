/* eslint-disable import-order-alphabetical/order */
import { API_HOST } from './constants'
import { getOptions, http, identify, api } from './mujo-sdk'

jest.mock('ky-universal')
jest.mock('../env')
const ky = require('ky-universal')

process.env.VERSION = 'foo'
const { VERSION } = process.env

test('getOptions should return some default header and prefixUrl', () => {
  const json = 'foo'
  const searchParams = 'bar'
  const method = 'baz'
  const options = getOptions({ json, searchParams, method })
  expect(options).toEqual({
    method,
    json,
    searchParams,
    prefixUrl: `${API_HOST}/api`,
    headers: {
      'request-origin': `Mujo Chrome Extension - ${VERSION}`,
      'mujo-identity': undefined,
    },
  })
})

test('http should call ky', async () => {
  ky.mockReset().mockResolvedValue({ json: jest.fn() })
  await http({ endpoint: 'foo', method: 'get', json: 'bar' })
  expect(ky).toBeCalledWith('foo', {
    method: 'get',
    json: 'bar',
    searchParams: undefined,
    prefixUrl: `${API_HOST}/api`,
    headers: {
      'request-origin': `Mujo Chrome Extension - ${VERSION}`,
      'mujo-identity': undefined,
    },
  })
})

test('identify should set the identity in the header', () => {
  identify('foo')
  const options = getOptions({})
  expect(options.headers['mujo-identity']).toBe('foo')
})

test('api.getBreaks should call the breaks endpoint', async () => {
  ky.mockReset().mockResolvedValue({ json: jest.fn() })
  await api.getBreaks()
  expect(ky.mock.calls[0][0]).toBe('breaks.js')
})

test('api.postActivity should call the breaks endpoint', async () => {
  ky.mockReset().mockResolvedValue({ json: jest.fn() })
  await api.postActivity()
  expect(ky.mock.calls[0][0]).toBe('activity.js')
})

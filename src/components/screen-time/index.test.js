/* eslint-disable import-order-alphabetical/order */
import React from 'react'
import { create } from 'react-test-renderer'
import { ScreenTime } from '.'

const stampURLData = time => ({ time, breakTimer: {} })

jest.mock('../../hooks/use-extension')
jest.mock('@mujo/plugins')
const { Tab } = require('@mujo/plugins')
const { useExtension } = require('../../hooks/use-extension')

beforeEach(() => {
  Tab.mockImplementation(({ children }) => <>{children}</>)
})

test('ScreenTime should match snapshot', () => {
  const siteTimesAndTimers = {
    'https://foo.com': stampURLData(28619.509999931324),
    'https://mail.bar.com': stampURLData(30.375000031664968),
    'https://web.baz.com': stampURLData(21890.895000076387),
    'https://www.bar.com': stampURLData(32021.97000005981),
    'https://developer.qux.com': stampURLData(2462.855000048876),
    'https://my.foobar.com': stampURLData(1728.3849999657832),
  }
  useExtension.mockReturnValue({ siteTimesAndTimers, screenTime: {} })
  const tree = create(<ScreenTime />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ScreenTime should match snapshot with a selected segment', () => {
  const siteTimesAndTimers = {
    'https://foo.com': stampURLData(6619.509999931324),
    'https://mail.bar.com': stampURLData(3230.375000031664968),
  }
  const selectedSegment = {
    label: 'foo.com',
    data: {
      originURL: 'https://foo.com',
      breakTimer: {},
      time: 6619.509999931324,
    },
    urls: ['https://foo.com'],
  }
  useExtension.mockReturnValue({
    siteTimesAndTimers,
    selectedSegment,
    screenTime: {},
  })
  const tree = create(<ScreenTime />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ScreenTime should match snapshot with a grouped selected segment', () => {
  const siteTimesAndTimers = {
    'https://foo.com': stampURLData(6619.509999931324),
    'https://mail.bar.com': stampURLData(3230.375000031664968),
  }
  const selectedSegment = {
    label: 'qux',
    urls: ['https://foo.com', 'https://main.bar.com'],
  }
  useExtension.mockReturnValue({
    siteTimesAndTimers,
    selectedSegment,
    screenTime: {},
  })
  const tree = create(<ScreenTime />).toJSON()
  expect(tree).toMatchSnapshot()
})

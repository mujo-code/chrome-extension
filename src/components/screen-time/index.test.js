import React from 'react'
import { create } from 'react-test-renderer'
import { ScreenTime } from '.'

const stampURLData = time => ({ time, breakTimer: {} })

test('ScreenTime should match snapshot', () => {
  const mockData = {
    'https://foo.com': stampURLData(28619.509999931324),
    'https://mail.bar.com': stampURLData(30.375000031664968),
    'https://web.baz.com': stampURLData(21890.895000076387),
    'https://www.bar.com': stampURLData(32021.97000005981),
    'https://developer.qux.com': stampURLData(2462.855000048876),
    'https://my.foobar.com': stampURLData(1728.3849999657832),
  }
  const tree = create(<ScreenTime data={mockData} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ScreenTime should match snapshot with a selected segment', () => {
  const mockData = {
    'https://foo.com': stampURLData(6619.509999931324),
    'https://mail.bar.com': stampURLData(3230.375000031664968),
  }
  const mockSelectedSegment = {
    label: 'foo.com',
    data: {
      originURL: 'https://foo.com',
      breakTimer: {},
      time: 6619.509999931324,
    },
    urls: ['https://foo.com'],
  }
  const tree = create(
    <ScreenTime
      data={mockData}
      selectedSegment={mockSelectedSegment}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ScreenTime should match snapshot with a grouped selected segment', () => {
  const mockData = {
    'https://foo.com': stampURLData(6619.509999931324),
    'https://mail.bar.com': stampURLData(3230.375000031664968),
  }
  const mockSelectedSegment = {
    label: 'qux',
    urls: ['https://foo.com', 'https://main.bar.com'],
  }
  const tree = create(
    <ScreenTime
      data={mockData}
      selectedSegment={mockSelectedSegment}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

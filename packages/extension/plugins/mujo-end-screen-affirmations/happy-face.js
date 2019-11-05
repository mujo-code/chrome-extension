import { Box } from '@mujo/box'
import React from 'react'

export const HappyFace = ({
  background = '#fff',
  foreground = '#000',
  ...otherProps
}) => (
  <Box
    Component="svg"
    css={{ width: 116, height: 86 }}
    xmlns="http://www.w3.org/2000/svg"
    {...otherProps}
  >
    <Box
      Component="g"
      transform="translate(-1)"
      fillRule="nonzero"
      fill="none"
    >
      <Box
        Component="circle"
        fill={background}
        cx="59"
        cy="43"
        r="43"
      />
      <Box
        Component="path"
        d={[
          'M109.405 37.11',
          'a4 4 0 1 1 7.05 3.782',
          'c-9.898 18.45-29.28 27.609-57.49 27.609',
          's-47.593-9.159-57.49-27.61',
          'a4 4 0 1 1 7.05-3.781',
          'c8.34 15.55 24.936 23.39 50.44 23.39 ',
          '25.504 0 42.099-7.84 50.44-23.39',
          'z',
        ].join('')}
        fill={foreground}
      />
      <Box
        Component="path"
        d={[
          'M79 36.412',
          'c7.18 0 13.055 6.225 13.055-2.93 0-9.156-5.875-4-13.055-4',
          's-12.937-5.294-12.937 3.89 5.757 3.04 12.937 3.04',
          'z',
          'M39 36.412',
          'c7.18 0 13.055 6.225 13.055-2.93 0-9.156-5.875-4-13.055-4',
          's-12.937-5.294-12.937 3.89 5.757 3.04 12.937 3.04z',
        ].join('')}
        fill={foreground}
      />
    </Box>
  </Box>
)

import { Box } from '@mujo/box'
import React from 'react'
import { FixedS, FixedL } from '../fonts'

const FN_SIZE = 25

const makeNiceFilenames = filename => filename.split('/').pop()
const makeNiceFunctionNames = fnName =>
  `at ${fnName}`.padStart(FN_SIZE, ' ')

export const Frames = ({ frames, error }) => (
  <>
    <FixedL marginTop="xxs" marginBottom="xxs" color="white">
      {error.message}
    </FixedL>
    {frames.map((f, index) => (
      <Box
        marginTop="xxs"
        marginBottom="xxs"
        key={index}
        display="flex"
        direction="row"
      >
        <FixedS
          Component="pre"
          marginTop="zero"
          marginBottom="zero"
          marginRight="m"
          color="saltBox"
        >
          {makeNiceFunctionNames(f.functionName)}
        </FixedS>
        <FixedS marginTop="zero" marginBottom="zero" color="white">
          ({makeNiceFilenames(f.fileName)}:{f.lineNumber})
        </FixedS>
      </Box>
    ))}
  </>
)

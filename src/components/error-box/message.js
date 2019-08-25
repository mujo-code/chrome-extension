import { Box } from '@mujo/box'
import React from 'react'
import { BodyS, HeaderS } from '../fonts'

export const Message = ({ errorId }) => (
  <>
    <HeaderS maxWidth="500px" color="mischka">
      We are sorry for this issue
    </HeaderS>
    <BodyS maxWidth="500px" color="mischka">
      We have created a issue for this error{' '}
      <Box Component="span" color="saltBox">
        ${errorId}
      </Box>
      , and will be working to resolve it. If the problem presist,
      please contact us at jacoblowe2.0@gmail.com
    </BodyS>
  </>
)

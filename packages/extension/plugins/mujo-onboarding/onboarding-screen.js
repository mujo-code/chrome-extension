import { Box } from '@mujo/box'
import { HeaderL, BodyL } from '@mujo/ui'
import React from 'react'

export const OnboardingScreen = ({ icon, title, description }) => (
  <Box
    maxWidth="600px"
    display="flex"
    height="300px"
    direction="row"
    justifyContent="center"
    alignItems="center"
    margin="l"
  >
    {icon ? <Box flex="1">{icon}</Box> : null}
    <Box flex="1" display="flex" textAlign="left" direction="column">
      <HeaderL>{title}</HeaderL>
      <BodyL>{description}</BodyL>
    </Box>
  </Box>
)

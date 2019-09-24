import React from 'react'
import { BodyS } from '../fonts'

export const PurchaseError = props => (
  <BodyS
    key="0"
    backgroundColor="saltBox"
    color="white"
    padding="s"
    borderRadius="l"
    marginBottom={props.marginBottom}
  >
    {props.t('unable-to-process')}
  </BodyS>
)

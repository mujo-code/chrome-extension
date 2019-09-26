import { BodyS } from '@mujo/ui'
import React from 'react'

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

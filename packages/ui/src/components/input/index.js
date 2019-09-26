import { Box } from '@mujo/box'
import { removeKeys } from '@mujo/box/dist/lib/remove-keys'
import { Util } from '@mujo/utils'
import React from 'react'
import { useTheme } from '../../hooks/use-theme'
import { HeaderS } from '../fonts'

const { toDashCase } = Util

export const Input = props => {
  const { foreground, background } = useTheme()
  const { label, id: propsId, marginTop } = props
  const id = propsId || toDashCase(label)
  const otherProps = removeKeys(props, 'label', 'id', 'marginTop')
  return (
    <Box display="flex" direction="column">
      <HeaderS
        Component="label"
        htmlFor={id}
        color={foreground}
        marginBottom="zero"
        marginTop={marginTop}
      >
        <Box Component="small">{label}</Box>
      </HeaderS>
      <Box
        color={props.color || background}
        backgroundColor={props.backgroundColor || foreground}
        border="none"
        marginTop="xs"
        id={id}
        {...otherProps}
      />
    </Box>
  )
}

Input.defaultProps = {
  Component: 'input',
  type: 'text',
  paddingLeft: 'm',
  paddingRight: 'm',
  paddingTop: 'xs',
  paddingBottom: 'xs',
  marginTop: 'm',
  marginBottom: 'm',
  borderRadius: 's',
  label: 'Label is Required',
}

import { Box } from '@jcblw/box'
import React from 'react'
import {
  headerL,
  headerS,
  bodyL,
  bodyS,
  fixedL,
  fixedS,
} from './styles'

const additionalStyles = { ' sup': { fontSize: '0.6em' } }

const FontBox = props => (
  <Box
    Component={props.Component || 'p'}
    color={props.color || 'color'}
    marginTop={props.marginTop || 'm'}
    marginBottom={props.marginBottom || 'm'}
    css={additionalStyles}
    {...props}
  />
)

export const HeaderL = props => (
  <FontBox Component="h2" {...headerL} {...props} />
)

export const HeaderS = props => (
  <FontBox
    Component="h4"
    marginTop="s"
    marginBottom="s"
    {...headerS}
    {...props}
  />
)

export const BodyL = props => <FontBox {...bodyL} {...props} />

export const BodyS = props => <FontBox {...bodyS} {...props} />

export const Link = props => (
  <FontBox
    Component="a"
    color="danube"
    cursor="pointer"
    textDecoration="underline"
    {...props}
  />
)

export const FixedL = props => (
  <FontBox Component="span" {...fixedL} {...props} />
)
export const FixedS = props => (
  <FontBox Component="span" {...fixedS} {...props} />
)

export const Span = props => (
  <FontBox
    Component="span"
    marginTop={props.marginTop || 'zero'}
    marginBottom={props.marginTop || 'zero'}
    {...props}
  />
)

export const Sup = props => (
  <FontBox
    Component="sup"
    marginTop={props.marginTop || 'zero'}
    marginBottom={props.marginTop || 'zero'}
    {...props}
  />
)

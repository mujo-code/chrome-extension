import { Global, css } from '@emotion/core'
import { omitKeys } from '@mujo/box'
import React from 'react'
import { Box } from '../box'

const sup = { ' sup': { fontSize: '0.6em' } }

export const Font = props => (
  <Global
    styles={css`
      #mujo-extension *,
      .mujo-modal * {
        font-family: 'IBM Plex Sans', sans-serif;
        --webkit-font-smoothing: antialiased;
        --moz-osx-font-smoothing: grayscale;
      }
    `}
  />
)

const FontBox = props => {
  const otherProps = omitKeys(
    props,
    'Component',
    'color',
    'marginTop',
    'marginBottom',
    'css'
  )
  const overrides = Array.isArray(props.css) ? props.css : [props.css]
  return (
    <Box
      Component={props.Component || 'p'}
      color={props.color || 'color'}
      marginTop={props.marginTop || 'm'}
      marginBottom={props.marginBottom || 'm'}
      css={[sup, ...overrides]}
      {...otherProps}
    />
  )
}

export const HeaderL = props => (
  <FontBox Component="h2" font="headerL" {...props} />
)

export const HeaderS = props => (
  <FontBox
    Component="h4"
    marginTop="s"
    marginBottom="s"
    font="headerS"
    {...props}
  />
)

export const BodyL = props => <FontBox font="bodyL" {...props} />

export const BodyS = props => <FontBox font="bodyS" {...props} />

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
  <FontBox Component="span" font="fixedL" {...props} />
)
export const FixedS = props => (
  <FontBox Component="span" font="fixedS" {...props} />
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

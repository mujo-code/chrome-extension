import React from 'react';
import { headerL, headerS, bodyL, bodyS } from './styles';
import { Box } from '@jcblw/box';

export const HeaderL = props => (
  <Box
    Component="h2"
    color="nevada"
    marginTop="m"
    marginBottom="m"
    {...headerL}
    {...props}
  />
);

export const HeaderS = props => (
  <Box
    Component="h4"
    color="nevada"
    marginTop="s"
    marginBottom="s"
    {...headerS}
    {...props}
  />
);

export const BodyL = props => (
  <Box
    Component="p"
    color="nevada"
    marginTop="m"
    marginBottom="m"
    {...bodyL}
    {...props}
  />
);

export const BodyS = props => (
  <Box
    Component="p"
    color="nevada"
    marginTop="m"
    marginBottom="m"
    {...bodyS}
    {...props}
  />
);

export const Link = props => (
  <Box
    Component="a"
    color="danube"
    cursor="pointer"
    textDecoration="underline"
    {...props}
  />
);

import React, { useState } from 'react';
import { Box } from '@jcblw/box';
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys';

import { headerS } from '../fonts/styles';
import { ToolTip } from '../tool-tip';

const colors = {
  primary: { backgroundColor: 'amethyst' },
  secondary: { backgroundColor: 'danube' },
  tertiary: { backgroundColor: 'mischka' },
};

export const FavButton = props => {
  const { style = 'primary' } = props;
  const restProps = removeKeys(props, 'style', 'url', 'title');
  const { backgroundColor } = colors[style];
  const [tooltipOpen, setToolTipOpen] = useState(false);
  return (
    <Box
      href={props.url}
      Component="a"
      cursor="pointer"
      backgroundColor={backgroundColor}
      display="flex"
      direction="column"
      padding="s"
      border="none"
      borderRadius="l"
      textDecoration="none"
      onMouseEnter={() => setToolTipOpen(true)}
      onMouseLeave={() => setToolTipOpen(false)}
      {...restProps}
    >
      <Box
        Component="img"
        src={`chrome://favicon/${props.url}`}
        width="16px"
        height="16px"
        alt={`${props.title} favicon`}
      />
      <ToolTip isOpen={tooltipOpen}>{props.title}</ToolTip>
    </Box>
  );
};

FavButton.defaultProps = { Component: 'a' };

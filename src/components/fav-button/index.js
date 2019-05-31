import React, { useState } from 'react';
import { css } from 'glamor';
import { Box } from '@jcblw/box';
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys';

import { headerS } from '../fonts/styles';
import { ToolTip } from '../tool-tip';

const colors = {
  primary: { backgroundColor: 'amethyst' },
  secondary: { backgroundColor: 'danube' },
  tertiary: { backgroundColor: 'mischka' },
};

const imageStyles = css({
  opacity: 0,
  transition: 'all 0.3s',
});

const loadedStyles = css({
  opacity: 1,
});

export const FavButton = props => {
  const { style = 'primary' } = props;
  const restProps = removeKeys(props, 'style', 'url', 'title');
  const { backgroundColor } = colors[style];
  const [tooltipOpen, setToolTipOpen] = useState(false);
  const [isServer, setIsServer] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const iconUrl = isServer
    ? `https://mujō.com/api/icon?site=${encodeURIComponent(props.url)}`
    : `chrome://favicon/${props.url}`;
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
        onError={() => setIsServer(false)}
        onLoad={() => {
          setIsLoaded(true);
        }}
        src={iconUrl}
        width="16px"
        height="16px"
        alt={`${props.title}`}
        {...imageStyles}
        {...(isLoaded ? loadedStyles : {})}
      />
      <ToolTip isOpen={tooltipOpen}>{props.title}</ToolTip>
    </Box>
  );
};

FavButton.defaultProps = { Component: 'a' };

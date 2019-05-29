import React, { useState } from 'react';
import { css } from 'glamor';
import { Box } from '@jcblw/box';
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys';

const toolTipWrapper = css({
  top: 0,
  left: '50%',
  height: '1px',
  width: '1px',
  transition: 'all 0.3s ease-in-out',
  transitionDelay: '0s',
  opacity: 0,
  transform: 'translateY(-32px) scale(0)',
});

const toolTipTriangle = css({
  transform: 'rotate(45deg)',
  top: '56%',
  left: '50%',
  marginLeft: '-9px',
  zIndex: '0',
});

const toolTipText = css({
  zIndex: '1',
  fontSize: '12px',
  fontWeight: 'normal',
  lineHeight: 'initial',
});

const toolTipPositions = {
  below: css({
    transform: 'translateY(32px) scale(1)',
    opacity: 1,
    transitionDelay: '0.7s',
  }),
  above: css({
    transform: 'translateY(-72px) scale(1)',
    opacity: 1,
    transitionDelay: '0.7s',
  }),
};

export const ToolTip = props => {
  const { isOpen } = props;
  const restProps = removeKeys(props, 'isOpen', 'children');
  return (
    <Box position="relative">
      <Box
        position="absolute"
        textAlign="center"
        justifyContent="center"
        display="flex"
        {...toolTipWrapper}
        {...(isOpen ? toolTipPositions.above : {})}
      >
        <Box
          Component="span"
          display="table"
          borderRadius="l"
          paddingTop="xs"
          paddingBottom="xs"
          paddingLeft="s"
          paddingRight="s"
          backgroundColor="nevada"
          color="white"
          whiteSpace="nowrap"
          maxWidth="100px"
          position="relative"
          {...props}
        >
          <Box
            display="block"
            backgroundColor="nevada"
            borderRadius="xs"
            padding="xs"
            position="absolute"
            {...toolTipTriangle}
          />
          <Box position="relative" {...toolTipText}>
            {props.children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

ToolTip.defaultProps = { isOpen: false };

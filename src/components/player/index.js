import React from 'react';
import { css } from 'glamor';
import { Box } from '@jcblw/box';
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys';
import { useAnimations, transition } from './use-animations';
import { HeaderL } from '../fonts';

const fadeInGroup = css({
  transition: 'opacity 0.7s ease-in 0.7s',
  opacity: 0,
  ':not(:empty)': {
    opacity: 1,
  },
});

const textTranistions = css({
  transformOrigin: 'center',
  transition: 'all 0.3s ease-out 0s',
  opacity: 0,
  transform: 'scale(0.9)',
});

const fadeInText = css({
  transition: 'all 0.7s ease-in 1s',
  opacity: 1,
  transform: 'scale(1)',
});

export const Player = props => {
  const { isOpen } = props;
  const otherProps = removeKeys(props, 'width', 'height', 'isOpen');
  const [
    { animationProps, isBreathIn },
    { startAnimation, stopAnimation },
  ] = useAnimations(props, isOpen);
  return (
    <Box
      paddingTop={isOpen ? 'none' : 'm'}
      {...transition(props)}
      {...otherProps}
    >
      <Box
        Component="svg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        {...animationProps.svg}
      >
        <Box Component="rect" fill="#353D42" {...animationProps.rect} />
        <Box Component="circle" fill="#756577" {...animationProps.circle2} />
        <Box Component="circle" fill="#EAE2EB" {...animationProps.circle} />
        <Box Component="g" {...fadeInGroup}>
          {isOpen ? (
            <>
              <HeaderL
                Component="text"
                {...textTranistions}
                {...animationProps.text}
                {...(isBreathIn ? fadeInText : {})}
              >
                Breath in
              </HeaderL>
              <HeaderL
                Component="text"
                {...textTranistions}
                {...animationProps.text}
                {...(!isBreathIn ? fadeInText : {})}
              >
                Breath out
              </HeaderL>
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

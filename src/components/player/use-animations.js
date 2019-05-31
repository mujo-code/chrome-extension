import { useEffect, useState } from 'react';
import { css } from 'glamor';
import * as TWEEN from '@tweenjs/tween.js';

let globalIsOpen = false;
const drawLoop = time => {
  if (globalIsOpen) {
    requestAnimationFrame(drawLoop);
    TWEEN.update(time);
  }
};

const random = () => Math.random() * 3;

export const transition = ({ height, width, isOpen }) =>
  css({
    transition: 'all 0.7s',
  });

const toSvgProps = ({ width, height, isOpen }, animating) =>
  css(
    {
      width: isOpen ? '100vw' : width,
      height: isOpen ? '100vh' : height,
      viewBox: `0 0 ${width} ${height}`,
    },
    transition({ width, height, isOpen }),
    animating
  );

const toRectProps = ({ width, height, isOpen }, animating) =>
  css(
    {
      x: 0,
      y: 0,
      width: isOpen ? '100vw' : width,
      height: isOpen ? '100vh' : height,
      rx: isOpen ? 0 : height / 11,
    },
    transition({ width, height, isOpen }),
    animating
  );

const toCircleProps = ({ width, height, isOpen }, animating) =>
  css(
    {
      cx: isOpen ? '50vw' : width / 2,
      cy: isOpen ? '50vh' : height / 2,
      r: isOpen ? window.innerHeight / 4.8 : height / 4.8,
      transform: 'scale(1)',
      transformOrigin: 'center',
    },
    transition({ width, height, isOpen }),
    animating
  );

const toTextProps = ({ width, height, isOpen }, animating) =>
  Object.assign(
    {
      x: isOpen ? window.innerWidth / 2 : width / 2,
      y: isOpen ? window.innerHeight / 2 : height / 2,
      textAnchor: 'middle',
    },
    css(
      { width: '300px', textAlign: 'center' },
      transition({ width, height, isOpen }),
      animating
    )
  );

const createTween = ({ updateTween, completeTween, repeat = 2 }) => {
  const circleSize = 1;
  const circlExpandedSize = 2;
  const circle2Size = 1;
  const circle2ExpandedSize = 1.6;
  const time = 3000;
  let iteration = 0;
  const position = { scale: circleSize, scale2: circle2Size };
  const breathIn = new TWEEN.Tween(position)
    .to({ scale: circlExpandedSize, scale2: circle2ExpandedSize }, time)
    .easing(TWEEN.Easing.Back.InOut)
    .onUpdate(updateTween);
  const breathOut = new TWEEN.Tween(position)
    .to({ scale: circleSize, scale2: circle2Size }, time)
    .easing(TWEEN.Easing.Back.InOut)
    .onUpdate(updateTween(breathIn))
    .onComplete(() => {
      iteration += 1;
      if (iteration === repeat) {
        completeTween();
      } else {
        breathIn.start();
      }
    });

  breathIn.onUpdate(updateTween(breathIn));

  return breathIn.chain(breathOut);
};

export const useAnimations = props => {
  const { isOpen, onFinish } = props;
  const [animatingProps, setAnimatingProps] = useState({
    rect: {},
    circle: {},
    circle2: {},
  });
  const [isBreathIn, setIsBreathIn] = useState(true);
  let timer;
  const updateTween = tween => ({ scale, scale2 }) => {
    if (isBreathIn !== tween._isPlaying) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsBreathIn(tween._isPlaying);
      }, 0);
    }
    if (!globalIsOpen) {
      return;
    }
    setAnimatingProps(
      Object.assign({}, animatingProps, {
        circle: {
          transform: `scale(${scale2})`,
          transition: 'none',
        },
        circle2: { transform: `scale(${scale})`, transition: 'all 0.1s' },
      })
    );
  };
  const completeTween = e => {
    setAnimatingProps(
      Object.assign({}, animatingProps, {
        circle: {},
        circle2: {},
      })
    );
    onFinish();
  };
  let startTimer;
  useEffect(() => {
    let tween = { stop: () => {} };
    globalIsOpen = isOpen;
    if (isOpen) {
      startTimer = setTimeout(() => {
        tween = createTween({
          updateTween,
          completeTween,
          repeat: 5,
        }).start();
      }, 700);
      requestAnimationFrame(drawLoop);
    } else {
      clearTimeout(startTimer);
      tween.stop();
      TWEEN.removeAll();
      setTimeout(() => {
        setAnimatingProps(
          Object.assign({}, animatingProps, {
            circle: {},
            circle2: {},
          })
        );
      }, 0);
    }
  }, [props.isOpen]);
  const animationProps = {
    svg: toSvgProps(props),
    rect: toRectProps(props, animatingProps.rect),
    circle: toCircleProps(props, animatingProps.circle),
    circle2: toCircleProps(props, animatingProps.circle2),
    text: toTextProps(props, {}),
  };
  return [
    {
      animationProps,
      isBreathIn,
    },
    {},
  ];
};

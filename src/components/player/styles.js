import { css } from '@emotion/core'

export const transition = () => css({ transition: 'all 0.7s' })

export const toSvgProps = ({ width, height, isOpen }, animating) =>
  css(
    {
      width: isOpen ? '100vw' : width,
      height: isOpen ? '100vh' : height,
      viewBox: `0 0 ${width} ${height}`,
    },
    transition({ width, height, isOpen }),
    animating
  )

export const toRectProps = ({ width, height, isOpen }, animating) =>
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
  )

export const toCircleProps = (
  { width, height, isOpen, circleRatio },
  animating
) =>
  css(
    {
      cx: isOpen ? '50vw' : width / 2,
      cy: isOpen ? '50vh' : height / 2,
      r: isOpen
        ? window.innerHeight * 0.2 // only use ratio for icon
        : height * circleRatio,
      transform: 'scale(1) translateZ(0)',
      transformOrigin: 'center',
    },
    transition({ width, height, isOpen }),
    animating
  )

export const toTextProps = ({ width, height, isOpen }, animating) =>
  Object.assign(
    {
      x: isOpen ? window.innerWidth / 2 : width / 2,
      // NOTE: goes down half font size
      y: (isOpen ? window.innerHeight / 2 : height / 2) + 8,
      textAnchor: 'middle',
    },
    css(
      { width: '300px', textAlign: 'center' },
      transition({ width, height, isOpen }),
      animating
    )
  )

export const toCountProps = ({ width, height, isOpen }, animating) =>
  Object.assign(
    {
      x: isOpen ? window.innerWidth / 2 : width / 2,
      // NOTE: goes down half font size
      y: (isOpen ? window.innerHeight : height) - 16,
      textAnchor: 'middle',
    },
    css(
      { width: '300px', textAlign: 'center' },
      transition({ width, height, isOpen }),
      animating
    )
  )

import { Box } from '@jcblw/box'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import { css } from 'glamor'
import React, { useState } from 'react'
import { ToolTip } from '../tool-tip'

const colors = {
  primary: { backgroundColor: 'amethyst' },
  secondary: { backgroundColor: 'danube' },
  tertiary: { backgroundColor: 'mischka' },
}

const imageStyles = css({
  opacity: 0,
  transition: 'all 0.3s',
})

const loadedStyles = css({ opacity: 1 })

export const FavButton = props => {
  const { style = 'primary', disabled } = props
  const restProps = removeKeys(props, 'style', 'url', 'title', 'disabled')
  const { backgroundColor } = colors[style]
  const [tooltipOpen, setToolTipOpen] = useState(false)
  const [isServer, setIsServer] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const iconUrl = isServer
    ? `https://mujō.com/api/icon?site=${encodeURIComponent(props.url)}`
    : `chrome://favicon/${props.url}`
  return (
    <Box
      Component="a"
      disabled
      href={disabled ? null : props.url}
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
      <link rel="preconnect" href={props.url} />
      <Box
        Component="img"
        onError={() => setIsServer(false)}
        onLoad={() => {
          setIsLoaded(true)
        }}
        src={iconUrl}
        width="16px"
        height="16px"
        alt={`${props.title}`}
        {...imageStyles}
        {...(isLoaded ? loadedStyles : {})}
        {...(disabled ? css({ opacity: 0.5 }) : {})}
      />
      <ToolTip isOpen={tooltipOpen}>
        {disabled ? 'Bring back this link by taking a break' : props.title}
      </ToolTip>
    </Box>
  )
}

FavButton.defaultProps = { Component: 'a' }

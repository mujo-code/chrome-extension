import { css } from '@emotion/core'
import { Box } from '@mujo/box'
import { removeKeys } from '@mujo/box/dist/lib/remove-keys'
import { ToolTip, useTheme } from '@mujo/ui'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_FILE } from '../../constants'

const imageStyles = css({
  opacity: 0,
  transition: 'all 0.3s',
})

const loadedStyles = css({ opacity: 1 })

export const FavButton = props => {
  const { disabled } = props
  const restProps = removeKeys(props, 'url', 'title', 'disabled')
  const [tooltipOpen, setToolTipOpen] = useState(false)
  const [isServer, setIsServer] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const encodedURL = encodeURIComponent(props.url)
  const { t } = useTranslation(TRANSLATION_FILE)
  const iconUrl = isServer
    ? `https://getmujo.com/api/icon?site=${encodedURL}`
    : `chrome://favicon/${props.url}`
  const { background } = useTheme()

  return (
    <Box
      Component="a"
      disabled
      href={disabled ? null : props.url}
      cursor="pointer"
      backgroundColor={background}
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
        width="m"
        height="m"
        alt={`${props.title}`}
        {...imageStyles}
        {...(isLoaded ? loadedStyles : {})}
        {...(disabled ? css({ opacity: 0.5 }) : {})}
      />
      <ToolTip isOpen={tooltipOpen}>
        {disabled ? t('bring-back-link') : props.title}
      </ToolTip>
    </Box>
  )
}

FavButton.defaultProps = { Component: 'a' }

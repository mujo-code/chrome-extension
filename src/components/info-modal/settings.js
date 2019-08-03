import { Box } from '@jcblw/box'
import React from 'react'
import { HeaderS, BodyS } from '../fonts'
import { Switch } from '../switch'

export const Boolean = ({
  onChange,
  value,
  background,
  color,
  highlight,
}) => {
  const change = e => onChange(e.target.value)
  return (
    <Box alignItems="flexStart" display="flex">
      <Switch value={value} onChange={change} />
    </Box>
  )
}

export const SettingItem = ({
  type,
  alt,
  label,
  setter,
  value,
  theme,
}) => (
  <Box
    display="flex"
    direction="row"
    paddingTop="s"
    paddingBottom="s"
    borderBottom="s"
  >
    <Box
      backgroundColor={theme.backgroundSecondary}
      css={{ width: '4px' }}
      borderRadius="s"
      marginRight="m"
    />
    <Box flex="1" paddingRight="m" display="flex" direction="column">
      <HeaderS
        marginTop="zero"
        marginBottom={alt ? 'xs' : 'zero'}
        color={theme.foreground}
        flex="0"
      >
        {label}
      </HeaderS>
      {alt && (
        <BodyS
          marginTop="zero"
          marginBottom="zero"
          color={theme.foregroundSecondary}
        >
          {alt}
        </BodyS>
      )}
    </Box>
    <Boolean
      highlight={theme.highlight}
      color={theme.foreground}
      background={theme.background}
      value={value}
      onChange={setter}
    />
  </Box>
)

export const settingsModal = (_, __, { settings, theme }) => ({
  title: 'Settings',
  children: (
    <>
      {settings.map((setting, i, arr) => (
        <React.Fragment key={setting.label}>
          <SettingItem {...setting} theme={theme} />
        </React.Fragment>
      ))}
    </>
  ),
})

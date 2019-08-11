import { Box } from '@mujo/box'
import React from 'react'
import { Button } from '../button'
import { HeaderS, BodyS } from '../fonts'
import { Input } from '../input'
import { Switch } from '../switch'

export const Boolean = ({
  onChange,
  value,
  background,
  color,
  highlight,
}) => {
  const change = e => onChange(e.target.value)
  return <Switch value={value} onChange={change} />
}

export const SettingsInput = props => {
  const { type, onChange, value, inputLabel } = props
  switch (type) {
    case 'button':
      return (
        <Button
          whiteSpace="nowrap"
          backgroundColor={props.highlight}
          color={props.foreground}
          onClick={onChange}
        >
          {value}
        </Button>
      )
    case 'number':
      return (
        <Input
          label={inputLabel || ' '}
          type="number"
          value={value}
          onChange={e =>
            onChange(Math.abs(parseInt(e.target.value, 10)))
          }
        />
      )
    case 'boolean':
    default:
      return <Boolean {...props} />
  }
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
    <Box
      flex="0"
      display="flex"
      direction="column"
      alignItems={type === 'button' ? 'center' : 'flexStart'}
    >
      <SettingsInput
        type={type}
        value={value}
        onChange={setter}
        {...theme}
      />
    </Box>
  </Box>
)

export const settingsModal = (_, __, { settings, theme }) => ({
  title: 'Settings',
  children: (
    <>
      {settings.map((setting, i, arr) => (
        <SettingItem key={setting.label} {...setting} theme={theme} />
      ))}
    </>
  ),
})

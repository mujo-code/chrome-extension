import React, { useContext } from 'react'

const DEFAULT_COLOR_THEME = 'dark'

const colors = {
  dark: {
    foreground: 'mischka',
    foregroundSecondary: 'white',
    background: 'outerSpace',
    backgroundSecondary: 'gravel',
    highlight: 'saltBox',
    buttonStyle: 'primary',
  },
  light: {
    foreground: 'outerSpace',
    foregroundSecondary: 'gravel',
    background: 'mischka',
    backgroundSecondary: 'white',
    highlight: 'saltBox',
    buttonStyle: 'tertiary',
  },
}

export const ColorTheme = React.createContext(DEFAULT_COLOR_THEME)
export const ColorThemeProvider = ColorTheme.Provider
export const ColorThemeConsumer = ColorTheme.Consumer

export const useTheme = () => {
  const theme = useContext(ColorTheme)
  return colors[theme] || colors.dark
}

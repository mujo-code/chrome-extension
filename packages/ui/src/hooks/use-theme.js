import React, { useContext } from 'react'

const DEFAULT_COLOR_THEME = 'dark'

const colors = {
  dark: {
    foreground: 'light',
    foregroundSecondary: 'white',
    background: 'dark',
    backgroundSecondary: 'black',
    highlight: 'highlight',
    buttonStyle: 'primary',
  },
  light: {
    foreground: 'dark',
    foregroundSecondary: 'black',
    background: 'light',
    backgroundSecondary: 'white',
    highlight: 'highlight',
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

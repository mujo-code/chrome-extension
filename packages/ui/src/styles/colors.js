// export const colors = {
//   outerSpace: '#353D42',
//   gravel: '#4D484E',
//   saltBox: '#756577',
//   mischka: '#EAE2EB',
//   white: '#FFFFFF',
//   transparent: 'transparent',
// }

export const colors = {
  dark: '#353D42',
  black: '#282E32',
  highlight: '#8DDAB9',
  light: '#EBE8E2',
  white: '#FFFFFF',
  grey: '#6A7378',
  transparent: 'transparent',
}

export const getColor = colorName => colors[colorName]

const toRGB = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? result.slice(1, 4).map(n => parseInt(n, 16)) : null
}

export const rgba = (color, alpha) => {
  const hex = /^#/.test(color) ? color : getColor(color)
  const rgb = toRGB(hex)
  return `rgba(${rgb.join(',')},${alpha})`
}

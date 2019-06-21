export const colors = {
  outerSpace: '#353D42',
  gravel: '#4D484E',
  saltBox: '#756577',
  mischka: '#EAE2EB',
  white: '#FFFFFF',
  transparent: 'transparent',
}

const toRGB = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? result.slice(1, 4).map(n => parseInt(n, 16)) : null
}

export const rgba = (hex, alpha) => {
  const rgb = toRGB(hex)
  console.log(rgb)
  return `rgba(${rgb.join(',')},${alpha})`
}

const medium = 700
const extraLight = 200

const fontWeight = {
  medium: { fontWeight: medium },
  extraLight: { fontWeight: extraLight },
}

export const fontStyles = {
  fontWeight,
  font: {
    headerL: {
      fontWeight: medium,
      fontSize: 32,
      lineHeight: '40px',
    },

    headerS: {
      fontWeight: medium,
      fontSize: 16,
      lineHeight: '24px',
    },

    bodyXl: {
      fontWeight: extraLight,
      fontSize: 32,
      lineHeight: '40px',
    },

    bodyL: {
      fontWeight: extraLight,
      fontSize: 24,
      lineHeight: '32px',
    },

    bodyS: {
      fontWeight: extraLight,
      fontSize: 16,
      lineHeight: '24px',
    },

    fixedL: {
      fontFamily: '"Monaco", monospace',
      fontSize: 24,
      lineHeight: '32px',
    },

    fixedS: {
      fontFamily: '"Monaco", monospace',
      fontSize: 16,
      lineHeight: '24px',
    },
  },
}

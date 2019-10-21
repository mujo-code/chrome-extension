const toVW = n => `${n}vh`

export const getStyle = ({ height, width, halfSize, isOpen, size }) => ({
  top: '50%',
  left: '50%',
  width: isOpen ? toVW(size) : width / 2,
  height: isOpen ? toVW(size) : height / 2,
  marginLeft: isOpen ? toVW(halfSize * -1) : (width / 4) * -1,
  marginTop: isOpen ? toVW(halfSize * -1) : (height / 4) * -1,
  borderRadius: isOpen ? toVW(size) : width,
  transition: [
    'width 0.7s ease-in-out',
    'height 0.7s ease-in-out',
    'margin-left 0.7s ease-in-out',
    'margin-top 0.7s ease-in-out',
    'border-radius 0.7s ease-in-out',
  ].join(),
})

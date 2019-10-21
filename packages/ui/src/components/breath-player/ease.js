// Breaking all the rules
/*
  eslint
    no-cond-assign: "off",
    no-param-reassign: "off",
    operator-linebreak: "off"
*/
const overshoot = 1.61803398875

const backInOut = t => {
  const change =
    (t *= 2) < 1
      ? t * t * ((overshoot + 1) * t - overshoot)
      : (t -= 2) * t * ((overshoot + 1) * t + overshoot) + 2
  return change / 2
}

export { backInOut }

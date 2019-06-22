export const wait = (amount = 0) =>
  new Promise(resolve => {
    setTimeout(resolve, amount)
  })

export const defer = async (fn, amount, ...args) => {
  await wait(amount)
  return fn(...args)
}

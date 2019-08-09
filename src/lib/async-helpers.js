export const wait = (amount = 0) =>
  new Promise(resolve => {
    setTimeout(resolve, amount)
  })

export const defer = async (fn, amount, ...args) => {
  await wait(amount)
  return fn(...args)
}

export const composePromises = (...fns) => value =>
  fns.reduceRight(
    (promise, fn) => promise.then(resolve => fn(resolve)),
    Promise.resolve(value)
  )

export const pipePromises = (...fns) => composePromises(fns.reverse())

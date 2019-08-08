export const wait = (amount = 0) =>
  new Promise(resolve => {
    setTimeout(resolve, amount)
  })

export const defer = async (fn, amount, ...args) => {
  await wait(amount)
  return fn(...args)
}

export const composePromises = (...fns) => value => {
  fns.reduce((promise, fn) => {
    promise.then(resolve => console.log(resolve) || fn(resolve))
    return promise
  }, Promise.resolve(value))
}

export const pipePromises = (...fns) => composePromises(fns.reverse())

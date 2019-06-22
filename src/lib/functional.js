/*
  Functional utils ⚡️
  -----
  prior art: https://gist.github.com/JamieMason/172460a36a0eaef24233e6edb2706f83
  curry: https://gist.github.com/nathggns/fb97cd9018454bfa87c1
*/

export const noop = () => {}

export const compose = (...fns) =>
  fns.reduceRight(
    (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    value => value
  )
// compose(a,b,c)(value)
// a(b(c(value)))

export const pipe = (...args) => compose(args.reverse())
// pipe(a,b,c)(value)
// c(b(a(value)))

export const identity = x => x

export const from = Contruc => (...args) => new Contruc(...args)

export const flatten = (accum, arr) => [...accum, ...arr]

export const curry = (fn, ...args) => {
  if (args.length === fn.length) {
    return fn(...args)
  }
  return curry.bind(this, fn, ...args)
}

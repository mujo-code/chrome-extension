export const find = query => {
  const keys = Object.keys(query)
  return arr =>
    arr.filter(item => keys.every(key => item[key] === query[key]))
}

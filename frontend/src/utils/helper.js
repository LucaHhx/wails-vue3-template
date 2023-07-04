export const arrIsRepeat = (arr) => {
  return arr.some((item, index, arr) => arr.indexOf(item) !== index)
}

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

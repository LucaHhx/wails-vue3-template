export function parseObjToArry(dataObj) {
  const data = []
  if (dataObj) {
    for (const key in dataObj) {
      if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
        data.push({
          key: key,
          value: dataObj[key],
        })
      }
    }
  }
  return data
}

export function parseArryToObj(data) {
  const obj = {}
  for (let i = 0; i < data.length; i++) {
    if (data[i].key !== '') {
      obj[data[i].key] = data[i].value
    }
  }
  return obj
}

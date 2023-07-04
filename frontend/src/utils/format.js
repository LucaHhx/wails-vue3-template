import { formatTimeToStr } from '@/utils/date'
import { getDict } from '@/utils/dictionary'

export const formatBoolean = (bool) => {
  if (bool !== null) {
    return bool ? '是' : '否'
  } else {
    return ''
  }
}
export const formatDate = (time) => {
  if (time !== null && time !== '') {
    var date = new Date(time)
    return formatTimeToStr(date, 'yyyy-MM-dd hh:mm:ss')
  } else {
    return ''
  }
}

export const filterDict = (value, options) => {
  const rowLabel = options && options.filter(item => item.value === value)
  return rowLabel && rowLabel[0] && rowLabel[0].label
}

export const getDictFunc = async(type) => {
  const dicts = await getDict(type)
  return dicts
}

export function joinTime(time) {
  if (time === null || time === '' || time.length !== 8) {
    return time
  }
  const s = time.slice(0, 4) + '-' + time.slice(4, 6) + '-' + time.slice(6, 8)
  return s
}

export function formatInt(v) {
  if (typeof v === 'number') {
    return v.toFixed(0)
  }
  if (typeof v === 'string') {
    const num = parseInt(v.trim())
    if (isNaN(num)) {
      return 0
    }
    return num
  }
  return v
}

export function formatObjKey(keyMap, v, keep = false) {
  const data = []
  v.forEach((item) => {
    const val = {}
    Object.keys(item).forEach((key) => {
      if (keyMap[key]) {
        val[keyMap[key]] = item[key]
      } else {
        if (keep || keyMap[key] === '') {
          val[key] = item[key]
        }
      }
    })
    data.push(val)
  })
  return data
}

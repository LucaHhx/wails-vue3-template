import { getSlotSymbolList } from '@/api/slotSymbol'

const tags = []

const getTags = async() => {
  const table = await getSlotSymbolList({ page: 1, pageSize: 100000 })
  table.data.list.forEach((element) => {
    tags.push(element.name)
  })
}
getTags()
// const color = {
//   4: 'primary', // 百搭 + paytable
//   3: 'danger', // 百搭
//   2: 'warning', // paytable
//   1: 'success', // 划线
// }
export const getTagSetting = (v, id) => {
  let ret = {}
  switch (id) {
    case 5:
      ret = getMatchTagSetting(v)
      break
    case 6:
      ret = getMatchTagSetting(v)
      break
    default:
      ret = getSlotTagSetting(v)
      break
  }
  console.log(ret)
  return ret
}

const getMatchTagSetting = (v) => {
  var ss = v.split('|')
  var mul = ss[2]
  var color = 'info'
  var name = tags[ss[1] - 1]

  if (ss[0] === '1') {
    color = 'primary'
  }
  if (ss[3] === '1') {
    name = '^' + name
  }
  if (ss[1] === '60') {
    color = 'danger'
    name = name + '*' + mul
  }
  return {
    color: color,
    name: name,
  }

}

const getSlotTagSetting = (v) => {
  var ss = v.split('|')
  var sss = ss[0].split('@')
  const n = v.indexOf('|')
  if (n === -1) {
    return {
      color: 'info',
      name: tags[+v - 1],
    }
  }
  var a = parseInt(sss[0])
  const tag = parseInt(ss[1])
  if (tags[a - 1] === undefined) {
    return {
      color: 'info',
      name: '',
    }
  }
  var ret = {
    color: getTagType(tag),
    name: tags[a - 1] + (sss[1] === undefined ? '' : '$' + sss[1]),
  }
  return ret
}

const getTagType = (a) => {
  var str = a.toString(2)
  if (str.length < 5) {
    str = '0'.repeat(6 - str.length) + str
  }
  if (str[5] === '1' || str[6] === '1') {
    return 'primary'
    // } else if (str[4] === '1') {
    // return 'primary'
  } else if (str[3] === '1') {
    return 'danger'
  } else if (str[2] === '1') {
    return 'warning'
  } else if (str[1] === '1') {
    return 'success'
  } else {
    return 'info'
  }
}

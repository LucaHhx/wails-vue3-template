import * as XLSX from 'xlsx'
import { formatObjKey } from './format'

export interface exportParams {
  sheetData: Array<any>,
  headMap: object,
  fileName: string
}

export const exportFile = (params: exportParams) => {
  // 将由对象组成的数组转化成sheet
  let data = []
  const sheetData = params.sheetData
  const headMap = params.headMap
  const fileName = params.fileName
  const header = []
  data = formatObjKey(headMap, sheetData, true)
  Object.keys(headMap).forEach((key) => {
    if (headMap[key]) {
      header.push(headMap[key])
    } else {
      header.push(key)
    }
  })
  const sheet = XLSX.utils.json_to_sheet(data, { header: header })
  // 百分数和数字更改为数字类型
  // Object.keys(sheet).forEach((key) => {
  // if (sheet[key].v) {
  // const val = sheet[key].v
  // if (!isNaN(val)) {
  //   sheet[key].t = 'n'
  // }
  //   if (val.lastIndexOf('%') === val.length - 1) {
  //     sheet[key].t = 'n'
  //     sheet[key].z = '0.00%'
  //     sheet[key].v = Number(val.substring(0, val.length - 1)) / 100
  //   }
  // }
  // })
  // 创建虚拟的workbook
  const wb = XLSX.utils.book_new()
  // 把sheet添加到workbook中
  XLSX.utils.book_append_sheet(wb, sheet, fileName)
  const workbookBlob = workbook2blob(wb)
  openDownload(workbookBlob, `${fileName}.xls`)
}

function openDownload(blob, fileName) {
  if (typeof blob === 'object' && blob instanceof Blob) {
    blob = URL.createObjectURL(blob) // 创建blob地址
  }
  const aLink = document.createElement('a')
  aLink.href = blob
  // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
  aLink.download = fileName || ''
  let event
  if (window.MouseEvent) event = new MouseEvent('click')
  //   移动端
  else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  }
  aLink.dispatchEvent(event)
}

function workbook2blob(workbook) {
  // 生成excel的配置项
  const wopts = {
    // 要生成的文件类型
    bookType: 'xlsx',
    // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    bookSST: false,
    type: 'binary',
  }
  const wbout = XLSX.write(workbook, wopts)
  // 将字符串转ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }
  const blob = new Blob([s2ab(wbout)], {
    type: 'application/octet-stream',
  })
  return blob
}

// 表格导入
export const readExcel = async(files, sheetKeys = [0]) => {
  if (files.length <= 0) {
    return
  }
  if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
    console.error('上传格式不正确，请上传xls或者xlsx格式')
    return
  }
  const fileReader = new FileReader()
  let ws = []
  return new Promise((resolve, reject) => {
    fileReader.onload = (ev) => {
      try {
        const data = ev.target.result
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        // 取第一张表
        if (sheetKeys.length <= 1) {
          const wsname = workbook.SheetNames[sheetKeys[0]]
          // 生成json表格内容
          ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
        } else {
          sheetKeys.forEach((sheetKey) => {
            const wsname = workbook.SheetNames[sheetKey]
            // 生成json表格内容
            ws.push(XLSX.utils.sheet_to_json(workbook.Sheets[wsname]))
          })
        }
        resolve(null)
        // 后续为自己对ws数据的处理
      } catch (e) {
        return false
      }
    }
    fileReader.readAsBinaryString(files[0])
  }).then(() => {
    return ws
  })
}

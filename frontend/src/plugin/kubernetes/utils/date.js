// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

export function formatTimeToStr(times, pattern) {
  var d = new Date(times).Format('yyyy-MM-dd hh:mm:ss')
  if (pattern) {
    d = new Date(times).Format(pattern)
  }
  return d.toLocaleString()
}

export function formatTimeLabels(time) {
  const unixTimestamp = new Date(time * 1000)
  const y = (unixTimestamp.getFullYear() < 10) ? '0' + unixTimestamp.getFullYear() : unixTimestamp.getFullYear()
  const m = (unixTimestamp.getMonth() < 10) ? '0' + unixTimestamp.getMonth() : unixTimestamp.getMonth()
  const d = (unixTimestamp.getDate() < 10) ? '0' + unixTimestamp.getDate() : unixTimestamp.getDate()
  const h = (unixTimestamp.getHours() < 10) ? '0' + unixTimestamp.getHours() : unixTimestamp.getHours()
  const min = (unixTimestamp.getMinutes() < 10) ? '0' + unixTimestamp.getMinutes() : unixTimestamp.getMinutes()
  const s = (unixTimestamp.getSeconds() < 10) ? '0' + unixTimestamp.getSeconds() : unixTimestamp.getSeconds()
  const toDay = y + '年' + m + '月 ' + d + '日 ' + h + ':' + min + ':' + s
  return toDay
}

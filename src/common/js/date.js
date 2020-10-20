export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份要+1
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds() // 秒
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''; // 先转换成string
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  /*
  * substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
  * 语法
  * stringObject.substr(start,length)
  * */
  return ('00' + str).substr(str.length)
}

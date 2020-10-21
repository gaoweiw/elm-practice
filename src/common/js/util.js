/**
 * 解析url 参数
 * @exmple ? id=123&a=b
 * @retrun Object {id:123,a:b}
 */
export function urlParse() {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg) // match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
  // [?id='12345','&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substr(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}

/**
 * 存储：saveTolocal  读取：loadFromLocal 根据商家id不同收藏状态也不同
 * @param id
 * @param key
 * @param value
 */
export function saveTolocal(id, key, value) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    // JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
    // 应为localStorage 存储的是一个json字符串
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}

export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}


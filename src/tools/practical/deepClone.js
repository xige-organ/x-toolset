function deepClone(obj, cache = new Map()) {
  if (typeof obj !== 'object' || obj === null) {
    // 如果不是对象或者为 null，则直接返回
    return obj;
  }

  if (cache.has(obj)) {
    // 如果已经拷贝过该对象，则直接返回缓存中的对象
    return cache.get(obj);
  }

  let copy = Array.isArray(obj) ? [] : {};

  // 将新对象存入缓存
  cache.set(obj, copy);

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key], cache);
    }
  }

  return copy;
}

export default deepClone
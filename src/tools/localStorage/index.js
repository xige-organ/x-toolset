/**
 * 设置 localStorage
 * @param {string} key localStorage 键
 * @param {string} value localStorage 值
 */
function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

/**
 * 获取 localStorage 值
 * @param {string} key localStorage 键
 * @returns {string} localStorage 值
 */
function getLocalStorage(key) {
  return localStorage.getItem(key);
}

/**
 * 删除 localStorage
 * @param {string} key localStorage 键
 */
function deleteLocalStorage(key) {
  localStorage.removeItem(key);
}

/**
 * 清空 localStorage
 */
function clearLocalStorage() {
  localStorage.clear();
}

export default {
  get: getLocalStorage,
  set: setLocalStorage,
  clear: clearLocalStorage,
  del: deleteLocalStorage,
}
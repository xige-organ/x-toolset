/**
 * 设置 cookie
 * @param {string} name cookie 名称
 * @param {string} value cookie 值
 * @param {number} days cookie 有效期天数
 */
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

/**
 * 获取 cookie 值
 * @param {string} name cookie 名称
 * @returns {string} cookie 值
 */
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

/**
 * 删除 cookie
 * @param {string} name cookie 名称
 */
function delCookie(name) {
  setCookie(name, '', -1);
}

export default {
  set: setCookie,
  get: getCookie,
  del: delCookie 
}
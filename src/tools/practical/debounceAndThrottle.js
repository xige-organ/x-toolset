
/* 
防抖和节流都是为了控制函数的执行频率，避免函数被频繁调用而导致浏览器性能问题
*/

/**
 * 防抖函数
 * 作用是在一定时间内多次触发同一事件时，只执行最后一次触发事件的函数。
 * @param {Function} func 要执行的函数
 * @param {Number} wait 等待时间
 * @param {Boolean} immediate 是否立即执行
 */
function debounce(func, wait = 500, immediate = false) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;

    // 如果之前设置过定时器，则先清除之前的定时器
    if (timeout) clearTimeout(timeout);

    if (immediate) {
      // 如果已经执行过，不再执行
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

/**
 * 节流函数
 * 作用是在一定时间内只执行一次函数。
 * @param {Function} func 要执行的函数
 * @param {Number} wait 等待时间
 * @param {Boolean} immediate 是否立即执行
 */
function throttle(func, wait = 500, immediate = false) {
  let timeout;
  let start_time = 0;

  return function () {
    let context = this,
      args = arguments,
      current_time = new Date().getTime();

    if (current_time - start_time >= wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      func.apply(context, args);
      start_time = current_time;
    } else if (!timeout && immediate) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
        start_time = new Date().getTime();
      }, wait - (current_time - start_time));
    }
  };
}


export default {
  debounce,
  throttle
}
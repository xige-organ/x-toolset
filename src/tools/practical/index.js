/* 一些实用函数 */
import debounceAndThrottle from  './debounceAndThrottle'
import downLoad from './downLoad'
import eventBus from './eventBus'
import excel from './excel'
import promise from  './promise'
import deepClone from './deepClone'
export default {
  ...debounceAndThrottle,
  deepClone,
  downLoad,
  eventBus,
  excel,
  promise
}
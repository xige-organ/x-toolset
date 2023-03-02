/* 
  * desc: 此工具用于格式化日期
    * 参数说明
      * date // 日期
      * format  // 日期格式  如： yyyy年MM月dd日 HH:mm:ss  yyyy-MM-dd
      * separator // 分隔符 如： -
    * 返回值说明 string
      * 格式化后日期
*/
function dateFormat(date, format = 'yyyy-MM-dd', separator = '-') {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // 格式化日期
  format = format.replace('yyyy', year);
  format = format.replace('MM', padZero(month));
  format = format.replace('dd', padZero(day));
  format = format.replace('HH', padZero(hours));
  format = format.replace('mm', padZero(minutes));
  format = format.replace('ss', padZero(seconds));

  // 替换分隔符
  format = format.replace(/-/g, separator);

  return format;
}

// 补零函数
function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

export default dateFormat 
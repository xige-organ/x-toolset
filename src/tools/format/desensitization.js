/* 脱敏函数
    * 目标： 手机号、身份证号、银行卡号、企业名称、营业执照
*/

function desensitization() {
  // 先将内置的 arguments 转换为真正的数组
  var dataArr = Array.prototype.slice.apply(arguments)
  for (var i = 0; i < dataArr.length; i++) {
    var data = dataArr[i]
    console.log(data)
    // 正则判断返回相应数据
    if (
      /(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(data) ||
      /^[1][0-9]{10}$/.test(data) ||
      /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/.test(
        data
      )
    ) {
      // 身份证号 || 手机号  ||  营业执照    前三后三
      data = data.substr(0, 3) + '****' + data.substr(-4)
    } else if (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(data)) {
      // 邮箱号码  前二 后以 @ 分割
      data = data.substr(0, 2) + '****' + data.substr(data && data.indexOf('@'))
    } else if (/^\d{16}|\d{19}$/.test(data)) {
      // 银行卡号  后四位
      data = data.substr(0, 3) + '****' + data.substr(-4)
    } else if (data && data.indexOf('公司') > -1) {
      // 企业名称  前二后四
      data = data.substr(0, 2) + '****' + data.substr(-4)
    } else {
      return
    }
    dataArr[i] = data
  }
  return dataArr && dataArr[0]
}

export default desensitization
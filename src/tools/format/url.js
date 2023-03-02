/* 
  * desc: 此工具用于解析url   string -> object
    * 功能： 支持hash解析到params中
    * 参数说明
      * url  // 如： https://www.baidu.com?a=1&b=2#yyb
      * isHasHash  // 是否需要将hash值放入params
    * 返回值说明
      * URL对象
        * protocol: parsedUrl.protocol,  // 协议
        * host: parsedUrl.host, // 域名
        * hostname: parsedUrl.hostname, // 域名
        * port: parsedUrl.port, // 端口
        * pathname: parsedUrl.pathname, // 路径
        * search: parsedUrl.search, // search字符串
        * hash: parsedUrl.hash, // 哈希
        * params: params  // search字符串对象[其中包含hash]
    * demo
      * let urlObj = urlFormat({url: 'https://www.example.com/path?foo=bar&baz=qux#hash-value'})
      * 返回值:
        * console.log(urlObj.protocol); // 'https:'
        * console.log(urlObj.host); // 'www.example.com'
        * console.log(urlObj.pathname); // '/path'
        * console.log(urlObj.search); // '?foo=bar&baz=qux'
        * console.log(urlObj.hash); // '#some-hash-value'
        * console.log(urlObj.params); // {foo: 'bar', baz: 'qux', _hash: 'hash-value'}  
*/
function urlFormat({
  url,
  isHasHash = false,
}) {
  try {
    var parsedUrl = new URL(url)
    var params = {}

    parsedUrl.searchParams.forEach(function (value, key) {
      params[key] = value
    })

    // 将hash添加到params中
    if (parsedUrl.hash && isHasHash) {
      params['_hash'] = parsedUrl.hash.substr(1)
    }

    return {
      protocol: parsedUrl.protocol,
      host: parsedUrl.host,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      search: parsedUrl.search,
      pathname: parsedUrl.pathname,
      hash: parsedUrl.hash,
      params: params
    }
  } catch (e) {
    throw new Error('Invalid URL')
  }


}
export default urlFormat 
/* 下载文件 */
function downloadLink(url, target, title) {
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.target = target || '_self'
  link.setAttribute('download', title)

  document.body.appendChild(link)
  link.click()
}

function downLoad (blob, title, target) {
  const lowerCase = typeof blob.toString().toLowerCase()
  if (lowerCase === 'string' && /^http/.test(blob)) {
    downloadLink(blob, target, title)
    return false
  }
  let url = window.URL.createObjectURL(blob)
  if (!url) {
    return
  }
  if (window.navigator.msSaveOrOpenBlob) {
    // 兼容ie11
    try {
      window.navigator.msSaveOrOpenBlob(blob, title)
    } catch (e) {
      // console.log(e)
    }
  } else {
    downloadLink(url, target, title)
  }
}
export default downLoad

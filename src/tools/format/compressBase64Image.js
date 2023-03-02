/* 
  * desc: 此工具用于压缩图片
   * @param {string} base64 图片的 base64 编码
   * @param {number} maxWidth 最大宽度
   * @param {number} maxHeight 最大高度
   * @param {number} quality 压缩质量，范围 0 到 1，默认值为 0.9
   * @returns {Promise<string>} 压缩后的图片 base64 编码
  * DEMO
    const base64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
    compressImage(base64, 800, 600, 0.8)
      .then(compressedBase64 => {
        console.log(compressedBase64)
      })
      .catch(error => {
        console.error(error)
      })
*/

function compressBase64Image(base64, maxWidth, maxHeight, quality = 0.9) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let width = img.width
      let height = img.height

      // 如果图片的尺寸小于最大值，不需要压缩
      if (width <= maxWidth && height <= maxHeight) {
        resolve(base64)
        return
      }

      // 等比例缩放
      const scale = Math.min(maxWidth / width, maxHeight / height)
      width *= scale
      height *= scale

      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      // 将压缩后的图片转成 base64 编码
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
      resolve(compressedBase64)
    }
    img.onerror = () => reject(new Error('图片加载失败'))
    img.src = base64
  })
}

export default compressBase64Image
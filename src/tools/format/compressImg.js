/* 
  * desc: 此工具用于压缩图片
   * @param {string} file
   * @param {number} width 最大宽度
   * @param {number} height 最大高度
   * @param {number} quality 压缩质量，范围 0 到 1，默认值为 0.9
   * @returns {Promise<string>} 压缩后的图片 base64 | blob编码
  * DEMO
      const fileInput = document.querySelector('input[type="file"]')
      fileInput.addEventListener("change", async (event) => {
        const file = event.target.files[0]
        const { base64, blob } = await compressImg(file, 120, null, 0.8)
        console.log(base64) // 输出压缩后的
      }) 
*/
function compressImg(file, width, height, quality = 0.9) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        // 确定压缩后的宽度和高度
        let newWidth = width
        let newHeight = height
        if (!newWidth && !newHeight) {
          // 如果没有传入宽度和高度，则不进行压缩
          newWidth = img.width
          newHeight = img.height
        } else if (newWidth && !newHeight) {
          // 如果只传入宽度，则按比例计算高度
          newHeight = (img.height * newWidth) / img.width
        } else if (!newWidth && newHeight) {
          // 如果只传入高度，则按比例计算宽度
          newWidth = (img.width * newHeight) / img.height
        }

        // 设置canvas的大小和绘制图片
        canvas.width = newWidth
        canvas.height = newHeight
        ctx.drawImage(img, 0, 0, newWidth, newHeight)

        // 将canvas转换为base64或blob格式
        const base64 = canvas.toDataURL(file.type, quality)
        const blob = dataURLtoBlob(base64)

        // 返回结果
        resolve({ base64, blob })
      }
    }
    reader.onerror = (error) => reject(error)
  })
}

function dataURLtoBlob(dataURL) {
  const parts = dataURL.split(";base64,")
  const contentType = parts[0].split(":")[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}

export default compressImg
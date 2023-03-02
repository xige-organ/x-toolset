// 渲染高亮检索文本
function highLight(val, keyword) {
  if (!val) return;
  const keywords = keyword.trim();
  const vals = `${val}`;
  if (val.indexOf(keyword) !== -1 && keywords !== '') {
    return vals.replace(
      new RegExp(keyword, 'g'),
      `<font color="#FF5500">${keywords}</font>`
    );
  }

  return vals;
}

export default highLight
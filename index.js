import dateFormat from './src/tools/format/date'
import urlFormat from './/srctools/format/url'
import compressBase64Image from './src/tools/format/compressBase64Image'
import compressImg from './src/tools/format/compressImg'
import desensitization from './src/tools/format/desensitization'
import highLight from './src/tools/format/highLight'
import validate from './src/tools/validate'
import cookie from './src/tools/cookie'
import localStorage from './src/tools/localStorage'
import excel from './src/tools/practical/excel'
import practical from './src/tools/practical'
import array from './src/tools/array'
const module = {
  dateFormat,
  urlFormat,
  compressBase64Image,
  compressImg,
  desensitization,
  highLight,
  validate,
  cookie,
  storage: localStorage,
  excel,
  ...practical,
  ...array,
}
export default module
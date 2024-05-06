import { initMixin } from "./init";

function Vue(options) {
  console.log('111');
  // 初始化配置项
  this._init(options);
}
initMixin(Vue);
export default Vue;
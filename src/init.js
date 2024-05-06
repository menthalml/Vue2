export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    console.log('111', options);
  }
}
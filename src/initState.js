import { observer } from './observe/index';
export function initState(vm) {
  let ops = vm.$options;
  console.log('ops', ops);
  // 判断
  if (ops.props) {
    initProps()
  }
  if (ops.data) {
    initData(vm)
  }
  if (ops.watch) {
    initWatch()
  }
  if (ops.computed) {
    initComputed()
  }
  if (ops.methods) {
    initMethods()
  }
}
//vue2 对data初始化，1种是函数，一种是对象
function initData(vm) {
  console.log('data初始化', vm);
  let data = vm.$options.data;
  data = vm._data =  typeof data === 'function' ? data.call(vm) : data; // 注意this
  // 数据进行劫持
  observer(data)
}
function initProps() {}
function initWatch() {}
function initComputed() {}
function initMethods() {}
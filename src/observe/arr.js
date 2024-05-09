// 重写数组
// 1. 获取原来的数组的方法

// 获取数组原型方法
let oldArrayProtoMethods = Array.prototype;
// 2. 继承
export let ArrayMethods = Object.create(oldArrayProtoMethods);
// 3. 方法劫持
let methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice'
]
methods.forEach((item) => {
  ArrayMethods[item] = function (...args) {
    console.log('劫持数组', Array.prototype)
    let result = oldArrayProtoMethods[item].apply(this, args);
    let inserted;
    switch (args) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.splice(2);
        breal
      default:
        break;
    }
    console.log('1112', args, inserted);
    let ob = this.__ob__;
    if (inserted) {
      ob.observeArray(inserted); // 对添加的对象进行劫持
    }
    return result;
  }
})
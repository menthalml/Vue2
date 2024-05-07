export function observer(data) {
  console.log('observe', data);
  // 1.对象
  if (typeof data !== 'object' || data == null) {
    return data;
  }
  // 对象通过一个类
  return new Observer(data); // 劫持
}

class Observer {
  constructor(value) {
    this.walk(value); // 遍历
  }
  walk(data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      // 对每个属性进行劫持
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value); //对对象中的某个属性进行劫持
    }
  }
}
function defineReactive(data, key, value) {
  observer(value); // 深度劫持
  Object.defineProperty(data, key, {
    get() {
      console.log('获取的时候触发');
      return value;
    },
    set(newValue) {
      console.log('修改的时候触发');
      if (newValue === value) {
        return;
      }
      observer(value); // 深度劫持
      value = newValue;
    }
  })
}
// 总结：1.对象，Object.defineProperty有缺点，只能对对象中的一个属性进行劫持，
// 2.遍历，但是只能对第一层属性进行拦截
// 3.对所有的属性进行递归拦截，获取get，set,如果用户设置的值是一个对象
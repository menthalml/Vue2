(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function observer(data) {
    console.log('observe', data);
    // 1.对象
    if (_typeof(data) !== 'object' || data == null) {
      return data;
    }
    // 对象通过一个类
    return new Observer(data); // 劫持
  }
  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);
      this.walk(value); // 遍历
    }
    return _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
          // 对每个属性进行劫持
          var key = keys[i];
          var value = data[key];
          defineReactive(data, key, value); //对对象中的某个属性进行劫持
        }
      }
    }]);
  }();
  function defineReactive(data, key, value) {
    observer(value); // 深度劫持
    Object.defineProperty(data, key, {
      get: function get() {
        console.log('获取的时候触发');
        return value;
      },
      set: function set(newValue) {
        console.log('修改的时候触发');
        if (newValue === value) {
          return;
        }
        observer(value); // 深度劫持
        value = newValue;
      }
    });
  }
  // 总结：1.对象，Object.defineProperty有缺点，只能对对象中的一个属性进行劫持，
  // 2.遍历，但是只能对第一层属性进行拦截
  // 3.对所有的属性进行递归拦截，获取get，set,如果用户设置的值是一个对象

  function initState(vm) {
    var ops = vm.$options;
    console.log('ops', ops);
    // 判断
    if (ops.props) ;
    if (ops.data) {
      initData(vm);
    }
    if (ops.watch) ;
    if (ops.computed) ;
    if (ops.methods) ;
  }
  //vue2 对data初始化，1种是函数，一种是对象
  function initData(vm) {
    console.log('data初始化', vm);
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // 注意this
    // 数据进行劫持
    observer(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      console.log('111', options);
      var vm = this;
      vm.$options = options;
      // 初始化状态
      initState(vm);
    };
  }

  function Vue(options) {
    console.log('111', options);
    // 初始化配置项
    this._init(options);
  }
  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map

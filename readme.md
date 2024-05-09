Object.prototype = null

function Person() { //function
  constructor() {
    // Peron.prototype ===> constructor // 显示原型
  }
}
Person.prototype.run = function() {
  console.log(22);
}
let person = new Person();
person.__proto__ = Person.prototype
person.a
Peron.prototype -> Object.prototype undefined
person.run();
__proto === prototype

value --- type Array
Arr.prototype == push,pop,splice
Arr.__proto__= Arr.prototype
value __proto__ = Arr.__proto__ = Arr.prototype
value__proto__ = ArrayMethods

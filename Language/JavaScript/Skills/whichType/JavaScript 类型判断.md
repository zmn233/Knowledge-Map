## `JavaScript` 类型判断

#### `typeof`

最简单的方式：`typeof `运算符

能检测出的类型有  `undefined、object、boolean、number、string、object、function`

对于 `null, Date, Error ` 都会返回 `Object`

#### `Object.prototype.toString`

能够正确返回各个变量的类型，但是不够直观

```javascript
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

function checkType() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(Object.prototype.toString.call(arguments[i]))
    }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)
```

#### 自定义 `type `函数

能够综合以上两种方法的函数

```javascript
const type = (function() {
    const classType = {}

    "Boolean Number String Object Function Array Date Error RegExp".split(' ').map((item) => {
        classType[`[object ${item}]`] = item.toLowerCase()
    })

    return function (obj) {
        // 修复 IE6 调用 toString 将 null 和 undefined 返回 null 
        if (obj == null) return '' + obj
        return classType[Object.prototype.toString.call(obj)]
    }
})()
```

#### `plainObject `

通过 `{}` 或者 `new Object` 创建，以及没有原型的对象都叫做 `plainObject`

- 首先利用 `toString` 筛选出对象类型
- 判断对象的 `prototype` 属性，如果为空则返回 `true`
- 调用函数的 `toString` 方法，该方法会返回函数的定义。判断 `obj `构造函数的定义与 `Object` 构造函数是否相同

```javascript
function isPlainObject(obj) {
    const temp = {}
    const toString = temp.toString
    const hasOwn = temp.hasOwnProperty

    if (!obj || toString.call(obj) !== '[object Object]') return false

    const proto = Object.getPrototypeOf(obj)
    if (!proto) return true
    const ctor = obj.constructor

    return typeof ctor === 'function' && hasOwn.toString.call(ctor) === hasOwn.toString.call(Object)
}

```


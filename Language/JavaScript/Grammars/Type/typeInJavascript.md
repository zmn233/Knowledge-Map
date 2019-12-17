## `TypeInJavascript`

#### `javascript` 数据类型

`JavaScript` 中有有七种内置类型(`boolean, number, string, null, undefined, symbol，Object`)。`Function` 和 `Array` 属于 `Object` 的一种子类型

知道数据类型之后，该如何判断当前变量属于什么类型呢？

#### 判断变量类型

##### 利用 `JS` 原生 `API`

1. `typeof`

```javascript
// 除了 函数类型 和 null，typeof 对每个变量返回其对应数据类型

typeof 1 // 'number'
typeof NaN // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b 没有声明，但是还会显示 undefined
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
typeof null // 'object' 因为在 JS 的最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object (我想知道数字0又是怎么表示的嘞，难道不是用全0开头吗？摸不着头脑.jpg)。
typeof new Date() // 'object'
```

2. `Object.prototype.toString()`

```javascript
// toString 方法会对所有类型返回其构造函数类型

const toString = Object.prototype.toString
var b
console.log(toString.call(''))  // [object String]
console.log(toString.call(1))  // [object Number]
console.log(toString.call(NaN))  // [object Number]
console.log(toString.call(true))  // [object Boolean]
console.log(toString.call([]))  // [object Array]
console.log(toString.call({}))  // [object Object]
console.log(toString.call(null))  // [object Null]
console.log(toString.call(b))  // [object Undefined]
console.log(toString.call(Symbol()))  // [object Symbol]
console.log(toString.call(new Date()))  // [object Date]
```

3. `instanceof`

这个运算符主要是用来判断符号两边是否具有继承关系的。判断时，会沿着左侧的 `__proto__  `属性往上找，看是否有与右侧的 `prototype` 属性相同的值，如果能找到重合，则返回true

```javascript
Function instanceof Object  // true
Object instanceof Function  // true
```

##### 自定义函数进行判断

这里在[另一个文件](https://github.com/zmn233/Knowledge-Map/blob/master/Language/JavaScript/Skills/whichType/JavaScript%20%E7%B1%BB%E5%9E%8B%E5%88%A4%E6%96%AD.md)中讲解过，在此不再赘述。

`JS` 一个很重要的特点就是弱类型，变量在声明时不用声明类型，同时也可以任意转换为其他类型。我们接下来看看类型之间是如何转换的。

#### 类型之间的转换

`JS` 中类型转换主要有**显式类型转换**和**隐式类型转换**。在介绍这两种转换之前，我们先来看一看 `JS` 中定义的抽象操作有哪些。

##### 1. 抽象操作

- `toString`  首先使用调用对象本身的`toString` 方法，否则返回`[[class]]`形式，即 `[Object XXX]` 
- `toNumber` 
- `toBoolean`  除开假值列表中的六个值，其余都转换为 `true`
- `toPrimitive` 先调用对象自身的 `valueOf` 方法，如果无法返回基本类型，再调用 `toString`

##### 2. 显示类型转换

显示类型转换主要为以下两种：

1. 转换为字符串`String()`或者数字`Number()`，字符串到数字的解析还可利用`parseInt, parseFloat`，这两项`API`允许字符串中包含非数字。利用`+`也可将字符串转换为数字
2. 转换为布尔值`Boolean`或者是`!, !!`

##### 3. 隐式类型转换

自动转换指 `JS` 在执行过程中，为了“正确执行”代码，自动进行的转换。常见在使用运算符或作比较时发生(一般只有面试题才会考这种，平时很少关注特殊情况啦)

1. 字符串和数字之间的转换

```javascript
'123' + 5  // 1235
5 + '123'  // 5123
```

`+` 作为<span style="color:red">二元运算符</span>时，是“亲字符串”的。即运算符两边有一方为字符串，就会将另一方转换为字符串进行相加

2. 布尔值到数字的转换

   当布尔值参与运算时会转换为数字。假值都为0，真值为1

3. 转换为布尔值

   1. `if` 语句中

   2. `for` 循环第二个判断语句
   3. `while / do ... while`
   4. `?:`
   5. `|| &&`

#### 4. 宽松相等和严格相等

当使用 `==` 进行比较时，内部也会发生隐式类型转换

> `==`  允许在相等比较中进行强制类型转换， `===` 不允许。两者都会检查操作数类型，区别在类型不同时处理方式不同

`==` 比较时遵循以下规则：

- 如果一方为数字，另一方为字符串，则会将字符串转换为数字进行比较
- 如果有一方类型为布尔值，那么会转换为数字进行比较
- 如果一方是对象，另一方不是，则调用对象的 valueOf() 方法，用得到的基本类型值按照前面的规则进行比较

undefined 和 null 被看做是类似的值，因此被视为相等

- 比较相等性之前，undefined 和 null 不会发生类型转换！
- 有 NaN 参与的相等运算都为false
- 比较双方是对象时，会判断两个对象是否是同一个对象

##### 5. 抽象关系比较

针对比较双方会调用 `toPrimitive`，如果结果为非字符串就调用 `toNumber` 转换为数字进行比较
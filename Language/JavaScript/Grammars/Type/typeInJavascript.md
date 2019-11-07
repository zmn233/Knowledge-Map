## `TypeInJavascript`

#### `javascript` 数据类型

`JavaScript` 中有6种基本类型(`boolean, number, string, null, undefined, symbol`)，1种引用类型(`object`

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

##### 手动转换

手动转换指我们自己通过调用函数等方法对变量类型进行一个转换。使用较多就是字符串和数字之间的转换，较简单就不说啦。

##### 自动转换

自动转换指 `JS` 在执行过程中，为了“正确执行”代码，自动进行的转换。常见在使用运算符或作比较时发生(一般只有面试题才会考这种，平时很少关注特殊情况啦)

这个我在印象笔记里也总结过，也不再多说啦，接[链接](https://app.yinxiang.com/client/web#?n=66166746-49b5-4ef6-b277-4720a650884f&query=%E4%BA%B2%E6%95%B0%E5%AD%97&s=s50&)
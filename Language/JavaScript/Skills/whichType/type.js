// 1. typeof

// 2. Object.prototype.toString

// 3. 自定义 type。能对所有类型进行判断
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

console.log(type({}))
console.log(type(new Error()))
console.log(type('BNJDDKD'))
console.log(type(123))
console.log(type(true))
console.log(type(null))
console.log(type(undefined))

// 4. plainObject。通过 {} 或者 new Object 创建，以及没有原型的对象都叫做 plainObject
    // 首先利用 toString 筛选出对象类型
    // 判断对象的 prototype 属性，如果为空则返回 true


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

function Person (name) {
    this.name = name
}

console.log(isPlainObject('123'))
console.log(isPlainObject(123))
console.log(isPlainObject(true))
console.log(isPlainObject(new Person('zmn')))
console.log(isPlainObject(new Object()))
console.log(isPlainObject({}))
console.log(isPlainObject(Object.create(null)))
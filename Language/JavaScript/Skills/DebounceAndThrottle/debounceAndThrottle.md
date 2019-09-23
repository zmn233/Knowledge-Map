

# JavaScript 中的节流与防抖

> 针对一些会频繁触发的事件如scroll、resize，如果正常绑定事件处理函数的话，有可能在很短的时间内多次连续触发事件，十分影响性能

​      节流：使得一定时间内只触发一次函数。 

​      它和防抖动最大的区别就是，节流函数不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而防抖动只是在最后一次事件后才触发一次函数。

#### 防抖

控制代码的执行点。事件被触发一次之后，如果在规定事件内触发了第二次，不予以操作，并且重新计时。

函数被触发之后，首先清除计数器（如果此时距离上次执行不到 wait 时间，重新计时，如果超过 wait 时间，重新定义下一个定时器）

```javascript
function debounce(func, wait) {
	let timeout
    return function() {
        const context = this
        const args = arguments
        cleatTimeout(timeout)
        timeout = setTimeout(() => func.apply(context, args), wait)
    }
}
```

##### 新增需求

需要在第一次触发事件时立即执行。此时通过一个 immediate 参数来控制。

1. 如果 immediate 为false，代码执行流程与上面相同
2. immediate 为 true 时，函数需在第一次触发时执行。可通过一个 timeout 来进行判断，第一次执行 timeout 肯定为空，此时定义一 callNow = !timeout 。callNow 为 true 时立即执行函数，同时还需定义一定时器，在wait 时间之后将 timeout 置空，用于 callNow 赋值并立即执行函数。
3. 总的来说，就是根据 immediate 值的不同，走不同的逻辑。

##### 整体代码如下：

```javascript
function debounce(func, wait, immediate) {
    let timeout, reuslt
    const debounceFn = function() {
        const context = this
        const args = arguments

        if (timeout) clearTimeout(timeout)
        // immediate 用于控制事件是否会立即被触发
        if(immediate) {
           	// 当 timeout 为空时，表示已经过了 wait 时间（或是第一次触发），此时可以继续执行事件
            let callNow = !timeout
            timeout = setTimeout(() => timeout = null, wait)
            if (callNow) {
                result = func.apply(context, args)
            }
        } else {
            timeout = setTimeout(() => result = func.apply(context, args), wait)
        }
        return result
    }

    debounceFn.cancel = function() {
        clearTimeout(timeout)
        timeout = null
    }
    return debounceFn
}
```



#### 节流

不管事件被触发多少次，只会在规定的间隔时间执行

```javascript
// 时间戳实现
// 利用相邻两次调用时间进行判断，若达到规定时间 wait，则执行一次函数。
function throttleDate(func, wait) {
    let pre = 0

    return function () {
        let now = Date.now()
        const context = this
        const args = arguments
        if (now - pre > wait) {
            func.call(context, args)
            pre = Date.now()
        }
    }
}
```

```javascript
// 定时器实现
// 在定时器当中对 timeout 置空，不管事件被触发多少次，只会在 timeout 为空时绑定下一个计时器
function throttleTimeout(func, wait) {
    let timeout

    return function() {
        const context = this
        const args = arguments
        if (!timeout) {
            timeout = setTimeout(() => {
                func.call(context, args)
                timeout = null
            }, wait)
        }
    }
}
```

```javascript
// 两者合体
// 事件第一次被触发时会立即执行函数，最后一次触发结束后也会执行一次函数
// 除了最后一次，其余所有都是由时间戳控制的
// 当不满足时间戳条件时，函数进入 else 语句块，定义计时器
// 下一次触发事件，首先清除计时器。这样我们定义的计时器只有在最后一次定义（也就是定以后再没有触发事件，此时定时器不会被清除）
function throttle(func, wait, options) {
    let pre = 0, timeout
    options = options || {}
    const throttleFn = function () {
        const context = this
        const args = arguments
        let now = Date.now()
        clearTimeout(timeout)
        if (now - pre > wait) {
            func.call(context, args)
            pre = Date.now()
        } else {
            timeout = setTimeout(() => func.call(context, args), wait)
        }
    }
    return throttleFn
}
```




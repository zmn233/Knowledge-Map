# JavaScript 中的节流与防抖

浏览器经常出现同一事件多次触发的现象，如果触发频率太过频繁，会导致网页或应用程序性能下降。为了防止这种情况出现，**节流**以及**防抖**应运而生。

#### 节流

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
2. immediate 为 true 时，函数需在第一次触发时执行(此时 timeout 为 undefined， callNow 为 true，会立即触发函数 )。
3. wait 时间过后，需将 timeout 置为 null，这样下次触发时能够保证 callNow 为true，从而触发函数 

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



#### 防抖

不管事件被触发多少次，只会在规定的间隔时间执行

```javascript
// 时间戳实现
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

```
// 两者合体
//TBC...
```




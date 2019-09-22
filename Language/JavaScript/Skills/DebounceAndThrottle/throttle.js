let count = 1;
const contaienr = document.getElementById('container')

function getUserAction() {
    contaienr.innerHTML = count++
}

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

function throttle(func, wait, options) {
    let pre = 0, timeout

    const throttleFn = function () {
        const context = this
        const args = arguments
        let now = Date.now()
        timeout = setTimeout(() => func.call(context, args), wait) 
        if (now - pre > wait) {
            func.call(context, args)
            pre = Date.now()
            clearTimeout(timeout)
        }
    }
    return throttleFn
}

// contaienr.onmousemove = throttleDate(getUserAction, 1000)
// contaienr.onmousemove = throttleTimeout(getUserAction, 1000)
contaienr.onmousemove = throttle(getUserAction, 1000)


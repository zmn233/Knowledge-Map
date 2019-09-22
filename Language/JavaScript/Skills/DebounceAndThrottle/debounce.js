let count = 1;
const contaienr = document.getElementById('container')

function getUserAction() {
    contaienr.innerHTML = count++
}

function debounce(func, wait, immediate) {
    let timeout, reuslt
    const debounceFn = function() {
        const context = this
        const args = arguments

        if (timeout) clearTimeout(timeout)
        if(immediate) {
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

contaienr.onmousemove = debounce(getUserAction, 1000, true)
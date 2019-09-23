var array3 = ['1', 1, 1, 'A', 'a', 2, 2, '1'];

// underscore 版
// iteratee 英文释义：迭代 重复
function unique(array, isSorted, iteratee) {
    var res = [];
    var seen = [];

    for (var i = 0, len = array.length; i < len; i++) {
        var value = array[i];
        var computed = iteratee ? iteratee(value, i, array) : value;
        if (isSorted && !iteratee) {
            if (!i || seen !== value) {
                res.push(value)
            }
            seen = value;
        }
        else if (iteratee) {
            if (seen.indexOf(computed) === -1) {
                seen.push(computed);
                res.push(value);
            }
        }
        else if (res.indexOf(value) === -1) {
            res.push(value);
        }        
    }
    return res;
}

console.log(unique(array3, true, function(item){
    return typeof item == 'string' ? item.toLowerCase() : item
})); // [1, "a", 2]

// filter 版
function uniqueFilter (arr) {
    return arr.filter((item, index, array) => {
        return array.indexOf(item) === index
    })
}

console.log(uniqueFilter(['1', 1, 1, 1, '1']))

// ES6 版
function uniqueSet(arr) {
    return Array.from(new Set(arr))
}
console.log(uniqueSet([1, 1, 1, '1']))

console.log([1, '2', 'abc', 'bca', [1, 2], {a: 1, b: 2}])

// reduce 版
function uniqueReduce(arr) {
    // 因为是比较当前项与前一项是否相同，所以需要保证数组已经排序，
    return arr.sort().reduce((init, current) => {
        if (init.length == 0 || init[init.length - 1] !== current) {
            init.push(current)
        }
        return init
    }, [])
}

console.log(uniqueReduce([3, 3, 2, 2, 9, 6, '1', 1]))

// Map 版
function uniqueMap(arr) {
    let resArr = []
    let tempMap = new Map()
    arr.forEach((item, index) => {
        if (!tempMap.has(item)) {
            tempMap.set(item, 1)
            resArr.push(item)
        }
    })
    return resArr
}

console.log(uniqueMap([3, 3, 2, 2, 9, 6, '1', 1]))
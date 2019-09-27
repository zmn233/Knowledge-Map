// 证明 setImmediate 和 setTimeout 回调函数被定时器触发线程放入不同事件队列
// 实验顺序 setTimeout, setImmediate（UI渲染）,setTimeout, setImmediate（UI渲染）
// 如果两者

// 实验一：两个 setTimeout 的回调函数属于两个宏任务
// 理论验证：一个 setTimeout 结束后会立即执行由这次 setTimeout 产生的微任务；而微任务是在一次宏任务结束之后才执行的
// 实验步骤
    // ① 定义两个 setTimeout
    // ② 第一个 setTimeout 内部注册 promise.then 回调函数，同时修改网页背景颜色
    // ③ 第二个 setTimeout 也修改背景颜色
// 实验预期：网页颜色修改两次。说明两个 setTimeout 确实属于两个宏任务，因为 GUI 渲染线程会在一次宏任务执行完成后才触发渲染。
// document.body.style = 'background: yellow'
// setTimeout(() => {
//     console.log('setTimeout1')
//     Promise.resolve().then(() => {console.log('promise')})
//     document.body.style = 'background:red'
// }, 0)

// setTimeout(() => {
//     console.log('setTimeout2')
//     document.body.style = 'background:black'
// }, 0)


// 实验二：GUI 渲染线程确实会在当前宏任务执行结束再渲染
// 实验步骤：定义两行代码，观察网页背景颜色修改次数
    // 实验预期：网页背景颜色只修改一次
    // document.body.style = 'background:black'
    // document.body.style = 'background:red'

    // 实验预期：网页背景颜色修改两次
    // document.body.style = 'background:red';
    // setTimeout(function(){
    //     document.body.style = 'background:black'
    // },0)

// setTimeout 与 setImmediate 回调函数被放入的时机与其定义先后顺序无关
// 下列输出顺序为
// timeout1
// timeout2
// immediate1
// immediate2
// 但是在 node 环境中，则与定义顺序相关
// setImmediate(() => {
//     console.log('immediate1')  
// });

// setImmediate(() => {
//     console.log('immediate2')  
// });

// setTimeout(() => {
//     console.log('timeout1')
// }, 0);

// setTimeout(() => {
//     console.log('timeout2')
// }, 0);

// 执行顺序为 timeout1, interval1, timeout1, interval2 说明宏任务的执行并不是清空“首先定义的任务队列”
// setTimeout(() => {
//     console.log('timeout1')
// }, 0);

// const inter1ID = setInterval(() => {
//     console.log('interval1')  
//     clearInterval(inter1ID)
// });

// setTimeout(() => {
//     console.log('timeout2')
// }, 0);

// const inter2ID = setInterval(() => {
//     console.log('interval2')  
//     clearInterval(inter2ID)
// });


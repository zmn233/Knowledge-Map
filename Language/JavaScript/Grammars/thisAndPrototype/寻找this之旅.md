## 寻找`this`之旅

`this` 作为 `javascript` 中代指上下文的关键词，并不遵守词法作用域的规则。而是**在运行时进行绑定**，其**上下文取决于函数调用时的各种条件**。

 `this`有四种调用位置，如下图所示：

<img src="F:\Notes\Knowledge Map\Language\JavaScript\Grammars\thisAndPrototype\四种this调用位置.jpg" alt="四种this调用位置" style="zoom: 67%;" /> 

关于 `this` 可能会碰到的面试题如下：

① 实现一个 `bind` 函数

```javascript
// js原生bind
    Function.prototype.myBind = function(context) {
      // 1.bind 方法利用的是闭包，在我们调用 bind 函数时，会将第一个参数，也就是我们要绑定到的对象指针保存下来
      // 同样的也要将传入的初始参数转换为数组保存下来 
      let self = this,
          _args = Array.prototype.slice.call(arguments, 1),
          FNOP = function() {},
          // 2. 然后定义一个bound函数并将其返回，这个函数就是我们第二次调用时用到的函数
          bound = function() {
            // 3. 我们在调用绑定后的函数时传入的参数会添加到初始参数的后面，传到原始函数中
            const args = Array.prototype.concat.apply(_args, arguments)
            // 6. 在执行时首先判断是否为 new 调用，如果是 则this为bound构造函数的this，否则为第一次绑定时传入的this
            return self.apply(this instanceof self ? this : context || window, args)
          }
      // 4.bind 绑定的方法同样可以用 new 调用，因此我们我们需要借助一个辅助空函数，这个函数继承至原始函数的prototype
      FNOP.prototype = this.prototype
      // 5.然后将我们定义的 bound 函数的 prototype 属性指向这个辅助函数的实例，这时我们通过 new bound 函数创建出的实例具有
      // new bound() __proto__ === new FNOP
      // new FNOP __proto__ === 原始函数的 prototype    
      bound.prototype = new FNOP()
      return bound
    }

```

<span style="
    color: #999;
    font-size: 14px;
">(从面试准备的资料当中找到的。不得不说2018年-2019年的寒假是我这辈子最刻苦的时刻，也是压力最大的时刻，沾枕头就着的我每天晚上要在床上躺一个多小时才能睡着，早上七点钟还要起床。目标才是努力的终极秘诀呀，否则干什么都像没头苍蝇一样)</span>
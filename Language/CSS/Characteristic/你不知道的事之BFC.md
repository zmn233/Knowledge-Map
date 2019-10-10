## 你不知道的事之`BFC`

面试中关于 `CSS` 部分的提问少不了盒模型，紧接着就会引出 `BFC` 相关问题，后者可以说是**必考**+**加分**+**必答**，接下来我们就来看看这两个到底是什么东西。

#### 盒模型

`CSS` 中的盒模型指的就是 `content + padding + border+ margin` 这个模型。根据 `width` 和 `height` 的计算方式不同，细分为以下两种模型：

1. 标准模型。`width` 以及 `height` 仅仅是 `content` 的大小，不包括 `padding` 以及 `border` 的。默认为标准模型。`box-sizing: content-box` 可以达到这种效果。
2. `IE` 模型。`box-sizing: border-box` 可以达到这种效果。

#### `BFC`

`BFC` 英文全称 `blocking formatting context`，译为块级格式化上下文。其定义如下：

> Floats, absolutely positioned elements, inline-blocks, table-cells, table-captions, and elements with ‘overflow’ other than ‘visible’ (except when that value has been propagated to the viewport) establish new block formatting contexts. 

总结下来，生成 `BFC` 条件如下：

- The value of float is not none
- The value of position is neither static nor relative
- The value of display is table-cell, table-caption, inline-block, flex, or inline-flex
- The value of overflow is not visible.



`BFC` 的特征表现如下：

- 生成 `BFC` 内部的 `Box` 会在垂直方向上一个接一个的放置
- ~~属于同一个`BFC`的两个相邻 `Box` 的 `margin` 会发生重叠。~~ 实验证明，普通块级元素下的子元素也会有 `margin collapse` 现象，`BFC` 不是致因，而是解决问题的方法。
- 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明 `BFC` 中子元素不会超出他的包含块，而 ` position` 为 `absolute` 的元素可以超出他的包含块边界）
- **`BFC`的区域不会与 `float` 的元素区域重叠**
- **计算 `BFC` 的高度时，浮动子元素也参与计算**
- **`BFC` 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然**

`margin` 重叠的问题我们会在之后讨论。这里说一下 `BFC` 与 浮动元素结合时出现的一些问题：

1. 未设置高度的父盒子内部含有浮动元素，会出现父元素不包含子元素的情况。这时，可以通过给父元素设置 ` overflow: hidden ` 来解决这个问题。这利用了上述第五点特征。示例见同级文件夹下 `floatBFC.html`

2. 解决正常流元素因为想要碰到包含盒子左边界导致元素处于浮动元素下方，而该盒子内容会产生缩进给浮动元素留出位置的现象。只要给该正常流元素设置  `overflow: hidden` 即可。

   标准说法如下：

   > an element in the normal flow that establishes a new block formatting context (such as an element with 'overflow' other than 'visible') must not overlap the margin box of any floats in the same block formatting context as the element itself。

   一个处于正常流中的元素如果新生成了一个 `BFC` （比如通过给他设置`overflow`属性为`visible`之外的值），一定不会覆盖与他处于同一个 `BFC` 中任何浮动元素的 `margin`。示例见同级文件夹下 `twoLines.html`

接下来重点介绍边距重叠问题。

#### `margin collapsing`

外边距折叠定义如下：

> In CSS, the adjoining margins of two or more boxes (which might or might not be siblings) can combine to form a single margin. Margins that combine this way are said to collapse, and the resulting combined margin is called a collapsed margin.

`margin collapse`具体表现如下：

- 两个元素在垂直方向上的margin相邻的话，会发生 margin collapsing 现象。两个margin 同为正数的话，大的那一方获胜，相等则取这个等值；一正一负则将两个值进行相加，如果和为负数，会发生一个元素覆盖另一个元素的现象（好像把两个元素拉在了一起）。
- 该现象不仅仅发生在相邻的两个同级元素中，也会发生在父子元素中，只要这两个父子元素的margin是相邻的（其中没有border或padding）。子元素 margin-top 与 父元素 margin-top 因为没有 border 和 padding 的遮挡最终会相遇，父元素的高度也仅仅是子元素的高度而已。如果要设置 border 来解决这个问题，一定要设置在**父元素**上，这样才能阻止两个 margin 的相会呀

解决 `margin collapse` 可使用以下方法（破坏形成 `margin collapse` 的四大原因：毗邻、两个或多个、普通流和垂直方向）：

- 浮动元素不会与任何元素发生叠加，也包括它的子元素
- 创建了 BFC 的元素不会和它的子元素发生外边距叠加
- 绝对定位元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
- inline-block 元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
- 普通流中的块级元素的 margin-bottom 永远和它相邻的下一个块级元素的 margin-top 叠加，除非相邻的兄弟元素 clear
- 普通流中的块级元素（没有 border-top、没有 padding-top）的 margin-top 和它的第一个普通流中的子元素（没有clear）发生 margin-top 叠加
- 普通流中的块级元素（height为 auto、min-height为0、没有 border-bottom、没有 padding-bottom）和它的最后一个普通流中的子元素（没有自身发生margin叠加或clear）发生 margin-bottom叠加
- 如果一个元素的 min-height 为0、没有 border、没有padding、高度为0或者auto、不包含子元素，那么它自身的外边距会发生叠加

示例可看同级文件夹下 `adjacentElementMarginCollapse.html`
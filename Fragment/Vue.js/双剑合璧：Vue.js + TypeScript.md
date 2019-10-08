## 双剑合璧：`Vue.js` + `TypeScript`

在 `vue` 中使用 `typescript`，主要是组件的书写方式发生了变化。

#### 使用前

在使用前，需要将我们用到的功能从 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) 引入。

```javascript
import { Component, Watch, Vue, Mixins } from "vue-property-decorator";
// 等等
```

#### 使用对比

将使用 `typescript` 后的写法与之前进行对比，方便记忆。

##### `component`

```javascript
// 原来
exports default {
	created () {},
	components: {}
	...
}

// 现在
// 如果没有引用别的组件，也要写一个 @component 在上面
@component({
    components: {}
})
export default class Monitor extends Vue {}
```

##### 属性和方法

组件通过 `class` 进行定义，内部的数据也不用写在 `data` 当中，方法也不用写在 `methods` 中，直接作为类的内部属性定义即可

```javascript
// 原来
export default {
    data() {
        return {
            searchType: 1,
            customList: []
        }
    },
    methods: {
        onSearch() {},
        getData() {}
    }
}

// 现在
@component
export default class Monitor extends Vue {
	searchType: number = 1;
	customList: any[] = [];

	onSearch(): void {};  // 注：用分号结尾，全部按照类的语法来书写
	getData(): void {};
}
```

##### `watch`

```javascript
// 原来
watch: {
    searchType(newVal, oldVal) {}
}

// 现在  
@Watch('searchType')
onSearchTypeChange(type: number): void {}
```

##### `prop`

```javascript
// 原来
export default {
	props: {
		propA: Number
	}
}

// 现在
export default class Example extends Vue {
    @Prop()
    propA: number = 1
}
```

##### `computed`

```javascript
// 原来
export default {
    computed: {
         computedMsg() {
             return ...
         }
    }
}

// 现在
export default class Example extends Vue { 
    get computedMsg () {
        return 'computed ' + this.msg
    }   
}
```

##### `mixins`

```javascript
// 原来
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

```javascript
// 现在
// mixin1.ts
  import Vue from 'vue'

  export default Vue.extend({
    data () {
      return {
        valFromMixin1: 'test'
      }
    }
  })
  // 不能是
  // 这种写法会报 Mixin1 is not a constructor function type
  export default {
    data () {
      return {
        valFromMixin1: 'test'
      }
    }
  }

  // mixin2.ts
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Mixin2 extends Vue {
    methodFromMixin2() {}
  }

  // test.ts
  import Mixin1 from './mixin1'
  import Mixin2 from './mixin2'
  import { Component, Mixins } from 'vue-property-decorator'

  export default class Test extends Mixins(Mixin1, Mixin2) {
    test() {
      this.methodFromMixin2()
      console.log(this.valFromMixin1)
    }
  }
  // 如果只混入一个的话，可以这样写
  export default class Test extends Mixin1 {}
  export default class Test extends Mixin2 {}
```


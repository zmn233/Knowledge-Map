## `echart.js`

##### 画图步骤

如何简单的用 `echart.js` 在左边画个龙，右边再画一条彩虹

```javascript
import echarts from 'echarts';

const chart = echarts.init(dom 元素)
chart.setOption({/* 配置项 */})
```

##### 配置项

```javascript
setOption({
    // 图表名
    title: {
        show,
        text,
        textStyle
        ...
    },
    // 横纵坐标配置
    xAxis/yAxis: {
    	name: 坐标名,
    	nameGap: 坐标轴名称与轴线之间的距离,
    	type: 'value' | 'category' | 'time' | 'log', (当为 category 时，要使用 data 定义当前轴的取值范围)
    	axisTick: 坐标轴刻度相关,
    	axisLabel: 坐标轴刻度标签,
    	splitLine: 分割线（与x, y轴平行，构成网格）
	},
    // 提示框组件 
    tooltip: {
         trigger: 触发类型 'item' | 'axis' | 'none' 
         padding: '提示框内边距',
         show
    },
    // 图例组件(就是图表旁边用来介绍哪根线对应哪个类目的东西)
    ledgend: {
        bottom,
        itemGap: 每项图例之间的间隔,
        formatter: 用于格式化图例文本，可以为 string 或回调函数 
    },
    // 系列列表
    series: [{
        type: 'line',  // 折线图
        sommth: 是否平滑显示,
        lineStyle: 线条样式,
        itemStyle: 折线拐点标志样式
    }]
})
```


# 序列化
<em>这是 JointJS 教程进阶部分的第三篇文章。返回 <a href="/tutorial/intermediate/events.html">事件</a> </em>

在 JointJS 中，数据序列化非常容易。通过 Graph 类的 导入/导出 函数完成：
+ <code>graph.toJSON()</code> — 转化整个图表为 JSON 对象
+ <code>graph.fromJSON()</code> — 重写当前图表内容，通过所提供的的 JSON 对象的转化内容。

## 持久性
上面的函数保留了添加到图表中的所有元素。另外，注意：保存在图表中的自定义属性也被保留了下来。你可以使用这个来储存额外的状态信息。

~~~js
var graph1 = new joint.dia.Graph();
graph1.set('graphCustomProperty', true);
graph1.set('graphExportTime', Date.now());
var jsonObject = graph1.toJSON();

// transmission of `jsonObject` across network etc.

var graph2 = new joint.dia.Graph(); // new empty graph
graph2.fromJSON(jsonObject);
graph2.get('graphCustomProperty'); // true
graph2.get('graphExportTime'); // e.g. 627247800000
~~~

值得提醒的是：上面的函数使用的是 JSON 对象 —— 而不是 JSON 字符串。然而，如果需要的话，你可以轻松地使用原生 <code>JavaScript JSON.stringify() and JSON.parse()</code> 函数来转化。
~~~js
var graph1 = new joint.dia.Graph();
var jsonObject = graph1.toJSON();
var jsonString = JSON.stringify(jsonObject);

// transmission of `jsonString` across network etc.

var graph2 = new joint.dia.Graph(); // new empty graph
graph2.fromJSON(JSON.parse(jsonString));
~~~

依据你如何储存自己的 app 数据，你可以直接使用 JSON 对象（例如，在非关联性数据库中存储—— MongoDB），或者以字符串格式（可以存储在任何普通文本可以存储的地方，对于每次传输，增加了 JSON 转化的开支）

## 合成图
当然了，你也可以避免使用 <code>graph.toJSON()</code> 函数，反之构建自己的合成图；你仅需要确保你提供的是有效的 JSON 对象，并且它包含 cells 数组属性。
~~~js
var graph = new joint.dia.Graph();
graph.fromJSON({
    cells: [{
        id: 1,
        type: 'standard.Rectangle',
        position: {
            x: 100,
            y: 100
        },
        size: {
            width: 100,
            height: 100
        }
    }]
});
~~~

如果你想创建一幅空白的合成图，这个 <code>cells</code> 数组甚至可以是空的。
~~~js
var graph = new joint.dia.Graph();
graph.fromJSON({ cells: [] });
~~~

## 限制

牢记 JSON 格式的一般限制。一些较常使用的原生 JS 数据类型（包括 <code>Function</code>，<code>Date</code> 和 <code>undefined</code>）不被支持。具备以上类型值的变量将不被保留。与此同时，这意味着，在你的应用中如果持久性非常重要，你应该选择定义自定义的<code>element/link</code> 子类型，而不是将自定义函数嵌入到默认的 <code>joint.dia.Element</code> 和 <code>joint.dia.Link</code> 类型。

另外，如果你想直接使用 JSON 对象并将其储存到 MongoDB 中，你需要记住它关于对象的 key 限制以 . or $ 开始。那些是 MongoDB 系统内部保留使用的。这在 JointJS 的上下文中非常重要，因为它排除了在元素和链接的 attrs 数组中使用 css 样式的选择器。因此，如果持久性对您很重要，并且您希望将数据直接保存到MongoDB，那么您应该始终在自定义元素的标记中定义自定义子元素选择器，而不是依赖于css样式的选择器


# 元素
在先前的部分，我们创建了一个图表（graph）并且学会了如何修改画布(paper)的展示

在这一部分，我们将学习如何创建图表（graph）元素以及如何修改它们的展示。这是一篇关于元素在 <em>
<code>Hello, World</code></em>应用中展示的介绍。本教程后续将介绍更多高级的主题，现在继续我们上一部分修改的代码。

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="node_modules/jointjs/dist/joint.css" />
</head>
<body>
    <!-- content -->
    <div id="myholder"></div>

    <!-- dependencies -->
    <script src="node_modules/jquery/dist/jquery.js"></script>
    <script src="node_modules/lodash/lodash.js"></script>
    <script src="node_modules/backbone/backbone.js"></script>
    <script src="node_modules/jointjs/dist/joint.js"></script>

    <!-- code -->
    <script type="text/javascript">

        var namespace = joint.shapes;

        var graph = new joint.dia.Graph({}, { cellNamespace: namespace });

        var paper = new joint.dia.Paper({
            el: document.getElementById('myholder'),
            model: graph,
            width: 600,
            height: 100,
            gridSize: 10,
            drawGrid: true,
            background: {
                color: 'rgba(0, 255, 0, 0.3)'
            },
            cellViewNamespace: namespace
        });

        var rect = new joint.shapes.standard.Rectangle();
        rect.position(100, 30);
        rect.resize(100, 40);
        rect.attr({
            body: {
                fill: 'blue'
            },
            label: {
                text: 'Hello',
                fill: 'white'
            }
        });
        rect.addTo(graph);

        var rect2 = rect.clone();
        rect2.translate(300, 0);
        rect2.attr('label/text', 'World!');
        rect2.addTo(graph);

        var link = new joint.shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.addTo(graph);

    </script>
</body>
</html>
```

这个代码说明了使用元素工作的基本思路：

+ 首先，调用元素的构造器创建元素
+ 其次，在元素上应用多种方法设置元素的属性（位置，大小，属性）
+ 最终，将元素添加到图表（graph）

在我们的案例中，这两个元素都是 <a><code>joint.shapes.standard.Rectangle</code></a> 的实例。<a>标准图库</a>中有诸多备用的定义元素（例如：椭圆、嵌入式图片、圆柱）可用于你的文档中。此外，高级开发者可通过拓展基础的 <a><code>joint.dia.Element</code></a> 类，使用他们自定义的元素。

我们的 demo 展示了一部分元素最重要的方法：

+ <a><code>element.position()</code></a> —— 设置元素源点（左上角）的位置，这个位置相对于画布（paper）的坐标系统（考虑了画布的缩放及其他变形）。
+ <a><code>element.resize() </code></a> —— 设置元素的大小。
+ <a><code>element.clone() </code></a> —— 克隆一个已存在的元素，包括它的位置，大小和属性（属性在之后详细介绍）
+ <a><code>element.translate() </code></a> —— 沿着坐标轴按照指定的距离移动元素。也有<a>缩放</a>和<a>旋转</a>的方法
+ <a><code>element.addTo() </code></a> —— 添加元素到图表(graph)中，这样它才能渲染。

## 元素样式
显而易见，最重要的函数是改变元素样式的函数：
+ <a><code>element.attr() </code></a> —— 以编程方式直接将 SVG 属性设置于的 SVG 元素之上。（在此定义的样式之上仍然可以使用 CSS 样式，且 CSS 样式优先于这些属性）

当调用 <code>element.attr</code> 时传入的参数为对象时，对象的 <code>keys</code> 对应于 SVG图形的选择器。在设置值时，可以在对象中设置一个或多个属性。如果你仅仅只需更改一个值，你也可以调用<code>element.attr</code> 时传入两个参数，第一个是类似于 <code>'selector/attribute' </code> 格式的属性路径，第二个是要设置的值。  





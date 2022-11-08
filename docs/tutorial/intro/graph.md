# 图表与画布
现在，我们已经将 JointJS 引入到我们的 web 页面，可以开始创建我们的图表了。

在这一部分，我们将学会如何通过在 JointJS 代码中创建图表和画布，并将他们连接到 HTML 中完成设置。
接下来我们将看看最初的 “Hello World” 应用。

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
            gridSize: 1,
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

所有可用的 JointJS 应用都需要一个图表和画布。这个图表（graph）中包含几何图形所有组件的引用。而画布（paper）是渲染图表（graph）必不可少的存在。

图表模型（graph model）通常在 JointJS 代码的开始定义。在我们的代码中，我们保存这个模型引用使用变量 <code> var graph </code>。为了使我们的元素（elements 和 links）渲染，我们需要将其添加到图表（graph）中。直到我们添加元素，这个图表才知道他们的存在。在我们的例子中，我们通过 <code> addTo </code> 函数，我们也可以通过 <code> graph.addCells </code> 函数。

图表（graph）的第二个参数是一个配置对象————包含元素命名空间（<code> cellNamespace </code>）选项。这一选项声明了 JointJS 从何处读取元素模型定义。默认情况下，这个定义可在 <code>  joint.shapes </code> 命名空间中找到。

通常，画布视图（Paper view）在图表（graph）定义后直接指定。我们使用一个配置对象创建它并将其保存为 <code> var paper</code>。在下列的选项中，这两项定义了至关重要的画布（paper）属性：

+ <code>el</code> —— 指定画布（paper）渲染的 HTML 元素
+ <code>graph</code> —— 想要渲染在画布（paper）上的图表模型（graph model）

这些属性将渲染的画布与我们的 HTML 元素联系在一起，同时与我们的 JointJS 数据（元素和连接）关联在一起。这使得画布（paper）成为任一图表中最为重要的构成元素！

其余三项属性指明了画布（paper）的展示属性。在我们的例子中，是如下的属性：

+ <code>width</code> 和 <code>height</code> —— 渲染画布（paper）的大小 (单位：像素)
+ <code>gridSize</code> —— 元素对齐的网格大小，影响着元素移动的粒度

最后一项配置是元素视图命名空间（<code>cellViewNamespace</code>）。这一配置可被用来指示 JointJS 去何处寻找元素模型（cell models）定义。元素视图命名空间（<code>cellViewNamespace</code>）和元素命名空间（<code>cellNamespace</code>）常常一起使用，但是仅需要其中之一声明默认的命名空间。

画布（Paper）的全部属性是很长的，且几乎允许自定义画布渲染的一切属性。你将在引导模块的高级部分中遇到这些。最常用的画布（paper）属性可在 <a>画布属性demo</a>中找到。

## 画布样式

现在，我们对最初的 <em><strong>Hello World</strong></em> 应用外观做些改变。我们可以使用 <code>background</code> 属性定义背景色，并使用 <code>drawGrid</code> 来绘制栅格。为了栅格可展示，我们也需要增加<code>gridSize</code>：

代码如下，更改部分高亮展示：
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

## 附录：画布缩放
在定义画布后，我们可以使用 <code>paper.scale()</code> 函数使得画布及其全部内容变形。移步至高级区的 <a>复杂画布引导</a> 去学习如何使用这一功能实现图表的最小化及预览。下面的例子代表图形（diagram）缩小一半。注意：这个缩放并不影响画布（paper）本身的大小

::: tip
paper.scale(0.5, 0.5);
:::

## 附录：移动画布
我们可以使用 <code>paper.translate()</code> 函数移动画布的坐标原点及其内部的全部内容；当在<a>自定义交互</a>中使用时，它可以实现画布的平移功能。下面的例子代表缩小后的图形（diagram）从上方移动（300,50）个单位

::: tip
paper.translate(300, 50);
:::

我们现在已经了解了图表（Graph）和画布（Paper）对象的重要性，并且知道了如何更改画布（paper）的外观。接下来，我们学习如何使用 <a href="/tutorial/intro/element.html">elements</a>
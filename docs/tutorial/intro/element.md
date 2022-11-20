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

如果你完全不熟悉 SVG，那么你可以看一看 <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes">填充与笔画的教程</a>。JointJS 能够处理所有标准的 SVG 属性，然而请注意：出于一致性考虑，我们极力推荐开发者使用驼峰式命名，并且避免在属性名称中使用引号。另外，JointJS 提供了一系列非标准的特殊 JointJS 属性。这些允许你指定相对于其他形状选择器的属性。特殊属性在教程的后续情节中详细讨论！

我们的例子中应用的 <a><code>joint.shapes.standard.Rectangle</code></a> 图形定义了两个选择器：<code>body</code> (<code><rect/></code> SVG标签)，<code>label</code> (图形内部的<code><text/></code> SVG标签)。其他的元素图形有它们自己的选择器名字（尽管在适用性上保留了一致，例如：<code>body</code>）。请参考 <code>joint.shapes.standard</code> <a href="">文档</a> 获取详细信息。

在 <code>rect</code> 元素的例子中，我们可以看到 <code>body</code> 选择器设置了 <code>fill</code> 颜色属性，同时 <code>label</code> 选择器也设置了它的 <code>text</code>内容 <code>'Hello'</code> (通过 <code> JointJS 特殊属性</code>)

```js
rect.attr({
    body: { // selector for the <rect> SVGElement
        fill: 'blue'
    },
    label: { // selector for the <text> SVGElement
        text: 'Hello',
        fill: 'white'
    }
});
```

在 <code>rect2</code> 元素的例子中，我们通过<code>'label/text'</code>设定 <code>'World'</code> 值。此处的 <code>label</code> 是<code><text/></code>SVG 元素的选择器，<code>text</code> 是我们想要修改的属性

```js
rect2.attr('label/text', 'World!');
```

注意：这种调用等同于上面的调用

```js
rect2.attr('label', {
    text: 'World!'
});
```

这种相同的效果也可以通过传一个对象参数（<code>rect2.attr()</code>）

```js
rect2.attr({
    label: {
        text: 'World!'
    }
});
```

## 示例
现在我们使用 <code>element.attr()</code> 修改元素的外观。

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
            height: 300, // height had to be increased
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

        var rect2 = new joint.shapes.standard.Rectangle();
        rect2.position(400, 30);
        rect2.resize(100, 40);
        rect2.attr({
            body: {
                fill: '#2C3E50',
                rx: 5,
                ry: 5,
                strokeWidth: 2
            },
            label: {
                text: 'World!',
                fill: '#3498DB',
                fontSize: 18,
                fontWeight: 'bold',
                fontVariant: 'small-caps'
            }
        });
        rect2.addTo(graph);

        var link = new joint.shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.addTo(graph);

        var rect3 = new joint.shapes.standard.Rectangle();
        rect3.position(100, 130);
        rect3.resize(100, 40);
        rect3.attr({
            body: {
                fill: '#E74C3C',
                rx: 20,
                ry: 20,
                strokeWidth: 0
            },
            label: {
                text: 'Hello',
                fill: '#ECF0F1',
                fontSize: 11,
                fontVariant: 'small-caps'
            }
        });
        rect3.addTo(graph);

        var rect4 = new joint.shapes.standard.Rectangle();
        rect4.position(400, 130);
        rect4.resize(100, 40);
        rect4.attr({
            body: {
                fill: '#8E44AD',
                strokeWidth: 0
            },
            label: {
                text: 'World!',
                fill: 'white',
                fontSize: 13
            }
        });
        rect4.addTo(graph);

        var link2 = new joint.shapes.standard.Link();
        link2.source(rect3);
        link2.target(rect4);
        link2.addTo(graph);

        var rect5 = new joint.shapes.standard.Rectangle();
        rect5.position(100, 230);
        rect5.resize(100, 40);
        rect5.attr({
            body: {
                fill: '#2ECC71',
                strokeDasharray: '10,2'
            },
            label: {
                text: 'Hello',
                fill: 'black',
                fontSize: 13
            }
        });
        rect5.addTo(graph);

        var rect6 = new joint.shapes.standard.Rectangle();
        rect6.position(400, 230);
        rect6.resize(100, 40);
        rect6.attr({
            body: {
                fill: '#F39C12',
                rx: 20,
                ry: 20,
                strokeDasharray: '1,1'
            },
            label: {
                text: 'World!',
                fill: 'gray',
                fontSize: 18,
                fontWeight: 'bold',
                fontVariant: 'small-caps',
                textShadow: '1px 1px 1px black'
            }
        });
        rect6.addTo(graph);

        var link3 = new joint.shapes.standard.Link();
        link3.source(rect5);
        link3.target(rect6);
        link3.addTo(graph);

    </script>
</body>
</html>
```

<a>过滤器和渐变的教程</a> 说明了应用于元素中的 SVG样式更高级的方法。

我们已经知道了如何更改元素的外观，下一步我们学习使用<a href="/tutorial/intro/link.html">连接（links）</a>





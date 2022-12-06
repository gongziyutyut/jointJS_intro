# 连接
在<a href="/tutorial/intro/element.html">上一部分</a>，我们着重于使元素看起来更有趣。

在这一部分，我们尝试去理解 JointJS 图形另一至关重要的构成元素 —— 连接！下面是关于 <em>Hello World</em> 应用中连接（links）展示的介绍。更多高级应用在教程的后续系列将会涉及。接下来，我们用上一部分修改的代码继续。

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

连接（links）的使用类似于元素（elements）的使用：
+ 首先，调用它的构造器创建连接（link）
+ 其次，调用不同的方法应用于连接（link），然后设置它的属性（源、目标、顶点、路由及连接器、属性、标签）
+ 最后，将连接（links）添加到图表（graph）中

在我们的案例中，三项连接都是<code>joint.shapes.standard.Link</code>的实例。<a>标准图形库</a> 包含许多开箱即用的连接定义（例如：双重线和虚线），这些都可应用于你的文档。然而，高级开发可以通过拓展 <code>joint.dia.Link</code> 类，定义自己的连接。

我们的案例展示了两种必须的 <a>连接方法</a>:
+ <a>link.source()</a> 和 <a> link.target()</a> - 设置连接的 源/目标。为了将连接（link）与元素关联，需要传递一个元素（element）到函数中。为了将连接(link)“钉”在画布（paper）中的一个固定点上，需要传递一个 <code>g.Point</code>（或者一个包含<code>x</code> 和 <code>y</code>的对象）。

其他重要的方法：
+ <a><code>link.clone()</code></a> —— 克隆一个已存在的连接（link）,包含它的源，目标，顶点路由，连接器，属性以及标签等等（属性及标签在后续详细解释）
+ <a><code>link.addTo()</code></a> —— 将连接（link）到画布（graph）,以便连接能够渲染

## 连接几何
以下三种方法（link）可以设置连接的图形：
+ <a><code>link.vertices()</code></a> —— 设置连接的顶点数组

顶点是用户在画布(paper)中设置的点，连接从源到目标的路径中，应该通过这些点。默认是一个空数组（意味着连接(link) 从源到目标没有绕路）。

+ <a><code>link.router()</code></a> —— 设置连接（link）的路由

路由器（router）是一个函数，它接受连接（link）的顶点数组，而且依据需要添加额外的点创建满足所需特征的路由(route)。例如，<code>正交（orthogonal）</code>路由器创建的路由是由垂直与水平的线直角相连。JointJS 在 <code> joint.routers </code> 中附赠了预定义的路由器集合。有两个提供的路由器是智能路由器，它们在前进的路上可以绕开障碍。默认的是<a><code>普通（normal）</code></a>路由器，返回顶点数组作为路由顶点。

+ <a><code>link.connector()</code></a> —— 设置连接(link)的<code> connector  </code>

连接器是一个函数，它负责渲染画布(paper)中连接(link)的线。它采用由路由器提供的路由点数组，构建一系列 SVG 元素的路径数据命令，以创建具有所需特征的路径。例如，圆形的（rounded）连接器在路线点周围创建带有圆角的直线段。JointJS 在<code> joint.connectors </code>中附赠了一系列预定义的集合。默认的是<a><code>普通（normal）</code></a>连接器，它使用简单的直线连接路由点。高级开发可以开发自定义的连接器满足自定义的连接策略。

<a><code>Link geometry </code></a>也受到应用于连接源和连接目标的锚点及连接点，以及设置于画布的连接策略的影响。

## 连接(link)样式

连接(link) 样式的原理类似元素（element）样式:
+ <a><code>link.attr()</code></a> —— 编程式直接设置连接(link)标记的 SVG元素。（在此处定义的样式，CSS 样式仍然可以应用于其之上，并且 CSS 样式优先于这些属性）

当 <code>link.attr()</code> 被调用时传入的参数为对象时，对象的 <code>keys</code> 对应于 SVG图形的选择器。在设置值时，可以在对象中设置一个或多个属性。如果你仅仅只需更改一个值，你也可以调用<code>link.attr()</code> 时传入两个参数，第一个是类似于 <code>'selector/attribute' </code> 格式的属性路径，第二个是要设置的值。 

如果你完全不熟悉 SVG，那么你可以看一看 <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes">填充与笔画的教程</a>。JointJS 能够处理所有标准的 SVG 属性，然而请注意：出于一致性考虑，我们极力推荐开发者使用驼峰式命名，并且避免在属性名称中使用引号。另外，JointJS 提供了一系列非标准的特殊 JointJS 属性。这些允许你指定相对于其他形状选择器的属性。特殊属性在教程的后续情节中详细讨论！

用于我们案例的<code> joint.shapes.standard.Link </code>图形定义了两个选择器：<code>link</code>（连接(link)中可视化的 <code>path</code> SVG元素，包装器（在连接 (link) 之下更宽的、透明的 <code>path</code> SVG元素））。其他的连接图形有它们自己的选择器名称（但是在适用性方面保持一致，例如：<code>line</code>）;请参考 <code>joint.shapes.standard</code> <a href="">文档</a> 获取详细信息。

例如，我们可以通过更改 <code>line</code> 选择器中的 <code>stroke</code> 的 <code>color</code> 属性来改变连接（link）的颜色
```js
link.attr('line/stroke', 'orange');
```
这种相同的效果也可以通过传一个对象参数（<code>link.attr</code>）

```js
link.attr({
    line: { // selector for the visible <path> SVGElement
        stroke: 'orange' // SVG attribute and value
    }
});
```
## 连接(link)箭头

有两个特殊属性负责连接(link)箭头————<a><code>sourceMarker</code></a> 和 <a><code>targetMarker</code></a>（在<code>joint.shapes.standard.Link</code> 示例中，它们被定义在 <code>line</code> 选择器中）。箭头的 <code> 'type'</code> 可以是任意有效的 SVG元素类型。我们特意介绍 <code>path</code> 和 <code>image</code> 箭头，但是在教程的 <a>高级部分</a> ，我们将介绍其他类型。

下面的例子展示了如何创建一个带有两个简单的 <code>path</code> 箭头的连接。注意：如果没有指定 <code>fill</code> 和 <code>stroke</code> 的颜色，那么它们将采用 <code>line.stroke</code> 属性的颜色。尽管这两个箭头指向相反方向，但是它们有着相同的路径数据命令。这是因为所有的 <code>targetMarker</code> 值都自动旋转了180度。路径命令的坐标系统原点在连接(link) 的顶端，并且依据连接（link）在该点的斜率旋转。综上所述，这些特征意味着你可以设计所有箭头，就好像它们都指向左侧，并且都指向局部坐标系统的 0，0点；<code>JointJS</code> 将负责其余的工作，让我们用一个简单的时钟来说明：
:::tip
1. 箭头的起点默认是没箭头的一侧端点
2. <code>sourceMarker</code> 和 <code>targetMarker</code> 是用来改变端点图形的
3. 下面的代码会改变连接（link）的起点与终点展示形式
4. 因为连接(link) 本身有起点与终点之分，所以箭头才会自动旋转 180 度 
:::
```js
link.attr({
    line: {
        sourceMarker: { // hour hand
            'type': 'path',
            'd': 'M 20 -10 0 0 20 10 Z'
        },
        targetMarker: { // minute hand
            'type': 'path',
            'stroke': 'green',
            'stroke-width': 2
            'fill': 'yellow',
            'd': 'M 20 -10 0 0 20 10 Z'
        }
    }
});
```
创建一个图形箭头同样很简单。仅需要为 <code>'xlink:href'</code> 属性提供图片地址的 <code>url</code>，然后指定期望的 <code>width</code> 和 <code>height</code>。正如预期所见，对于 <code>targetMarker</code> 的图片会自动旋转 180 度。如果需要图片居于中心，记得在 Y 轴方向重新定位图片。我们继续看之前的例子：

```js
link.attr({
    line: {
        sourceMarker: {
            'type': 'image',
            'xlink:href': 'http://cdn3.iconfinder.com/data/icons/49handdrawing/24x24/left.png',
            'width': 24,
            'height': 24,
            'y': -12
        },
        targetMarker: {
            'type': 'image',
            'xlink:href': 'http://cdn3.iconfinder.com/data/icons/49handdrawing/24x24/left.png',
            'width': 24,
            'height': 24,
            'y': -12
        }
    }
});
```

## 连接(link)标签
JointJS 同样支持连接(link)标签：
+ <a><code>link.labels()</code></a> —— 设置连接(link)的标签数组，标签有<code> markup, attrs, and position</code> 等属性。

<a>连接(link)标签将在本教程的单独部分详细介绍</a>。一个简单的标签定义(包括<code>markup 和 attrs</code>)内置于 <code>joint.dia.Link</code>类，并且 <code>joint.shapes.standard.Link</code> 类型继承了它。内置的默认标签(label)有两个标签（tags）：<code>text</code>（text SVG 元素），<code>rect</code>（rect SVG 元素, 负责标签的背景）。内置的默认属性指定了一个简单的白色圆角矩形上垂直居中的文本。因此，添加一个标签就像为<code>text/text</code>属性添加值一样简单。

```js
link.labels([{
    attrs: {
        text: {
            text: 'Hello, World'
        }
    }
}]);
```

注意：因为我们仅仅添加一个标签，我们也可以使用<code> link.appendLabel() </code>便捷函数。
```js
link.appendLabel({
    attrs: {
        text: {
            text: 'Hello, World'
        }
    }
});
```
更多关于连接(link)标签的高级内容，包括自定义位置，样式和标记等，将在本教程的单独章节介绍。

## 示例
现在，利用我们所学玩一玩我们的连接(links):

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
            height: 300,
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
        link.attr({
            line: {
                stroke: 'blue',
                strokeWidth: 1,
                sourceMarker: {
                    'type': 'path',
                    'stroke': 'black',
                    'fill': 'red',
                    'd': 'M 10 -5 0 0 10 5 Z'
                },
                targetMarker: {
                    'type': 'path',
                    'stroke': 'black',
                    'fill': 'yellow',
                    'd': 'M 10 -5 0 0 10 5 Z'
                }
            }
        });
        link.labels([{
            attrs: {
                text: {
                    text: 'Hello, World!'
                }
            }
        }]);
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
        link2.vertices([
            new g.Point(250, 100),
            new g.Point(300, 150),
            new g.Point(350, 200)
        ]);
        link2.router('orthogonal');
        link2.connector('rounded');
        link2.attr({
            line: {
                stroke: 'gray',
                strokeWidth: 4,
                strokeDasharray: '4 2',
                sourceMarker: {
                    'type': 'image',
                    'xlink:href': 'http://cdn3.iconfinder.com/data/icons/49handdrawing/24x24/left.png',
                    'width': 24,
                    'height': 24,
                    'y': -12
                },
                targetMarker: {
                    'type': 'image',
                    'xlink:href': 'http://cdn3.iconfinder.com/data/icons/49handdrawing/24x24/left.png',
                    'width': 24,
                    'height': 24,
                    'y': -12
                }
            }
        });
        link2.addTo(graph);

        var link3 = new joint.shapes.standard.Link();
        link3.source(rect3);
        link3.target(rect4);
        link3.connector('jumpover', { size: 10 });
        link3.addTo(graph);

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

        var link4 = new joint.shapes.standard.Link();
        link4.source(rect5);
        link4.target(rect6);
        link4.attr({
            line: {
                stroke: '#3498DB',
                strokeWidth: 3,
                strokeDasharray: '5 5',
                strokeDashoffset: 7.5,
                sourceMarker: {
                    'type': 'path',
                    'stroke': 'none',
                    'fill': '#3498DB',
                    'd': 'M 20 -10 0 0 20 10 Z \
                        M 40 -10 20 0 40 10 Z'
                },
                targetMarker: {
                    'type': 'path',
                    'stroke': 'none',
                    'fill': '#3498DB',
                    'd': 'M 7.5 -10 2.5 -10 2.5 10 7.5 10 Z \
                        M 17.5 -10 12.5 -10 12.5 10 17.5 10 Z \
                        M 40 -10 20 0 40 10 Z'
                }
            }
        });
        link4.addTo(graph);

    </script>
</body>
</html>
```

以上，JointJS 的介绍教程到此结束。祝贺你，我们已经从最初的应用走了很长的路！

现在你已经学过了基础部分，你应该已经很自信的可以应用 JointJS 最重要的构成模块——图表（Graphs），画布（Papers），元素(Elements)和连接(Links)。

接下来，我们将前往教程的 <a href="/tutorial/intermediate/summary.html">进阶部分</a>，它介绍了一些方便但更复杂的概念。

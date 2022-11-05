# 安装
在当前模块的第一部分，我们看到了一个简单的 JointJS 应用案例。

在这一章，我们要学习如何安装 JointJS 并将其引入到我们的页面中。

为了 JointJS 应用的顺利运行，JointJS 库及其依赖必须在你的页面源 HTML 中引入。我们的初始案例是使用了 CDN 链接引入必要的资源：JointJS, jQuery, Lodash and Backbone。

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jointjs/3.6.2/joint.css" />
</head>
<body>
    <!-- content -->
    <div id="myholder"></div>

    <!-- dependencies -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.4.1/backbone.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jointjs/3.6.2/joint.js"></script>

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

如果你不想使用 CDN，那么你可以使用本地安装来替代。倘若你的系统已经安装了 NPM，那么在命令行中运行如下的命令：
::: tip
npm install --save jointjs
:::

然后，你可以在生成的 node_modules 文件夹找到需要的全部源文件的各自的文件夹。代码片段如下所示（依然是在之前 demo 中展示的例子）

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

现在，JointJS 已经引入了页面，我们可以开始构建我们的图表了。

下一步，我们需要创建一个 <a href="/tutorial/intro/graph.html">图表</a> 并将其放置于画布（paper）中。
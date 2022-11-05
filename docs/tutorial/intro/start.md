# 开始

在接下来几页的简单介绍中，我们将明白如何创建基础的 JointJS 图表：

你可以将下面的代码复制粘贴到新的文件去查看效果

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
即使上面的代码相当地简洁，但它创建了一个完全可交互的 JointJS 图表。为了生成一个可视化的输出，JointJS 需要完成如下的准备：
+ JointJS 及其自身依赖
+ 定义图表（graph）和画布 (画布)
+ 创建两个矩形
+ 创建一个连接来连接两个元素
我们将依次查看这些步骤。使用上述列表作为基础引导的主题

首先，我们需要确认我们已经安装了 JointJS 并准备使用。

# 事件系统
<em>这是 JointJS 教程进阶部分的第二篇文章。返回 <a href="/tutorial/intermediate/special_attrs.html">特殊属性</a> </em>

JointJS 提供了多种方式满足用户的交互。在画布中，在单个的元素/连接视图上触发。

## 内置画布事件
在用户交互上，画布会自动触发数个内置事件。包括有鼠标摁下，双击和右键事件，以及连接或者元素高亮事件。可以在 <a>画布文档</a> 中找到全部列表。对于这些事件中任一事件的响应只是简单地在画布中添加监听器。这是组件所有实例上检测一种交互类型的最简单方式

例如，当在图表中的任一连接上双击时，事件 <code>'link:pointerdblclick'</code> 会被触发并检测到。对于 Element 匹配的事件(<code>'element:pointerdblclick'</code>), cells (<code>'cell:pointerdblclick'</code>)，画布空白区域（<code>'blank:pointerdblclick'</code>）也一一提供。无论 Element 还是 Link 何时被点击，cell 事件监听器都会释放事件信息。更具体的 element 和 link 事件监听器可以改变模型的笔触颜色。最后，空白区事件监听器可以隐藏信息元素并且改变画布背景色。
~~~js
paper.on('blank:pointerdblclick', function() {
    resetAll(this);

    info.attr('body/visibility', 'hidden');
    info.attr('label/visibility', 'hidden');

    this.drawBackground({
        color: 'orange'
    });
});

paper.on('element:pointerdblclick', function(elementView) {
    resetAll(this);

    var currentElement = elementView.model;
    currentElement.attr('body/stroke', 'orange');
});

paper.on('link:pointerdblclick', function(linkView) {
    resetAll(this);

    var currentLink = linkView.model;
    currentLink.attr('line/stroke', 'orange');
    currentLink.label(0, {
        attrs: {
            body: {
                stroke: 'orange'
            }
        }
    });
});

paper.on('cell:pointerdblclick', function(cellView) {
    var isElement = cellView.model.isElement();
    var message = (isElement ? 'Element' : 'Link') + ' clicked';
    info.attr('label/text', message);

    info.attr('body/visibility', 'visible');
    info.attr('label/visibility', 'visible');
});

function resetAll(paper) {
    paper.drawBackground({
        color: 'white'
    });

    var elements = paper.model.getElements();
    for (var i = 0, ii = elements.length; i < ii; i++) {
        var currentElement = elements[i];
        currentElement.attr('body/stroke', 'black');
    }

    var links = paper.model.getLinks();
    for (var j = 0, jj = links.length; j < jj; j++) {
        var currentLink = links[j];
        currentLink.attr('line/stroke', 'black');
        currentLink.label(0, {
            attrs: {
                body: {
                    stroke: 'black'
                }
            }
        });
    }
}
~~~

事件监听器的回调函数有签名 <code>callback([cellView,] eventObject, eventX, eventY)</code>(显而易见，<code>cellView</code> 并不提供 <code>''blank:…''</code> 之类事件)。在事件监听器内部，画布本身可通过 <code>this</code> 获得。例如，事件对象可以用来阻止冒泡（<code>stopPropagation()</code>）。当在用户交互点放置标记时，<code>x</code> 和 <code>y</code> 坐标非常有用！上面的例子中，我们没有用到这三个参数，但是在 JointJS 事件中你将频繁地遇到他们。

注意，所有的这些事件也会在与用户交互的单个 <code>cellView</code> 之上触发。因此，你可以完成如上相似的功能，通过在每个 <code>elementView</code> 和 <code>linkView</code> 上分别添加监听器。尽管这个方法有其用途，但是我们依然建议使用画布监听器；单个监听器覆盖所有交互选项优于单个视图上添加数十个监听器。

## 内置图形事件
图表模型也有几个内置的事件。这些事件对单元模型的属性变化作出反应，包括位置，尺寸，属性，以及 JointJS 渐变状态。JointJS 文档包含有用户可交互的通用的图表事件清单，以及更详细的 Element 事件清单和 Link 事件清单。在你的图表模型中增加一个监听器，就可以与这些事件交互。

在下面的示例中，element 上的事件 <code>'change:position'</code> 会在元素移动时触发。我们决定元素中心新的位置并将其写入到文本标签中。当连接上的目标被移动时，绑定于其上的事件 <code>'change:target'</code> 会被触发。我们借用这个事件将新的目标位置写入到连接标签中。
~~~js
graph.on('change:position', function(cell) {
    var center = cell.getBBox().center();
    var label = center.toString();
    cell.attr('label/text', label);
});

graph.on('change:target', function(cell) {
    var target = new g.Point(cell.target());
    var label = target.toString();
    cell.label(0, {
        attrs: {
            label: {
                text: label
            }
        }
    });
});
~~~

图表单元 change 事件的回调函数有签名 <code>callback(cell, newValue)</code> 。在这个监听器的内部，图表自身可通过 <code>this</code> 获得。在我们的示例中，我们可以假定接收到的单元模型分别为 Element 和 Link 类型, 因为 Link 对象并不会触发 <code>'change:position'</code> 并且 Element 对象不会触发 <code>'change:target'</code>。需要牢记：一些图表事件在两种元素类型上都会触发（例如：<code>'change:attrs'</code>）。无论如何，鉴于你想要完成的事情，你需要首先检查实际的数据类型！

其他的图表事件监听器提供了不同的参数。通用的<code>'graph:change'</code>仅仅接收变化的单元，并不是新值（<code>callback(cell)</code>）。<code>'graph:add'</code> 事件监听器接收增加的元素及更新的元素数组（<code>callback(cell, newCells)</code>），然而<code>'graph:remove'</code> 事件监听器接收删除的元素和初始元素数组（<code>callback(cell, oldCells)</code>）

类似内置的画布事件，这些事件也会由用户交互的单独的图形单元（element 或者 link 模型）触发。因此，你可以通过分别在每个元素上添加监听器完成如上相同的功能。尽管这种方法有其用途，但是我们依然建议使用 graph 监听器；在 Javascript 中相较于为单个元素添加数十个监听器，使用单个监听器覆盖所有的交互是更好的实现方式。

图表也可以对其自身属性的变化作出响应。例如，调用 <code>graph.set('property', true)</code> 将会触发 graph 之上的 <code>'change:property'</code>。 graph 属性的事件监听器接收 graph 的引用和新值作为参数 <code>(callback(graph, newValue))</code>。

注意，出于向后兼容性的考虑。如果我们不小心选择了自定义 graph 属性名容易导致混乱。如果我们命名自定义属性为 position 而不是 property，那么触发的事件将会识别为 <code>'change:position'</code>，并且会被我们示例中的事件监听器捕捉到。回调函数将不得不处理一系列意料之外的参数。为了避免命名冲突，我们强烈建议为自定义的 graph 属性采用命名约束—— 例如，变量名以 'graph' 开始（<code>graphProperty and graphPosition</code>） 如果你需要支持自定义的属性，你可以通过断言 cell 参数不是实际的图表来确保自己安全。
~~~js
graph.on('change:position', function(cell) {
    if (cell instanceof joint.dia.Graph) return;
    var center = cell.getBBox().center();
    var label = center.toString();
    cell.attr('label/text', label);
});
~~~

## 子元素事件属性

在你的图表中，为单独的组件添加自定义事件最简单的方式就是使用 event 这个特殊属性。
+ <code>event</code> —— 为子元素的模型上添加指定的事件，那么当 JointJS 检测到子元素上的手指按下事件（mousedown/touchstart DOM event） 就会触发。

这一属性对于创建带有自定义工具子元素的 element 十分有用。然后你可以简单地在 paper 上增加事件监听器，当事件检测到后就会得到调用。

在下面的例子中，我们定义了一个带有按钮子元素的 element 类型。我们在按钮上附加了自定义的事件 <code>'element:button:pointerdown'</code> 并进行了监听。当按钮被摁下时，这个 element 的 body 及 label 被隐藏（minimized）并且按钮的符号也改变了，新的符号指示着 element 现在可以放大。

~~~js
var CustomElement = joint.dia.Element.define('examples.CustomElement', {
    attrs: {
        body: {
            width: 'calc(w)',
            height: 'calc(h)',
            strokeWidth: 2,
            stroke: 'black',
            fill: 'white'
        },
        label: {
            textVerticalAnchor: 'middle',
            textAnchor: 'middle',
            x: 'calc(0.5*w)',
            y: 'calc(0.5*h)',
            fontSize: 14,
            fill: 'black'
        },
        button: {
            cursor: 'pointer',
            ref: 'buttonLabel',
            width: 'calc(1.5*w)',
            height: 'calc(1.5*h)',
            x: 'calc(x-calc(0.25*w))',
            y: 'calc(y-calc(0.25*h))'
        },
        buttonLabel: {
            pointerEvents: 'none',
            x: 'calc(w)',
            y: 0,
            textAnchor: 'middle',
            textVerticalAnchor: 'middle'
        }
    }
}, {
    markup: [{
        tagName: 'rect',
        selector: 'body',
    }, {
        tagName: 'text',
        selector: 'label'
    }, {
        tagName: 'rect',
        selector: 'button'
    }, {
        tagName: 'text',
        selector: 'buttonLabel'
    }]
});

var element = new CustomElement();
element.position(250, 30);
element.resize(100, 40);
element.attr({
    label: {
        pointerEvents: 'none',
        visibility: 'visible',
        text: 'Element'
    },
    body: {
        cursor: 'default',
        visibility: 'visible'
    },
    button: {
        event: 'element:button:pointerdown',
        fill: 'orange',
        stroke: 'black',
        strokeWidth: 2
    },
    buttonLabel: {
        text: '＿', // fullwidth underscore
        fill: 'black',
        fontSize: 8,
        fontWeight: 'bold'
    }
});
element.addTo(graph);

paper.on('element:button:pointerdown', function(elementView, evt) {
    evt.stopPropagation(); // stop any further actions with the element view (e.g. dragging)

    var model = elementView.model;

    if (model.attr('body/visibility') === 'visible') {
        model.attr('body/visibility', 'hidden');
        model.attr('label/visibility', 'hidden');
        model.attr('buttonLabel/text', '＋'); // fullwidth plus

    } else {
        model.attr('body/visibility', 'visible');
        model.attr('label/visibility', 'visible');
        model.attr('buttonLabel/text', '＿'); // fullwidth underscore
    }
});
~~~

## 自定义视图事件
对于高级的事件定义，我们需要深入研究自定义视图。这是一个高级内容，有着更强大的选项。此处，我们专注于利用自定义事件拓展我们的视图对象。

Paper 对象有两个选项决定了用于渲染图表组件的视图：
+  <code> elementView </code> — 设置画布中渲染 Element 模型的 ElementView。默认是<code> joint.dia.ElementView </code>
+ <code> linkView </code> — 设置画布中渲染 Link 模型的  LinkView。默认是<code>  joint.dia.LinkView </code>

我们将使用这俩个配置项来提供拓展版本的 <code>default ElementView and LinkView</code>。这个例子是去除双击的元素。
~~~js
var paper = new joint.dia.Paper({
    el: document.getElementById('paper-custom-view-events'),
    model: graph,
    width: 600,
    height: 100,
    gridSize: 1,
    background: {
        color: 'white'
    },
    interactive: false, // disable default interaction (e.g. dragging)
    elementView: joint.dia.ElementView.extend({
        pointerdblclick: function(evt, x, y) {
            this.model.remove();
        }
    }),
    linkView: joint.dia.LinkView.extend({
        pointerdblclick: function(evt, x, y) {
            this.model.remove();
        }
    })
});
~~~

## 自定义视图事件传播

如果通知 <code>CellView and Paper</code> 事件，那么你可以通过内置的 paper 机制来保持对事件的识别。例如，在我们自定义的视图鼠标双击事件中，我们将包含 this：

~~~js
joint.dia.CellView.prototype.pointerdblclick.apply(this, arguments);
this.notify('element:pointerdblclick', evt, x, y);
~~~

如果你需要保持默认的事件处理行为，这会很有用！下面的例子集成了在 cell 上点击展示信息元素和画布事件 demo 中移除组件。
~~~js
var paper = new joint.dia.Paper({
    el: document.getElementById('paper-custom-view-events'),
    model: graph,
    width: 600,
    height: 100,
    gridSize: 1,
    background: {
        color: 'white'
    },
    interactive: false, // disable default interaction (e.g. dragging)
    elementView: joint.dia.ElementView.extend({
        pointerdblclick: function(evt, x, y) {
            joint.dia.CellView.prototype.pointerdblclick.apply(this, arguments);
            this.notify('element:pointerdblclick', evt, x, y);
            this.model.remove();
        }
    }),
    linkView: joint.dia.LinkView.extend({
        pointerdblclick: function(evt, x, y) {
            joint.dia.CellView.prototype.pointerdblclick.apply(this, arguments);
            this.notify('link:pointerdblclick', evt, x, y);
            this.model.remove();
        }
    })
});

paper.on('cell:pointerdblclick', function(cellView) {
    var isElement = cellView.model.isElement();
    var message = (isElement ? 'Element' : 'Link') + ' removed';
    info.attr('label/text', message);

    info.attr('body/visibility', 'visible');
    info.attr('label/visibility', 'visible');
});
~~~
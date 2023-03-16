# 自定义元素
<em>这是 JointJS 教程进阶部分的第四篇文章。返回 <a href="/tutorial/intermediate/serialization.html">特殊属性</a> </em>

JointJS 有数种内置的元素图形集合。在基础的 element 和 link 的 demo 中，我们已经看到了两种<code>joint.shapes.standard</code> 图形集合。

然而尽管有多种默认的图形供你选择，但是你可能会发现你求无所得并且想要创建一个属于你自己的图形定义。如果你早已熟知 SVG，那么在 JointJS 中创建一个新的图形非常简单。最重要的 SVG 元素是 <code>rect, text, circle, ellipse, image and path</code>，它们全面的示例描述和说明可在网络的其他地方找到，例如 MDN。于我们而言，重要的是了解组合基础的 SVG 图形，我们可以定义任何需要的 2D 图形。 

为此，我们使用 JointJS 的内置函数：
+ <code>Element.define(type [, defaultInstanceProperties, prototypeProperties, staticProperties])</code> —— 定义一个新的 Element 类的子类型。

如果你想从零开始创建一个 Element 子类型，你应该通过调用 <code>joint.dia.Element.define()</code> 来继承默认的 <code>joint.dia.Element</code> 类。你也可以继承任一预置的 JointJS 图形集合（例如 joint.shapes.standard.Rectangle.define()），甚至你可以继承任一你已经预先自定义的图形。

此处是 define() 函数的参数映射到熟悉的元素构建模块。
+ <code>type</code> —— 子类的名字
+ <code>defaultInstancePropertie</code> —— 包含属性的对象会设置到每一个子类的构建实例上。被用于指定默认的属性。
+ <code>prototypeProperties</code> —— 包含属性的对象会设置到子类的原型上。用于子类的内在属性，通常不做修改，用于指定形状标记。
+ <code>staticProperties</code> —— 包含属性的对象会被设置到子类型的构造器上，不常用，主要用于可替代的构造函数。

~~~js
joint.dia.Element.define('standard.Rectangle', {
    attrs: {
        body: {
            width: 'calc(w)',
            height: 'calc(h)',
            strokeWidth: 2,
            stroke: '#000000',
            fill: '#FFFFFF'
        },
        label: {
            textVerticalAnchor: 'middle',
            textAnchor: 'middle',
            x: 'calc(0.5*w)',
            y: 'calc(0.5*h)',
            fontSize: 14,
            fill: '#333333'
        }
    }
}, {
    markup: [{
        tagName: 'rect',
        selector: 'body',
    }, {
        tagName: 'text',
        selector: 'label'
    }]
});
~~~

## 命名
<code>define()</code> 函数的第一个参数是一个唯一的标识符，在此标识符下你可以找到一个新的类型。命名的第一部分 <code>joint.shapes</code> 是隐含的。因此，我们可以看到 <code>joint.shapes.standard.Rectangle</code> 访问的类型其命名必须是 <code>'standard.Rectangle'</code>

~~~js
var namespace = joint.shapes;

var graph = new joint.dia.Graph({}, { cellNamespace: namespace });

new joint.dia.Paper({
    el: document.getElementById('paper-custom-elements'),
    model: graph,
    width: 600,
    height: 400,
    cellViewNamespace: namespace
});

joint.dia.Element.define('standard.Rectangle', {
    attrs: {
        // Attributes
    }
}, {
    markup: [{
        // Markup
    }]
});
~~~

默认情况下，JointJS 从 <code>joint.shapes</code> 命名空间中读取 cell 定义。如果出于某些原因，你想要更改这种行为，这是可以的。我们可以通过组合 <code>cellNamespace</code> 和 <code>cellViewNamespace</code> 选项来实现，它们分别在 graph 和 paper 中可以找到。接下来一探究竟 。

~~~js
var customNamespace = {};
    
var graph = new joint.dia.Graph({}, { cellNamespace: customNamespace });

new joint.dia.Paper({
    el: document.getElementById('paper-custom-elements-namespace'),
    model: graph,
    width: 600,
    height: 100,
    cellViewNamespace: customNamespace
});

var Shape = joint.dia.Element.define('shapeGroup.Shape', {
    attrs: {
        // Attributes
    }
}, {
    markup: [{
        // Markup
    }]
});

Object.assign(customNamespace, {
    shapeGroup: {
        Shape
    }
});

graph.fromJSON({ 
    cells: [
        { 
            "type": "shapeGroup.Shape",
            "size": { "width": 500, "height": 50 },
            "position": { "x": 50, "y": 25 },
            "attrs": {
                "text": {
                    "text": "customNamespace.shapeGroup.Shape"
                }
            }
        }
    ]
}); 
~~~

如你所见，<code>type</code> 是非常重要的，尤其是你想要由  JSON 导入 graph 时。在上面的例子中，<code>graph</code> 寻找 <code>customNamespace.shapeGroup.Shape</code> 路径找到正确的构造器。如果我们在 <code>graph.fromJSON()</code> 中使用不正确的类型，那意味着 graph 不能找到正确的构造器，我们也无法看到自定义元素。

## 标记
Markup 通常作为 <code>define()</code> 函数的第三个参数来提供，以提高性能。（这是因为 markup 是所有元素类型实例共有的特质，因此从子类型中继承是更高效的。不过，通过后续提供单独的 markup ， 仍然可以为类的单个实例提供自定义标记）

<code> markup </code>属性作为 JSON 数组的形式指定。数组中的每个元素都用于定义新图形的子元素。使用对象定义的子元素包含有 <code>tagName</code>（字符串格式的子元素的 SVG 标签名）和一个选择器<code>selector</code>（图形中子元素的字符串标识）。更高级的 <code>markup.attributes</code>可以在 <a>自定义连接教程</a> 探索。尽管 JointJS 可以理解字符串格式的 SVG 标记，但是这个方法因为需要解析，所以显而易见地缓慢，且缺乏自定义选择器的兼容性。 

我们可以看到，<code>joint.shapes.standard.Rectangle</code> 由两种子类型组成——一个名为<code>body</code> 的SVGRectElement，一个名为<code> label </code>的SVGTextElement。
~~~js
{
    markup: [{
        tagName: 'rect',
        selector: 'body',
    }, {
        tagName: 'text',
        selector: 'label'
    }]
}
~~~

对于元素属性靶向子元素而言，选择器是非常重要的。尽管提供选择器去辨别子元素并未严格要求，但是它明显使得 JointJS 更快速，因为它可以避免查找 DOM。如果你确实不想为子元素的选择器发明一个自定义的名字，你可以使用子元素的标签名（每个标签最多只能有一个子元素；选择器名称必须是独一无二的）。

~~~js
{
    markup: [{
        tagName: 'rect',
        selector: 'rect',
    }, {
        tagName: 'text',
        selector: 'text'
    }]
}
~~~

## 默认属性
默认属性通常在 <code>define()</code> 函数的第二个参数的内部提供（默认的实例属性）。（这是因为元素类型的所有实例都期望有它们自己独一无二的属性，因此从原型继承可能会导致不必要的开销）。

在 attrs 对象中，keys 与子元素的选择器相匹配，正如在 markup 中定义的那样。每一个子元素都需要有一个属性名和值键值对的对象。每一个属性可以是原生 SVG 属性或者 <a>JointJS 特殊属性</a>

在 <code>joint.shapes.standard.Rectangle</code> 中，我们可以参考 <code>body</code> 看到子元素（例如 图形的  SVGRectElement）有其默认的 width 和 height，其值依据形状模型的大小设置（使用 calc() 函数）。关于 calc() 函数，在我们的 <a href="">属性</a> 文档可以了解更多。除了大小，你还可以看到填充和画线的样式。<code>label</code> 子元素（图形的 SVGTextElement 组件）有它的文本锚点，设置于文本盒模型的中心；这个点后续通过 x 和 y 属性被定位到模型盒的中心。它的字体尺寸及填充颜色也相继被指定。

~~~js
{
    attrs: {
        body: {
            width: 'calc(w)',
            height: 'calc(h)',
            strokeWidth: 2,
            stroke: '#000000',
            fill: '#FFFFFF'
        },
        label: {
            textVerticalAnchor: 'middle',
            textAnchor: 'middle',
            x: 'calc(0.5*w)',
            y: 'calc(0.5*h)',
            fontSize: 14,
            fill: '#333333'
        }
    }
}
~~~

我们提到了 model size —— body 的尺寸取决于它，但它是什么？ 每当用户
在 joint.shapes.standard.Rectangle 的实例上调用 <code> element.resize() </code> 时，用户可以设定 model size。例如，如果我们使用 <code> element.resize(100, 100) </code>, 那么参考尺寸为 100px * 100px。因此，如果没有应用变形， body 的尺寸将是（100， 100）。模型盒自身是不可见的，只有通过参考子元素才变得可视。此处，它的子元素是 body 子元素。
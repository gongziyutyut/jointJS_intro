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
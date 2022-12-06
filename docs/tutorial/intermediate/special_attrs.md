# 特殊属性
这是 JointJS 进阶教程的第一篇文章。

特殊属性是 JointJS 的指定属性，它提供的功能超过了原生 SVG 属性。早在 <a href="/tutorial/intro/element.html#元素样式">元素样式</a> 阶段，我们已经提到这一内容，并且在添加 <a>连接箭头</a>时见证了它的作用。当我们谈及自定义<a>元素</a>、<a>连接(links)</a>以及<a>连接标签</a>时，它们变得越来越重要！

定义 JointJS 图表的元素(elements)、连接(links)和标签(labels)时，主要方式是通过 <code>attrs</code> 对象。如果传递的属性是标准的 SVG 属性，那么它们只会传递给图形特有的 SVG 元素。当 <code>JointJS View classes</code> 要求渲染时，浏览器负责应用属性到元素中，并以请求的方式渲染图形。然而如果 JointJS 遇到它的某个特殊属性时，为了提供高级的功能，它会接管自定义逻辑。然后将结果编码为标准的 SVG 属性。

所有的 JointJS 特殊属性使用驼峰式命名。出于一致性考虑，强烈建议您在设定 SVG 属性时使用驼峰式命名，并利用 JointJS 能力将驼峰式命名的特殊属性转化为原生的 SVG。（例如：使用<code>strokeWidth</code>，而不是 <code>'stroke-width'</code>）

原生 SVG 属性可以在其他地方找到；例如，<a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute"> MDN's SVG Attribute reference</a>时。在这一部分的教程中，我们想要展示给您 JointJS 允许您做的额外的事情。

## 相对尺寸
当使用 SVG 时，最常见的需求是设置它的相对尺寸。JointJS 提供了一个  <code>calc</code> 函数，当指定 SVG 属性值时，这个函数可以执行计算。这允许您相对于图形模型的大小来调整子元素的大小。你可以在属性章节查看关于 <code>calc</code> 的文档。然而，因为所有的计算都是编程式的且不依赖浏览器的 bbox 策略，所以使用这个函数并不影响你的 app 性能（如果需要修改文本，还有一个基于视图的方法）

因为 <code>calc()</code> 使用通用的 SVG 属性，所以你可以使用熟悉的 SVG 属性轻松地执行相对大小的调整。例如，<code>'calc(w)'</code> 和 <code>'calc(h)'</code> 分别使用图形模型
的宽（<code>width</code> ）和 高（<code>height</code> ）。如果我们想要设置子元素一个左上的 <code>x</code> 坐标相对于图形模型 bbox 的左上角，我们可以应用 <code>'calc(w)'</code> 到子元素上。（JointJS 也包含一套 <code>ref</code> 属性来计算相对位置。然而，哦们现在建议使用 <code>calc()</code>）

## Ref 属性
+ <code>refWidth</code> 和 <code>refHeight</code> ——  设置子元素相对于模型 bbox 的宽度
+ <code>refX</code> 和 <code>refY</code> —— 设置子元素左上角相对于模型 bbox 左上角的坐标。百分比是相对于模型 bbox 解释的。
+ <code>refCx</code> 和 <code>refCy</code> —— 设置圆/椭圆的中心坐标。百分比相对于模型 bbox解释，可以与 <code>refX</code> 和 <code>refY</code> 一起使用
+ <code>refRx</code> 和 <code>refRy</code> —— 设置相对于模型 bbox 尺寸的椭圆半径。百分比是相对于模型 bbox 解释的。注意：出于向后的兼容性，设置 <code>'100%'</code> 意味着半径将是模型大小的 100%，但是直径在该方向将是模型尺寸的 200%。
+ <code>refR</code> —— 设置圆的半径，相对于模型 bbox 的更短边，百分比是相对于模型 bbox 解释的。注意：出于向后兼容性，设置 <code>'100%'</code>，意味着半径的长度达到模型边长的 100%。如果你想让圆放入模型，设置为 <code>'50%'</code>。还有 <code>refRCircumscribed</code>，用于设置圆的半径相对于模型长边的尺寸。

我们来看看使用 <code>calc()</code> 操作的相对尺寸调整。我们定义一个命名为 <code>CustomElement</code> 的自定义类型作为 <code>joint.dia.Element</code> 的子类型。
我们想要实现三个 SVG 元素，分别是红色的椭圆名为e，一个绿色的矩形名为r，还有一个蓝色的圆形名为c。矩形SVG 元素 outline 展示给我们元素模型的参考 bbox。在例子中，我们使用 JointJS 的渐变去使元素尺寸从(40,40) 到 (270,100)变化。（我们也调整了位置确保元素待在图纸的可视区域内。）注意：图形的子元素随着参考模型的尺寸变化而自动调整。
```js
var CustomElement = joint.dia.Element.define('examples.CustomElement', {
    attrs: {
        e: {
            strokeWidth: 1,
            stroke: '#000000',
            fill: 'rgba(255,0,0,0.3)'
        },
        r: {
            strokeWidth: 1,
            stroke: '#000000',
            fill: 'rgba(0,255,0,0.3)'
        },
        c: {
            strokeWidth: 1,
            stroke: '#000000',
            fill: 'rgba(0,0,255,0.3)'
        },
        outline: {
            x: 0,
            y: 0,
            width: 'calc(w)',
            height: 'calc(h)',
            strokeWidth: 1,
            stroke: '#000000',
            strokeDasharray: '5 5',
            strokeDashoffset: 2.5,
            fill: 'none'
        }
    }
}, {
    markup: [{
        tagName: 'ellipse',
        selector: 'e'
    }, {
        tagName: 'rect',
        selector: 'r'
    }, {
        tagName: 'circle',
        selector: 'c'
    }, {
        tagName: 'rect',
        selector: 'outline'
    }]
});

var element = new CustomElement();
element.attr({
    e: {
        rx: 'calc(0.5*w)',
        ry: 'calc(0.25*h)',
        cx: 0,
        cy: 'calc(0.25*h)'
    },
    r: {
        // additional x offset
        x: 'calc(w-10)',
        // additional y offset
        y: 'calc(h-10)',
        width: 'calc(0.5*w)',
        height: 'calc(0.5*h)'
    },
    c: {
        r: 'calc(0.5*d)',
        cx: 'calc(0.5*w)',
        cy: 'calc(0.5*h)'
    }
});
```

## 基于文本的相对尺寸
相对尺寸的一种高级应用是基于已渲染的 JointJS 视图设置图形子元素的尺寸。这非常有价值，当你需要基于 <code>text</code> 元素图形尺寸和位置来计算相对位置时，因为 JointJS 不能以编程方式处理它们。注意：因为这个方法依赖浏览器的计算，所以它相较于之前提到的基于模型的计算方法更慢，精确度更低；对于子元素来说，你应该使用 JointJS 建模的方法。

这个特殊属性 key 就是 <code>ref</code> ：
+ <code>ref</code> — 子元素的选择器参考，它测量的 bbox 应该作为相对计算的基准。我们定义一个命名为 <code>CustomElement</code> 的自定义类型作为 <code>joint.dia.Element</code> 的子类型。它类似于上面定义的 <code>CustomElement</code>，但这次，所有的子元素参考新的命名为 label 的<code>text</code> 组件。在这个例子中，我们使用 JointJS 渐变 去变化 label 的文本内容。注意：图形的子元素会随着 label 添加字符导致的尺寸的改变自动调整

~~~js
var CustomTextElement = joint.dia.Element.define('examples.CustomTextElement', {
    attrs: {
        label: {
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            fontSize: 48
        },
        e: {
            strokeWidth: 1,
            stroke: '#000000',
            fill: 'rgba(255,0,0,0.3)'
        },
        r: {
            strokeWidth: 1,
            stroke: '#000000',
            fill: 'rgba(0,255,0,0.3)'
        },
        c: {
            strokeWidth: 1,
            stroke: '#000000',
            fill: 'rgba(0,0,255,0.3)'
        },
        outline: {
            ref: 'label',
            x: '-calc(0.5*w)',
            y: '-calc(0.5*h)',
            width: 'calc(w)',
            height: 'calc(h)',
            strokeWidth: 1,
            stroke: '#000000',
            strokeDasharray: '5 5',
            strokeDashoffset: 2.5,
            fill: 'none'
        }
    }
}, {
    markup: [{
        tagName: 'ellipse',
        selector: 'e'
    }, {
        tagName: 'rect',
        selector: 'r'
    }, {
        tagName: 'circle',
        selector: 'c'
    }, {
        tagName: 'text',
        selector: 'label'
    }, {
        tagName: 'rect',
        selector: 'outline'
    }]
});

var element = new CustomTextElement();
element.attr({
    label: {
        text: 'Hello, World!'
    },
    e: {
        ref: 'label',
        rx: 'calc(0.5*w)',
        ry: 'calc(0.25*h)',
        cx: '-calc(0.5*w)',
        cy: '-calc(0.25*h)'
    },
    r: {
        ref: 'label',
        // additional x offset
        x: 'calc(0.5*w-10)',
        // additional y offset
        y: 'calc(0.5*h-10)',
        width: 'calc(0.5*w)',
        height: 'calc(0.5*h)'
    },
    c: {
        ref: 'label',
        r: 'calc(0.5*d)'
        // c is already centered at label anchor
    }
});
~~~

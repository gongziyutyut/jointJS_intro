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

## 连接箭头
负责连接箭头（link arrowheads）的特殊属性有两个，我们早在 <a href="/tutorial/intro/link.html#连接-link-箭头">基础教程篇</a> 提及过。
+ <code>sourceMarker</code> 和 <code>targetMarker</code> —— 为连接的起点与终点设置一个要求的 SVG 元素类型的箭头。以对象传递的参数中的其他属性是用于设置那个 SVG 元素的 SVG 属性。

连接箭头 （link arrowheads） 的特殊属性需要一个有着原生 SVG 属性的对象。这意味着它们无法理解 JointJS 特殊属性，而且它们无法利用 JointJS 的驼峰式命名转换。为了更好的令编程者理解这些限制，我们强烈建议在箭头标记属性周围使用引号（例如 <code>'type'</code> 而不是 <code>type</code>，<code>''stroke-width''</code> 而不是 <code>strokeWidth</code>）

箭头的 <code>'type'</code> 类型可以是任意有效的 SVG 元素类型。接下来的例子展示了如何使用两个简单的 <code>path</code> 创建一个连接。

尽管两个箭头指向相反方向，但是它们有着相同的路径数据命令。这是因为所有的 <code>targetMarker</code> 值都自动旋转了180度。路径命令的坐标系统原点在连接(link) 的顶端，并且依据连接（link）在该点的斜率旋转。这些特征意味着你可以设计所有箭头，就好像它们都指向左侧，并且都指向局部坐标系统的 0，0点，并且依赖 JointJS 自动的箭头旋转。

注意：如果没有指定 <code>fill</code> 和 <code>stroke</code> 的颜色，那么它们将采用 <code>line.stroke</code> 属性的颜色。

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

为了创建一个图形箭头，你需要为 <code>'xlink:href'</code> 提供一个链接到图片地址的 URL。然后指定 <code>width</code> 和 <code>height</code>。牢记，你的两个标记应该参考指向左侧的图片。为 <code>targetMarker</code> 提供的图片将会由 JointJS 自动旋转 180°。两个标记都会匹配连接 path 的斜率。如果需要箭头居于中心，记得在 Y 轴方向重新定位（-1/2 高度值）。

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

为了创建一个任意 SVG 类型的箭头，仅需要指定适当的 <code>'type'</code>，然后提供原生 SVG 属性去装饰它。记住 <code>'circle'</code> 和 <code>'ellipse'</code> SVG元素原点在他们的中心。如果你不想他们超过连接的终点，他们需要使用 <code>'cx'</code> 属性重新定位（设置的值同 'r'的值）
```js
link.attr({
    line: {
        sourceMarker: {
            'type': 'rect',
            'width': 50,
            'height': 10,
            'y': -5,
            'fill': 'rgba(255,0,0,0.3)',
            'stroke': 'black'
        },
        targetMarker: {
            'type': 'circle',
            'r': 10,
            'cx': 10,
            'fill': 'rgba(0,255,0,0.3)',
            'stroke': 'black'
        }
    }
});
```
## 连接的相对定位
连接上的多个特殊属性允许你相对于连接(link) 的连接路径定位子元素。
+ <code>connection</code> —— 如果设置为 true，子元素将跟随连接路径，仅适用于 path 子元素
+ <code>atConnectionLength</code> —— 设置路径起点的绝对距离，路径起点位于子元素的锚放置的位置。负距离是从连接路径的末端计算的。在要求长度下，依据连接斜率旋转子元素。
+ <code>atConnectionRatio</code> —— 设置路径起点的相对距离，路径起点位于子元素的锚放置的位置。接受 0 - 1 之间的数值。依据要求的斜率旋转子元素。

这些属性对于在连接路径上添加符号和箭头是非常完美的，而且可以令它们依据连接的斜率旋转，我们用一个自定义的连接类型来说明：
```js
var CustomLink = joint.dia.Link.define('examples.CustomLink', {
    attrs: {
        line: {
            connection: true,
            fill: 'none',
            stroke: 'orange',
            strokeWidth: 2,
            sourceMarker: {
                'type': 'circle',
                'r': 4,
                'fill': 'white',
                'stroke': 'orange',
                'stroke-width': '2'
            },
            targetMarker: {
                'type': 'circle',
                'r': 4,
                'fill': 'white',
                'stroke': 'orange',
                'stroke-width': '2'
            }
        },
        arrowhead: {
            d: 'M -20 -10 0 0 -20 10 Z',
            fill: 'orange',
            stroke: 'none'
        },
        symbol: {
            d: 'M -20 -20 20 20',
            stroke: 'black',
            targetMarker: {
                'type': 'path',
                'd': 'M 0 0 10 -5 10 5 Z',
                'fill': 'black',
                'stroke': 'none'
            }
        }
    }
}, {
    markup: [{
        tagName: 'path',
        selector: 'line'
    }, {
        tagName: 'path',
        selector: 'arrowhead'
    }, {
        tagName: 'path',
        selector: 'symbol'
    }]
});

var link = new CustomLink();
link.attr({
    symbol: {
        atConnectionRatio: 0.25
    },
    arrowhead: {
        atConnectionRatio: 0.75,
    }
});
```

## 连接的标签子元素
特殊属性也允许我们创建自定义的标记子元素 —— 包括那些依据连接路径调整旋转的和始终保持相同角度的。然而需要牢记，连接子元素比起连接标签更难动态设置及使用（JointJS 没有内置的 API 来实现这个），而且当使用这种方式时，有着非常重要的限制：
+ 它们无法使用 <code>ref</code> 属性。这意味着它们不能基于文本 bbox 的浏览器计算尺寸来自动调整它们的宽度和高度。由编程者提供一个合适的宽度值和高度值来适应标签文本。

出于上述原因，我们建议使用 <a>连接标签API</a>。

使用如下的两个特殊属性可以启用连接标签不保持连接梯度。

+ <code>atConnectionLengthIgnoreGradient</code> —— 设置子元素锚点放置位置距离路径起点的绝对距离。负值距离从连接末端计算。不依据路径斜率旋转子元素
+ <code>atConnectionRatioIgnoreGradient</code> —— 设置子元素锚点放置位置距离路径起点的相对距离。接受值为 0 - 1。 不依据路径斜率旋转子元素

（先前介绍的 <code>atConnectionLength</code> / <code>atConnectionRatio</code> 实际是别名，更详细的名字是：<code>atConnectionLengthKeepGradient</code> / <code>atConnectionRatioKeepGradient</code>。）在这两种情况下（无论是否保持连接斜率），可以通过巧妙地使用原生的 SVG 属性 <code>x</code> 和 <code>y</code> 实现连接标签的偏移。

我们用接下来的 demo 进行说明。以连接标签子元素定位的方式自定义一个连接类型。这样处理的目的是为了模仿连接标签定位与偏移示例中展示的功能。红色星号标记着连接路径上偏移元素的参考点。

```js
var CustomLink = joint.dia.Link.define('examples.CustomLink', {
    attrs: {
        line: {
            connection: true,
            fill: 'none',
            stroke: '#333333',
            strokeWidth: 2,
            strokeLinejoin: 'round',
            targetMarker: {
                'type': 'path',
                'd': 'M 10 -5 0 0 10 5 z'
            }
        },
        relativeLabel: {
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            fill: 'black',
            fontSize: 12
        },
        relativeLabelBody: {
            x: -15,
            y: -10,
            width: 30,
            height: 20,
            fill: 'white',
            stroke: 'black'
        },
        absoluteLabel: {
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            fill: 'black',
            fontSize: 12
        },
        absoluteLabelBody: {
            x: -15,
            y: -10,
            width: 30,
            height: 20,
            fill: 'white',
            stroke: 'black'
        },
        absoluteReverseLabel: {
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            fill: 'black',
            fontSize: 12
        },
        absoluteReverseLabelBody: {
            x: -15,
            y: -10,
            width: 30,
            height: 20,
            fill: 'white',
            stroke: 'black'
        },
        offsetLabelPositive: {
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            fill: 'black',
            fontSize: 12
        },
        offsetLabelPositiveBody: {
            width: 120,
            height: 20,
            fill: 'white',
            stroke: 'black'
        },
        offsetLabelNegative: {
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            fill: 'black',
            fontSize: 12
        },
        offsetLabelNegativeBody: {
            width: 120,
            height: 20,
            fill: 'white',
            stroke: 'black'
        },
        offsetLabelAbsolute: {
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            fill: 'black',
            fontSize: 12
        },
        offsetLabelAbsoluteBody: {
            width: 140,
            height: 20,
            fill: 'white',
            stroke: 'black'
        }
    }
}, {
    markup: [{
        tagName: 'path',
        selector: 'line'
    }, {
        tagName: 'rect',
        selector: 'relativeLabelBody'
    }, {
        tagName: 'text',
        selector: 'relativeLabel'
    }, {
        tagName: 'rect',
        selector: 'absoluteLabelBody'
    }, {
        tagName: 'text',
        selector: 'absoluteLabel'
    }, {
        tagName: 'rect',
        selector: 'absoluteReverseLabelBody'
    }, {
        tagName: 'text',
        selector: 'absoluteReverseLabel'
    }, {
        tagName: 'rect',
        selector: 'offsetLabelPositiveBody'
    }, {
        tagName: 'text',
        selector: 'offsetLabelPositive'
    }, {
        tagName: 'rect',
        selector: 'offsetLabelNegativeBody'
    }, {
        tagName: 'text',
        selector: 'offsetLabelNegative'
    }, {
        tagName: 'rect',
        selector: 'offsetLabelAbsoluteBody'
    }, {
        tagName: 'text',
        selector: 'offsetLabelAbsolute'
    }]
});

var link = new CustomLink();
link.attr({
    relativeLabel: {
        atConnectionRatio: 0.25,
        text: '0.25'
    },
    relativeLabelBody: {
        atConnectionRatio: 0.25
    },
    absoluteLabel: {
        atConnectionLength: 150,
        text: '150'
    },
    absoluteLabelBody: {
        atConnectionLength: 150
    },
    absoluteReverseLabel: {
        atConnectionLength: -100,
        text: '-100'
    },
    absoluteReverseLabelBody: {
        atConnectionLength: -100
    },
    offsetLabelPositive: {
        atConnectionRatio: 0.66,
        y: 40,
        text: 'keepGradient: 0,40'
    },
    offsetLabelPositiveBody: {
        atConnectionRatio: 0.66,
        x: -60, // 0 + -60
        y: 30 // 40 + -10
    },
    offsetLabelNegative: {
        atConnectionRatio: 0.66,
        y: -40,
        text: 'keepGradient: 0,-40'
    },
    offsetLabelNegativeBody: {
        atConnectionRatio: 0.66,
        x: -60, // 0 + -60
        y: -50 // -40 + -10
    },
    offsetLabelAbsolute: {
        atConnectionRatioIgnoreGradient: 0.66,
        x: -40,
        y: 80,
        text: 'ignoreGradient: -40,80'
    },
    offsetLabelAbsoluteBody: {
        atConnectionRatioIgnoreGradient: 0.66,
        x: -110, // -40 + -70
        y: 70 // 80 + -10
    }
});
```

进阶教程的下一部分，我们将学习如何利用 JointJS 事件支持用户的交互。
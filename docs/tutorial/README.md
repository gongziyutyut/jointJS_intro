# 关于 JointJS

JointJS 可以为你在所有现代浏览器中创建互动性的图表工具，而它仅仅依赖的是 JavaScript 和 SVG。它的 MVC 结构将图表、元素和连接的数据模型与它们的渲染相分隔，这使得 JointJS 可以很方便地插入后台应用中。JointJS 并不尝试重造一个被众多 web 开发广泛使用的技术框架。你可以在很多地方应用到你所学到的 JointJS。JointJS 使用了 Backbone、jQuery 以及 Lodash 等插件来构建自身。

JointJS 中的图表相当于图表模型（<code>joint.dia.Graph</code>）。图表模型中可以添加单元模型 —— 元素（<code>joint.dia.Element</code>的子类型）和连接（<code>joint.dia.Link</code>的子类型）。为了展示图表，我们需要将它放入一个纸张视图（<code>joint.dia.Paper</code>）。在 JointJS 中，你操纵的是数据模型而不是视图；图表模型为你提供数据，画布生成元素视图和连接视图。这个结构可以由下面的图表进行说明。

![Image from alias](~@image/intro/arch.png)

JointJS 提供了一个可视化的公共几何图形仓库，还有大量开箱即用的组件集合，这些组件来自于多个众所周知的图形语言（ERD —— 实体关系图，OrgChart —— 组织架构图， FSA —— 有限状态自动机，UML —— 标准建模语言图...）。JointJS 着眼于模块设计，这使得高级开发可以很容易地通过自定义插件去创建自己的图形并拓展内置功能。JointJS+ ，是对于 JointJS 的商业化拓展，它提供了许多预置插件。这些插件可以拓展装置的功能性、组件的互动性以及额外的图形。

接下来，我们学习如何利用 JointJS 创作大型的图表。我们一起来试一下
<a href="/tutorial/intro/start.html">hello world</a>

如果你早已熟悉了 JointJS 的基础用法，那么请跳转 <a href="/intermediate/">进阶</a>,在此部分你将学习到更复杂的概念。
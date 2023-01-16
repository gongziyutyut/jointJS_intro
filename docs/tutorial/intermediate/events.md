# 事件系统
<em>这是 JointJS 教程进阶部分的第二篇文章。返回 <a href="/tutorial/intermediate/special_attrs.html">特殊属性</a> </em>

JointJS 提供了多种方式满足用户的交互。在画布中，在单个的元素/连接视图上触发。

## 内置画布事件
在用户交互上，画布会自动触发数个内置事件。包括有鼠标摁下，双击和右键事件，以及连接或者元素高亮事件。可以在 <a>画布文档</a> 中找到全部列表。对于这些事件中任一事件的响应只是简单地在画布中添加监听器。这是组件所有实例上检测一种交互类型的最简单方式

例如，当在图表中的任一连接上双击时，事件 <code>'link:pointerdblclick'</code> 会被触发并检测到。对于 Element 匹配的事件(<code>'element:pointerdblclick'</code>), cells (<code>'cell:pointerdblclick'</code>)，画布空白区域（<code>'blank:pointerdblclick'</code>）也一一提供。无论 Element 还是 Link 被点击，cell 事件监听器都会释放事件信息
### ng-if跟ng-show/hide的区别有哪些？
1. ng-if在后面表达式为true的时候才会创建这个dom节点
2. ng-show是初始时就创建了，用display:block和display:none来控制显示和不显示
3. ng-if会(隐式地)产生新作用域，ng-switch、ng-include等会动态创建一块界面也是如此
4. 在ng-if中用基本变量绑定ng-model，并在外层div中把此model绑定给另一个显示区域
5. 内层改变时，外层不会同步改变，因为此时已经是两个变量了
6. ng-show不存在此问题，因为它不自带一级作用域
7. 避免这类问题出现的办法是，始终将页面中元素绑定到对象的属性(data.x)而不是直接绑定到基本变量(x)上

### ng-repeat迭代数组的时候，如果数组中有相同值，会有什么问题，如何解决？
1. 会提示`Duplicates in a repeater are not allowed.`加`track by $index`可以解决。
2. 也可以trace by任何一个普通的值，只要能唯一性标识数组中的每一项即可(建立dom喝数据之间的关联)

### ng-click中写的表达式，能使用JS原生对象上的方法吗？

### factory、service和provider是什么关系？

### angular的数据绑定采用什么机制？详述原理。

### 两个平级界面块a和b，如果a中触发一个事件，有哪些方式能让b知道？详述原理

### 一个angular应用应当如何良好的分层

### angular应用常用哪些路由库，各自的区别是什么？

### 如果通过angular的directive规划一套全组件化体系，可能遇到哪些挑战？

### 分属不同团队进行开发的angular应用，如果要做整合，会遇到哪些问题？如何解决？

### angular的缺点有哪些?

### 如何看待angular1.2中引入的Controller  as语法？

### 详述angular的"依赖注入"

### 如何看待angular2
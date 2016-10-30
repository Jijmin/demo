# jQuery源码解析
## 理解架构
### jQuery设计理念
1. jQuery的优点：简介的API、优雅的链式、强大的选择器与便捷的操作。
2. 为什么要做jQuery源码解析？
我们自己要实现一个动画，要考虑浏览器的兼容、各种属性的获取、逻辑流程、性能等等。
### jQuery整体架构
jQuery分为5大块：选择器、DOM操作、事件、AJAX与动画
13个模块：
1. 核心方法
2. 回调系统
3. 异步队列
4. 数据缓存
5. 队列操作
6. 选择器引
7. 属性操作
8. 节点遍历
9. 文档处理
10. 样式操作
11. 属性操作
12. 事件体系
13. AJAX交互
14. 动画引擎
### 立即调用表达式
任何库与框架设计的第一个要点就是解决命名空间与变量污染的问题。jQuery就是
利用了JavaScript函数作用域的特性，采用立即调用表达式包裹了自身的方法来解决这个问题。
jQuery的立即调用函数表达式的写法有三种：
```
(function(window, factory) {
    factory(window)
}(this, function() {
    return function() {
       //jQuery的调用
    }
}))
```
可以看出上面的代码中嵌套了2个函数，而且把一个函数作为参数传递到另一个函数中并且执行，这种方法有点复杂，我们简化一下写法
```
var factory = function(){
    return function(){
        //执行方法
    }
}
var jQuery = factory();
```
上面的代码效果和方法1是等同的，但是这个factory有点变成了简单的工厂方法模式，需要自己调用，不像是一个单例的jQuery类，所以我们需要改成“自执行”，而不是另外调用。
```
(function(window, undefined) {
    var jQuery = function() {}
    // ...
    window.jQuery = window.$ = jQuery;
})(window);
```
从上面的代码可看出，自动初始化这个函数，让其只构建一次。详细说一下这种写法的优势：
 1. window和undefined都是为了减少变量查找所经过的scope作用域。当window通过传递给闭包内部之后，在闭包内部使用它的时候，可以把它当成一个局部变量，显然比原先在window scope下查找的时候要快一些。
  2. undefined也是同样的道理，其实这个undefined并不是JavaScript数据类型的undefined，而是一个普普通通的变量名。只是因为没给它传递值，它的值就是undefined，undefined并不是JavaScript的保留字。
 ```
 Javascript 中的 undefined 并不是作为关键字，因此可以允许用户对其赋值。
 ```
 全局变量是魔鬼, 匿名函数可以有效的保证在页面上写入JavaScript，而不会造成全局变量的污染，通过小括号，让其加载的时候立即初始化，这样就形成了一个单例模式的效果从而只会执行一次。
### jQuery的类数组对象结构
#### 为什么是类数组对象呢？
很多人迷惑的jQuery为什么能像数组一样操作，通过对象get方法或者直接通过下标0索引就能转成DOM对象。
首先我们看jQuery的入口都是统一的$, 通过传递参数的不同，实现了9种方法的重载：
```
1. jQuery([selector,[context]])
2. jQuery(element)
3. jQuery(elementArray)
4. jQuery(object)
5. jQuery(jQuery object)
6. jQuery(html,[ownerDocument])
7. jQuery(html,[attributes])
8. jQuery()
9. jQuery(callback)
```
9种用法整体来说可以分三大块：选择器、dom的处理、dom加载。
换句话说jQuery就是为了获取DOM、操作DOM而存在的！所以为了更方便这些操作，让节点与实例对象通过一个桥梁给关联起来，jQuery内部就采用了一种叫“类数组对象”的方式作为存储结构，所以我们即可以像对象一样处理jQuery操作，也能像数组一样可以使用push、pop、shift、unshift、sort、each、map等类数组的方法操作jQuery对象了。
#### jQuery对象可用数组下标索引是什么原理？
通过$(".Class")构建的对象结构，整个结构很明了，通过对象键值对的关系保存着属性，原型保存着方法。
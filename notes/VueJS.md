# VueJS
## VueJS介绍
### 理解VueJS
1. 是一个JavaScriptMVVM库，它是以数据驱动和组件化的思想构建的。
2. 相比于AngularJS，VueJS提供了更加简洁、更易于理解的API
3. 因为VueJS是数据驱动的，不是很需要操作DOM
4. 通过一些特殊的HTML语法，将DOM和数据绑定起来。
5. 一旦你创建了绑定，DOM将和数据保持同步，每当变更了数据，DOM也会相应的更新。

### MVVM模式
- Model-View-ViewModel
- ViewModel是VueJS的核心，它是一个实例
- Vue实例是做作用于某个HTML元素上的

### 双向数据绑定
- DOM Listeners和Data Bindings是两个工具
- ViewModel中的DOM Listener工具会帮我们检测页面上DOM元素的变化
- 如果变化，则更改Model中的数据
- 当我们更新Model中的数据时，Data Bindings工具会帮我们更新页面中的DOM元素

### 使用Vue过程
1. 定义View
2. 定义Model
3. 创建一个Vue实例或"ViewModel"，它用于连接View和Model
4. 在创建Vue实例时，需要传入一个选项对象
5. 选项对象可以包括数据、挂载元素、方法、模生命周期钩子等
```
<body>
    <!-- 视图View -->
    <div id="app">
        {{massage}}
    </div>
</body>
<script src="vue.js"></script>
<script>
// 模型Model
var exampleData={
    massage:'Hello world!'
};
// 创建一个实例ViewModel
// 连接View和Model
new Vue({
    el:'#app',
    data:exampleData
});
</script>
```
6. 选项对象的el属性指向View，el:'#app'表示该Vue实例将挂载到`<div id="app">...</div>`这个元素
7. data属性指向Model，data:exampleData表示我们的Model是exampleData对象

### 双向数据绑定
```
<!--这是我们的View-->
<div id="app">
    <p>{{ message }}</p>
    <input type="text" v-model="message"/>
</div>
```
MVVM模式本身是实现了双向绑定的，在Vue.js中可以使用v-model指令在表单元素上创建双向数据绑定。

## VueJS常用指令
### v-if指令
- v-if是条件渲染指令，它根据表达式的真假来删除和插入元素
- 语法`v-if="expression"`
- expression是一个返回bool值的表达式，表达式可以是一个bool属性，也可以是一个返回bool的运算式
```
<div id="app">
    <h1>Hello VueJS!</h1>
    <h1 v-if="yes">Yes!</h1>
    <h1 v-if="no">No!</h1>
    <h1 v-if="age>=18">Age:{{age}}</h1>
    <h1 v-if="name.indexOf('zhou')>=0">Name:{{name}}</h1>
</div>
<script src="vue.js"></script>
<script>
var vm=new Vue({
    el:'#app',
    data:{
        yes:true,
        no:false,
        age:21,
        name:'zhouying'
    }
});
</script>
```
- v-if指令是根据条件表达式的值来执行元素的插入或者删除行为。
- age是定义在选项对象的data属性中的，为什么Vue实例可以直接访问它呢？
- 这是因为每个Vue实例都会代理其选项对象里的data属性

### v-show指令
v-show也是条件渲染指令，和v-if指令不同的是，使用v-show指令的元素始终会被渲染到HTML，它只是简单地为元素设置CSS的style属性。

### v-else指令
可以用v-else指令为v-if或v-show添加一个“else块”。v-else元素必须立即跟在v-if或v-show元素的后面——否则它不能被识别。

### v-for指令
v-for指令基于一个数组渲染一个列表`v-for="item in array"`

### v-bind指令
v-bind指令可以在其名称后面带一个参数，中间放一个冒号隔开，这个参数通常是HTML元素的特性（attribute），例如：v-bind:class
```
<div id="app">
    <ul class="pagination">
        <li v-for="n in pageCount">
            <a href="javascripit:void(0)" v-bind:class="activeNumber === n-1?'active':''">{{n}}</a>
        </li>
    </ul>
</div>
<script src="vue.js"></script>
<script>
    var vm=new Vue({
        el:'#app',
        data:{
            activeNumber:1,
            pageCount:10
        }
    });
</script>
```

### v-on指令
v-on指令用于给监听DOM事件，它的用语法和v-bind是类似的`<a v-on:click="doSomething">`有两种形式调用方法：绑定一个方法（让事件指向方法的引用），或者使用内联语句。
```
<div id="app">
        <p><input type="text" v-model='message'></p>
        <p>
            <!-- click事件直接绑定一个方法 -->
            <button v-on:click="greek"></button>
        </p>
        <p>
            <!--click事件使用内联语句-->
            <button v-on:click="say('Hi')">Hi</button>
        </p>
    </div>
    <script src="vue.js"></script>
    <script>
        var vm=new Vue({
            el:'#app',
            data:{
                message:'Hello world!'
            },
            methods:{
                greek:function(){
                    // 方法内 `this` 指向 vm
          alert(this.message)
                },
                say:function(msg){
                    alert(msg);
                }
            }
        });
    </script>
```

### v-bind和v-on的缩写
Vue.js为最常用的两个指令v-bind和v-on提供了缩写方式。v-bind指令可以缩写为一个冒号，v-on指令可以缩写为@符号。

### 综合实例
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>综合实例</title>
</head>
<body>
    <div id="app">
        <fieldset>
            <legend>Create New Person</legend>
            <div class="form-group">
                <label>Name:</label>
                <input type="text" v-model="newPerson.name" />
            </div>
            <div class="form-group">
                <label>Age:</label>
                <input type="text" v-model="newPerson.age" />
            </div>
            <div class="form-group">
                <label>Sex:</label>
                <select v-model="newPerson.sex">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div class="form-group">
                <label></label>
                <button @click="createPerson">Create</button>
            </div>
        </fieldset>
        <table>
            <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Sex</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='person in people'>
            <td>{{ person.name }}</td>
          <td>{{ person.age }}</td>
          <td>{{ person.sex }}</td>
          <td :class="text-center"><button @click="deletePerson($index)">Delete</button></td>
        </tr>
      </tbody>
        </table>
    </div>
    <script src="vue.js"></script>
    <script>
        var vm=new Vue({
            el:'#app',
            data:{
                newPerson: {
          name: '',
          age: 0,
          sex: 'Male'
        },
        people: [{
          name: 'Jack',
          age: 30,
          sex: 'Male'
        }, {
          name: 'Bill',
          age: 26,
          sex: 'Male'
        }, {
          name: 'Tracy',
          age: 22,
          sex: 'Female'
        }, {
          name: 'Chris',
          age: 36,
          sex: 'Male'
        }]
            },
            methods:{
                createPerson:function(){
                    this.people.push(this.newPerson);
                    //重置newPerson对象
                    this.newPerson={name: '', age: 0, sex: 'Male'};
                },
                deletePerson:function(index){
                    //删除数组元素
                    this.people.splice(index,1);
                }
            }
        });
    </script>
</body>
</html>
```

## 组件简介
### 组件的创建和注册
1. 调用Vue.extend()方法创建组件构造器
2. 调用Vue.component()方法注册组件
3. 在Vue实例的作用范围内使用组件
```
<div id="app">
        <my-component></my-component>
    </div>
    <script src="vue.js"></script>
    <script>
        //1. 创建一个组件构造器
        var myComponent=Vue.extend({
            template:'<div>This is my first component!</div>'
        });
        //2. 注册组件，并指定组件的标签，组件的HTML标签为<my-component>
        Vue.component('my-component',myComponent);
        new Vue({
            el:'#app'
        });
    </script>
```

### 全局注册和局部注册
调用Vue.component()注册组件时，组件的注册是全局的，这意味着该组件可以在任意Vue示例下使用。如果不需要全局注册，或者是让组件使用在其它组件内，可以用选项对象的components属性实现局部注册。
```
var myComponent=Vue.extend({
    template:'<div>This is my first component!</div>'
});
new Vue({
    el:'#app',
    components:{
        'my-component':myComponent
    }
});
```
由于my-component组件是注册在#app元素对应的Vue实例下的，所以它不能在其它Vue实例下使用。

### 父组件和子组件
```
var Child = Vue.extend({
    template: '<p>This is a child component!</p>'
})      
var Parent = Vue.extend({
    // 在Parent组件内使用<child-component>标签
    template :'<p>This is a Parent component<child-component></child-component></p>',
    components: {
        // 局部注册Child组件，该组件只能在Parent组件内使用
        'child-component': Child
    }
})
// 全局注册Parent组件
Vue.component('parent-component', Parent)
new Vue({
    el: '#app'
})
```

### 错误使用子组件
```
<div id="app">
    <parent-component>
        <child-component></child-component>
    </parent-component>
</div>
```
```
<div id="app">
    <parent-component>
    </parent-component>
    <child-component>
    </child-component>
</div>
```

### 组件注册语法糖
1. 使用Vue.component()直接创建和注册组件
```
// 全局注册，my-component1是标签名称
Vue.component('my-component1',{
    template: '<div>This is the first component!</div>'
})

var vm1 = new Vue({
    el: '#app1'
})
```
2. 在选项对象的components属性中实现局部注册
```
var vm2 = new Vue({
    el: '#app2',
    components: {
        // 局部注册，my-component2是标签名称
        'my-component2': {
            template: '<div>This is the second component!</div>'
        },
        // 局部注册，my-component3是标签名称
        'my-component3': {
            template: '<div>This is the third component!</div>'
        }
    }
})
```

### 使用script或template标签
在template选项中拼接HTML元素比较麻烦，这也导致了HTML和JavaScript的高耦合性。Vue.js提供了两种方式将定义在JavaScript中的HTML模板分离出来
1. 使用`<script>`标签
```
<body>
      <div id="app">
        <my-component></my-component>
      </div>
      <script type="text/x-template" id="myComponent">
        <div>This is a component!</div>
      </script>
    </body>
    <script src="vue.js"></script>
    <script>
        Vue.component('my-component',{
          template: '#myComponent'
        })
        new Vue({
          el: '#app'
        })
    </script>
```
2. 使用`<template>`标签
```
<body>
    <div id="app">
        <my-component></my-component>
    </div>
    <template id="myComponent">
        <div>This is a component!</div>
    </template>
</body>
<script src="js/vue.js"></script>
<script>
    Vue.component('my-component',{
        template: '#myComponent'
    })
    new Vue({
        el: '#app'
    })
</script>
```
使得HTML代码和JavaScript代码是分离的，便于阅读和维护。

### 组件的el和data选项
Vue.js规定：在定义组件的选项时，data和el选项必须使用函数。
```
Vue.component('my-component', {
    data: {
        a: 1
    }
})//报错
```
另外，如果data选项指向某个对象，这意味着所有的组件实例共用一个data。我们应当使用一个函数作为 data 选项，让这个函数返回一个新对象：
```
Vue.component('my-component', {
    data: function(){
        return {a : 1}
    }
})
```

## 使用props
组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 props 把数据传给子组件。

### props基础示例
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <my-component :my-name="name" :my-age="age"></my-component>
    </div>
    <template id="myComponent">
        <table>
      <tr>
        <th colspan="2">
          子组件数据
        </th>
      </tr>
      <tr>
        <td>name</td>
        <td>{{ myName }}</td>
      </tr>
      <tr>
        <td>age</td>
        <td>{{ myAge }}</td>
      </tr>
    </table>
    </template>
    <script src="vue.js"></script>
    <script>
    var vm = new Vue({
        el: '#app',
        data: {
          name: 'keepfool',
          age: 28
        },
        components: {
          'my-component': {
            template: '#myComponent',
            props: ['myName', 'myAge']
          }
        }
    })
    </script>
</body>
</html>
```
在父组件中使用子组件时，通过以下语法将数据传递给子组件
```
<child-component v-bind:子组件prop="父组件数据属性"></child-component>
```

### prop的绑定类型
1. 单向绑定
- 修改了子组件的数据，没有影响父组件的数据
- 修改了父组件的数据，同时影响了子组件
- prop默认是单向绑定：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意修改了父组件的状态
2. 双向绑定
- 可以使用.sync显式地指定双向绑定，这使得子组件的数据修改会回传给父组件
```
<my-component v-bind:my-name.sync="name" v-bind:my-age.sync="age"></my-component>
```
3. 单次绑定
- 可以使用.once显式地指定单次绑定，单次绑定在建立之后不会同步之后的变化，这意味着即使父组件修改了数据，也不会传导给子组件

### 示例
1. prop验证
父组件传递过来的data和columns必须是Array类型，filterKey必须是字符串类型。
2. filterBy过滤器
可以根据指定的字符串过滤数据


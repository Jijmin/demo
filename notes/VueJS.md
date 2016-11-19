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

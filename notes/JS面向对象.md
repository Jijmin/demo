# 面向对象
## 类与实例
### 什么是对象？
1. 一切事物皆对象，即所有的东西都是对象
2. 对象就是可以看到、感觉到、听到、触摸到等的东西，但必须是特指的东西
3. 就比如我们所看到的这个人，这个人就是一个对象
4. 他有姓名、年龄、职业、以及可以说话等等
5. 那么这个人就是一个对象，姓名、年龄、职业还有说话是的特性和行为
6. 在我们编程中，**对象是一个自包含的实体，用一组可识别的特性和行为来标识**。
7. 我们说听到的OOP是Object-Oriented Programming，是面向对象编程，其实就是针对对象来进行编程的意思。

### 什么是类？
1. 我们设想一下如果我们不止一个人，而是很多的人
2. 可以发现他们有很多相同点，都有姓名、年龄、职业、以及可以说话
3. 我们发现它们都是一类东西，就是人
4. 那么，我们不难发现**类就是具有相同的属性和功能的对象的抽象的集合**
5. 在后台语言像JAVA中我们常常会用Class关键字去声明
```
Class Person{
    String name;
    int age;
    String job;
    void sayName(){
        return name;
    }
}
/*
1. class是表示定义类的关键字
2. Dask就是类的名称
3. 类名称首字母记着要大写
4. 多个单词则各个首字母大写
5. 对外公开的方法需要用"public"修饰符
 */
```
6. 我们在JS中没有用Class关键字，但是也有类似的实现方式
7. 在JavaScript中我们使用构造函数来定义类，可以表示一类的东西
```
function Person(name,age,job){
    this.name=name;
    this.age=age;
    this.job=job;
    this.sayName=function(){
        alert(this.name);
    };
}
```

### 什么是实例?
1. 类就是具有相同的属性和功能的对象的抽象的集合
2. 我们要应用这个类，只需要将类实例化就可以了
3. **实例就是一个真实的对象**
4. 比如我们都是“人”，而你和我其实就是“人”类的实例
5. 而我们的**实例化就是创建对象的过程，使用new关键字来创建**
```
public static void main(String []args){
   Person p1 = new Person( "Tommy" );//将Person实例化
   //这其中做了两件事
   //1. 声明一个Person的对象，对象名为p1
   //2. 将此p1对象实例化
}
```
6. 在JS中我们同样也是用new来创建一个实例
```
var p1=new Person("Greg", 27, "Doctor");
```

## 创建对象
在JS中，我们可以通过Object构造函数或对象字面量都可以来创建单个对象，但是我们会发现这些方法有一个明显的缺点：使用了同一个接口创建了很多对象，会产生大量的重复代码。为了解决这个问题，人们就开始使用工厂模式的一种变体。

### 工厂模式
1. 工厂模式是软件工程领域一种广为人知的设计模式，这种模式抽象了创建具体对象的过程。
2. **工厂方式模式：定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类**
3. 比如说我们需要开发一个计算器，计算器有加、减、乘、除的功能，我们将这四个功能分别写成四个函数，这样的一个过程我们可以看做是简单工厂模式。
4. 就像这个计算器，让客户端不用管该用哪个类的实例，只需要将"+"给工厂，工厂就自动给出了相应的实例，客户端只要去做运算就行了，不同的实例会实现不同的运算。
5. 但是如果有很多我们这样的计算器，那么我们就需要将这四个功能抽象为四个工厂，让它们帮我们生产这种计算器，我们可以叫这种方式为工厂模式。
6. 简单工厂模式的最大优点在于工厂类中包含了必要的逻辑判断，根据客户端的选择条件动态实例化相关的类(方法)，对于客户端来说，去除了与具体产品的依赖。但是我们需要添加一个功能时，扩展开放，修改也开放，这样就违背了开放-封闭原则
7. 工厂方法模式实现时，客户端需要决定实例化哪一个工厂来实现运算类，选择判断的问题还是存在的，也就是说，工厂方法把简单工厂的内部逻辑判断移动到了客户端代码来进行。你想要加功能，本来在简单工厂中是改变工厂类，而现在是修改客户端！
8. 这样我们在生产计算机的时候，我们如果想要加入一个新的功能，比如说就平方根的功能时，我们就只需要新创建一个工厂出来，专门处理求平方根的这个功能，那么我们就只需要改动一处就能实现，保持了我们软件的开放-封闭原则。
9. 我们的ECMAScript中无法创建类，开发人员就发明了一种函数，用函数来封装以特定接口创建对象的细节。
```
function createPerson(name,age,job){
    var o new Object();
    o.name = name; 
    o.age = age; 
    o.job = job; 
    o.sayName = function(){ 
        alert(this.name); 
    }; 
    return o;
}
var person1 = createPerson("Nicholas", 29, "Software Engineer"); 
var person2 = createPerson("Greg", 27, "Doctor"); 
```
10. 我们创建一个函数createPerson()，这个函数有三个参数，姓名、年龄、职业，在这个函数内部我们定义了一个对象，这个对象具有属性和方法，最后将这个对象返回出去，也就是说这个函数能够根据接受的参数来构建一个包含有必要信息的Person对象。
11. 我们可以无数次的调用这个函数，每次都返回一个包含三个属性一个方法的对象。
12. 这就是我们的工厂模式，我们可以批量生产我们的Person对象
13. 工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）

### 构造函数模式
1. ECMAScript中的构造函数可用来创建特定类型的对象。
2. 像Object和Array这样的原生构造函数，在运行时会自动出现在执行环境中。
3. 此外，也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。
4. 使用这种将这些属性和方法抽取出来的这种方式，也就我是我们将很多对象抽象成类的过程
```
function Person(name, age, job){ 
    this.name = name; 
    this.age = age; 
    this.job = job; 
    this.sayName = function(){ 
        alert(this.name); 
    }; 
} 
var person1 = new Person("Nicholas", 29, "Software Engineer"); 
var person2 = new Person("Greg", 27, "Doctor"); 
```
5. 在这个例子中，Person()函数取代了createPerson()函数
6. 我们会发现和工厂模式还是有很多不一样的地方
7. 首先没有显示的创建对象
8. 直接将属性和方法赋值给了this对象
9. 没有return语句
10. 此外我们函数名Person使用的是大写字母P
11. 由此可见这种构造函数模式创建的对象借鉴了其他的OO语言
12. 要创建Person的新实例，必须要使用new操作符。以这种方式调用构造函数实际上会经历一下4个步骤
- 创建一个新对象
- 将构造函数的作用域赋给新对象(因此this指向了这个新对象)
- 执行构造函数中的代码(为这个新对象添加属性和方法)
- 返回新对象
13. 创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型；而这正是构造函数模式胜过工厂模式的地方。
14. 其实构造函数也是函数，没有通过new的调用就是普通函数
15. 构造函数模式虽然好用，但也是有缺点的
16. 使用构造函数，就是每个方法都要在每个实例上重新创建一遍，非常占用空间
17. 我们也能看的出来，创建两个完成同样任务的Function实例的确没有必要
18. 何况我们有this对象在，根本不用在执行代码前就把函数绑定到特定的对象上去
19. 因此我们可以通过把函数定义转移到构造函数外部来解决这个问题
```
function Person(name,age,job){
    this.name=name;
    this.age=age;
    this.job=job;
    this.sayName=sayName;
}
function sayName(){
    alert(this.name);
}
var person1 = new Person("Nicholas", 29, "Software Engineer"); 
var person2 = new Person("Greg", 27, "Doctor"); 
```
20. 在这段代码中，我们将sayName函数主体定义在构造函数外面，在构造函数中我们存储的是sayName的指针，我们每次创建实例的时候，调用的是同一个sayName对象。
21. 但是问题又出在，我们定义在全局的作用域中的函数实际上只能被某个对象调用，这让全局作用域有点名副其实。
22. 如果对象需要定义很多方法，那么就要定义很多的全局函数，于是我们这个自定义的引用类型就丝毫没有封装可言。

### 原型模式
1. 我们知道我们创建的每一个对象都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。
2. 使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。
3. 不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。
```
function Person(){}
Person.prototype.name="Nicholas";
Person.prototype.age=29;
Person.prototype.job="Software Engineer";
Person.prototype.sayName=function(){
    alert(this.name);
};
```
4. 我们新创建出来的实例共享属性和方法
5. __proto__存在于实例与构造函数原型对象之间，不是实例与构造函数之间
6. 减少不必要的输入，为了从视觉上更好的封装原型的功能，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象
```
function Person(){}
Person.prototype={
    constructor : Person, 
    name : "Nicholas", 
    age : 29, 
    job: "Software Engineer", 
    sayName : function () { 
        alert(this.name); 
    }
}
```
7. 如果先创建了实例然后再重写原型对象。然后调用sayName()会报错，新创建的实例指向的是原本的原型对象，但是我们重写原型对象，就切断了它与原来的原型对象的联系，就会查找不到。
8. 所有原生的引用类型，都是采用这种原型模式创建的
9. 原型模式也不是没有缺点。首先，它省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。然后，原型中所有属性是被很多实例共享的，这种共享对于包含引用类型值的属性来说，问题就比较突出了，实例改变直接影响到原型。这并不是我们所希望的。
10. 实例一般都是要有属于自己的全部属性的。

### 组合使用构造函数模式和原型模式
1. 构造函数里面存放属性
2. 在原型上添加共享方法
```
function Person(name, age, job){ 
    this.name = name; 
    this.age = age; 
    this.job = job; 
    this.friends = ["Shelby", "Court"]; 
} 
Person.prototype = { 
    constructor : Person, 
    sayName : function(){ 
        alert(this.name); 
    } 
} 
```

### 动态原型模式
1. 考虑到其他OO语言经验开发人员在看到独立的构造函数和原型时的困惑
2. 就有了动态原型模式
3. 把所有信息都封装在了构造函数中，而通过在构造函数中初始化原型，又保持了同时使用构造函数和原型的优点
```
function Person(name,age,job){
    this.name=name;
    this.age=age;
    this.job=job;
    if(typeof this.sayName!='function'){
        Person.prototype.sayName = function(){ 
            alert(this.name); 
        }; 
    }
}
```
4. 这里只在sayName()方法不存在的情况下，才会将它添加到原型中
5. 这段代码只会在初次调用构造函数时才会执行
6. 此后，原型已经完成初始化，不需要再做什么修改了

### 寄生构造函数模式
```
function Person(name, age, job){ 
    var o = new Object(); 
    o.name = name; 
    o.age = age; 
    o.job = job; 
    o.sayName = function(){ 
        alert(this.name); 
    }; 
    return o; 
} 
var friend = new Person("Nicholas", 29, "Software Engineer"); 
friend.sayName(); //"Nicholas
```
1. 使用new操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的
2. 构造函数在不返回值的情况下，默认会返回新对象实例。
3. 而通过在构造函数的末尾添加一个return语句，可以重写调用构造函数时返回的值。
4. 返回的对象与构造函数或者与构造函数的原型属性之间没有关系，也就是说，构造函数返回的对象与在构造函数外部创建的对象没有什么不同

### 稳妥构造函数模式
1. 所谓稳妥对象，指的是没有公共属性，而且其方法也不引用this的对象。
2. 稳妥对象最适合在一些安全的环境中（这些环境中会禁止使用this和new），或者在防止数据被其他应用程序（如Mashup程序）改动时使用。
```
function Person(name,age,job){
    var o = new Object(); 
    o.sayName = function(){ 
        alert(name); 
    };
    return o;
}
```

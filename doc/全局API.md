### Vue.extend
`路径：src/core/global-api/extend.js`
作用：创建一个Vue的子类, Vue.extend接收一个包含组件选项的对象。
```
通过Vue.extend的实现，可以理解JavaScript `子类继承父类`跟`以一个对象为原型创建一个新对象`两者的本质区别。
前者是Child.prototype = Object.create(Parent.prototype) Child.prototype.constructor = Child
后者是child = Object.create(parent)。

前者 const childInstance = new Child()时候，childInstance上找不到的方法会到child.__proto__即Child.prototype，找不到则再进一步Child.prototype.__proto__也就是Parent.prototype上查找
后者 child上找不到的方法会到child.__proto__ 也就是parent上查找

此外就是注意constructor的值
```

### Vue.nextTick
`路径：src/core/global-api/index.js`
作用：主要关注点是DOM更新。此方法调用时传入的第一参数的回调函数会在下一次DOM更新循环结束之后执行。
```
原因在于：此方式将传入的回调函数参数丢入一个同步队列，且以异步形式开启该队列的执行。而数据触发watcher更新是同步的。包括了数据所收集到的渲染watcher。
```

### Vue.set
`路径：src/core/global-api/index.js`
作用：向一个已经具备响应式的对象添加一个property, 并且能够确保这个新添加的property同样是响应式的。
```
更完整的表述应当如下：
1.当你往一个响应式对象通过Obj.key = value设置属性时，你并不会触发到Obj对象的set，从而无法触发对应Dep.notify方法，这会导致Obj依赖的Watcher无法及时更新。这是缺陷一。
2.另一个缺陷则是新增的Obj.key本身又无法像初始声明时的其他属性一样具有响应式，因此也需要让这个新增属性key同样具备响应式。
```

### Vue.delete
`路径：src/core/global-api/index.js`
作用：删除一个已经具备响应式的对象的某个property, 并触发该对象的响应式更新。
```
因为Vue2的响应式是指，当你触发某个响应式对象的set方法，才会触发对应的Dep.notify方法进而进行响应式更新。
然而简单的delete Obj.key 无法触发 obj, obj.key的set方法。
```

### Vue.directive
待更新  

### Vue.filter
待更新  

### Vue.component
待更新  

### Vue.use
`路径1：src/core/global-api/index.js`
`路径2：src/core/global-api/use.js`
作用：安装Vue.js插件。
```
如果该插件提供install方法的实现，那么就调用该插件的install方法，并将install方法的this设置为插件本身。如果该插件没有提供install方法，但却是函数类型，会调用插件函数本身，this设置为null。
此外在调用install方法或插件函数时，首个入参为Vue, 其余参数为调用Vue.use(plugin, ...args)的args。
此处之所以强调插件而非Vue.use实现本身，是因为考虑到我们对于Vue插件(vuex, vue-router...)在Vue项目的使用, 以及这些插件各自的接入实现源码。

至于Vue.use的实现，它接受的首个入参plugin, 在调用plugin.apply()时又传入Vue作为函数首个入参。
Vue.use接收到plugin, plugin又能接收到Vue。
既是生产者，又是消费者。非常灵活。
```

### Vue.mixin
`路径1：src/core/global-api/index.js`
`路径2：src/core/global-api/mixin.js`
作用：全局注册一个mixin(文档翻译成混入,更好的说法应该是组件选项对象,这里为了不添加理解难度，统一用mixin), 全局注册意味着影响所有的Vue实例。慎用！
```
其实就是将Vue.options与mixin进行了对应的optionMergeStrategies合并。生成新的Vue.options。 如果是data,采用data的合并策略,生命周期hook采用生命周期hook合并策略，诸如此类。

又因为new一个Vue实例，会对new Vue(option)的 option与Vue.options进行同样的策略合并。
从而影响了所有的Vue实例。
```

### Vue.compile
`路径：src/platforms/web/entry-runtime-with-compiler.js`
作用：将一个模板字符串编译成render函数。只在 **完整版**, 也就是既包括运行时（runtime)也包括模板编译（compiler）的版本有效。
```
在学习Vue源码的过程中，不要担心不懂AST，不懂virtualDOM就无法深入Vue2, Vue2源码已经很贴心的进行了runtime与compiler的分离了。从我个人的经验而言，Vue自带的状态体系-state，包括插件-vuex是完全可以脱离compiler进行学习的。

此外,如果查看该方法的实现，会发现其中的调用函数是一层套一层，但是是完全可以分离成连个独立模块去理解：
1. template -> ast -> code优化 -> render函数生成。(`具体查看baseCompile函数实现`)。
2. 关于上述步骤的前置工作：比如采用什么样的策略生成AST，采用什么样的优化策略。最终要生成什么样的编译结果。以及上述过程中如果出现了错误，如何中断编译并给出合理的提示信息。(`具体查看parse, optimize, generate，createCompilerCreator函数实现`)。
```

### Vue.observable
`路径：src/core/global-api/index.js`
作用：让一个对象具备Vue的响应式。
```
中文官网说法：让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。
英文官网说法：Make an object reactive. Internally, Vue uses this on the object returned by the data function.

什么叫**data function**？ 脱离整体单独讲无意义。那么从Vue如何做到响应式出发，就是对某个对象的每个属性重写**get**, **set**, 触发get时, 收集watcher, 触发**set**时,其依赖的所有watcher进行更新。
此处仅仅对传入的对象实现了上述响应式功能，然后并没有将这个对象没有绑定到某个具体的Vue实例或Vue构造函数上，仅此而已。因此，你可以调用const state = Vue.observable(object), 实现一个简单的响应式存储，至于Vuex相比之下更复杂处是getters实现，也就是多了些computed watcher。以及modules模块化管理。至于commits,actions。你可以理解为在触发对象属性的set前后添加了若干拦截器。这一步是可以简单脱离数据响应式单独实现的（通过函数调用顺序）。
```

### Vue.version
`路径：src/core/index.js`
作用：当前使用Vue版本号。
```
个人没有仔细研究过Vue的构建过程。翻阅网上其他人的说法，以及提供一个简单的做法就是在构建过程中，读取目录下package.json的version字段，替换项目代码中的'__VERSION__'字符串即可。
```



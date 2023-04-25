1. prop 类型约束时, BigInt没有在文档中记录，但可使用, 比如
```
props: {'maxLength': {
  type: BigInt,
  default: 16n
  }
}, 
```

2. 在watch深层属性时，如果没有确切地获取指定属性，而是粗略地获取相对应的对象，返回[object object]
比如 (.ewVal.xxx, oldVal.xxx) 两者会相同的原因是因为此时如果再去获取指定属性，是通过get方法获取)，
因此，如果想要在watch根据newVal, oldVal进行判断，尽量监听到确切属性。比如监听'person.name','color.detail.sale'
  
3. compiler的类型约束相比于Vue2.7 进行了更一步的类型收窄
  
4. compiler isPreTag类型错误
  
5. types/component.ts //private _base 应该是 GlobalAPI类型
  
6. Vue.extend的声明个人觉得有点问题，因为返回结果应该为Vue的子类，只有调用了_init之后（new后）才会是Component类型，此处调用Vue.extend的返回值应该是 ChildGloablAPI extends GlobalAPI {super: GlobalAPI, ...}
  
7. 在模板中对组件使用v-on时（不使用.native修饰符），会同时注册相对应的event，此后在$listeners可以使用，同时也可以使用$emit去触发。因此在使用click, focus这类原生事件时需要注意，如果采用的是$listeners的传法，就尽量避免在子组件中其他地方再采用$emit('click'/'focus')。像官方文档中，就有通过object.assign覆盖$listeners的input的做法。个人感觉这样做并不好，建议如下：1.只采用$listeners，并且如果涉及事件对象，就直接在具体方法里使用$event.target.value,函数形参为$event。 2.只采用$emit('event-name', $event.target.value), 具体方法里使用value， 函数形参为value。

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
  
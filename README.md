# mini-vue2.6.14-browser-ts
个人学习Vue2源码使用
Vue2.6.14 TS版本（仅供参考，更准确，完整ts版本可以参照官方库v.2.7.14的ts实现）

个人理解Vue划分为以下几大模块

1. 数据响应式
2. 模板编译及指令实现
3. vdom
4. 组件，插件实现


**详细进度** 
该仓库已实现的源码部分参照下列√部分,对应vue2官方文档API  
  
### 全局配置
Vue.config √  
  
### 全局API
Vue.nextTick √  
Vue.use √  
Vue.version √  
  
### 选项/数据
data √  
props √  
propsData √  
computed √  
methods √  
watch √  
  
### 选项/DOM
el √  
template √  
render √  
  
### 选项/生命周期钩子 
beforeCreate √  
created √  
beforeMount √  
errorCaptured √  
   
### 选项/资源
  
### 选项/组合
  
### 选项/其他
name √  
  
### 实例Property
vm.\$data √  
vm.\$props √  
vm.\$el √  
vm.\$options √  
vm.\$parent √  
vm.\$root √  
vm.\$children  
  
### 实例方法/数据
vm.\$watch √  
vm.\$set √  
vm.\$delete √  
  
### 实例方法/事件
  
### 实例方法/生命周期
vm.\$nextTick √  
  
### 指令
  
### 特殊attribute
  
### 内置的组件
  
### VNode接口
  
### 服务端渲染
  
import VNode from '../core/vdom/vnode'
import { Component } from '@/types/component'
import { GlobalAPI } from './global-api'
export type ComponentOptions = {
  [key: string]: any

  // data
  data: Object | Function | void
  props?:
    | string[]
    | Record<string, Function | Array<Function> | null | PropOptions>
  propsData?: object
  computed?: {
    [key: string]:
      | Function
      | { get?: Function; set?: Function; cache?: boolean }
  }
  methods?: { [key: string]: Function }
  watch?: { [key: string]: Function | string }

  // DOM
  el?: string | Element
  template?: string
  render: (h: () => VNode) => VNode
  renderError?: (h: () => VNode, err: Error) => VNode
  staticRenderFns?: Array<() => VNode>

  // lifecycle
  beforeCreate?: Function
  created?: Function
  beforeMount?: Function
  mounted?: Function
  beforeUpdate?: Function
  updated?: Function
  activated?: Function
  deactivated?: Function
  beforeDestroy?: Function
  destroyed?: Function
  errorCaptured?: () => boolean | void

  // assets
  directives?: { [key: string]: object }
  components?: { [key: string]: Component }
  filters?: { [key: string]: Function }

  // context
  provide?:
    | { [key: string | symbol]: any }
    | (() => { [key: string | symbol]: any })

  // misc
  parent?: Component
  mixins?: Array<object>
  name?: string
  extends?: Component | object
  comments?: boolean

  // private
  _base: GlobalAPI
  _isComponent?: true
  _parentVnode?: VNode
  _parentListeners?: Object
  _renderChildren?: Array<VNode>
  _componentTag?: string
  _propKeys?: Array<string>
}

export type PropOptions = {
  type?: Function | Array<Function> | null
  default?: any
  required?: boolean | null
  validator?: Function | null
}

export type InternalComponentOptions = {
  _isComponent: true
  parent: Component
  _parentVnode: VNode
  render?: Function
  staticRenderFns?: Array<Function>
}

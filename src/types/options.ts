import VNode from '../core/vdom/vnode'
export type ComponentOptions = {
  [key: string]: any
  // misc
  name?: string
  // data
  data: Object | Function | void
  props?:
    | string[]
    | Record<string, Function | Array<Function> | null | PropOptions>
  computed?: {
    [key: string]:
      | Function
      | { get?: Function; set?: Function; cache?: boolean }
  }
  methods?: { [key: string]: Function }
  watch?: { [key: string]: Function | string }

  // private
  _componentTag: string | null
  _propKeys?: Array<string>

  // DOM
  el?: string | Element
  template?: string
  render: (h: () => VNode) => VNode
}

export type PropOptions = {
  type?: Function | Array<Function> | null
  default?: any
  required?: boolean | null
  validator?: Function | null
}

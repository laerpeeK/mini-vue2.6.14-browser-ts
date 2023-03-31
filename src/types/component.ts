import type { ComponentOptions } from './options'
import type Watcher from '@/core/observer/watcher'
import type VNode from '../core/vdom/vnode'
import { VNodeChildren, VNodeData } from './vnode'
import { GlobalAPI } from './global-api'
export declare class Component {
  constructor(options?: any)
  // constructor infomation
  static cid: number
  static options: Record<string, any>

  // extend
  static extend: GlobalAPI['extend']
  static superOptions: Record<string, any>
  static extendOptions: Record<string, any>
  static sealedOptions: Record<string, any>
  static super: typeof Component

  // assets
  static directive: GlobalAPI['directive']
  static component: GlobalAPI['component']
  static filter: GlobalAPI['filter']

  // functional context constructor
  static mixin: GlobalAPI['mixin']
  static use: GlobalAPI['use']

  // public properties
  $el: any // so that we can attach __vue__ to it
  $data: Record<string, any>
  $props: Record<string, any>
  $options: ComponentOptions
  $slots: { [key: string]: Array<VNode> }
  $scopedSlots: { [key: string]: () => VNodeChildren }

  // private properties
  _isVue: true
  _uid: number | string
  _renderProxy: Component
  _self: Component
  _watcher: Watcher | null
  _inactive: boolean | null
  _directInactive: boolean
  _isMounted: boolean
  _isDestroyed: boolean
  _isBeingDestroyed: boolean
  _hasHookEvent: boolean
  _data: Record<string, any>
  _props: Record<string, any>
  _computedWatchers: { [key: string]: Watcher }
  _watchers: Array<Watcher>
  _name: string // this only exists in dev mode
  _vnode?: VNode | null // self root node
  _staticTrees?: Array<VNode> | null // v-once cached trees
  __patch__: (
    a: Element | VNode | void | null,
    b: VNode | null,
    hydrating?: boolean,
    removeOnly?: boolean,
    parentElm?: any,
    refElm?: any
  ) => any
  _events: Object

  $root: Component
  $parent: Component | undefined
  $children: Array<Component>
  $refs: {
    [key: string]: Component | Element | Array<Component | Element> | undefined
  }
  $watch: (
    expOrFn: string | (() => any),
    cb: Function,
    options?: Record<string, any>
  ) => Function
  $vnode: VNode // the placeholder node for the component in parent's render tree

  // public methods
  $mount: (
    el: Element | string,
    hydrating?: boolean
  ) => Component & { [key: string]: any }
  $set: <T>(
    target: Record<string, any> | Array<T>,
    key: string | number,
    val: T
  ) => T
  $delete: <T>(
    target: Record<string, any> | Array<T>,
    key: string | number
  ) => void
  $createElement: (
    tag?: string | Component,
    data?: Record<string, any>,
    children?: VNodeChildren
  ) => VNode
  $nextTick: (fn: (...args: any[]) => any) => void | Promise<any>
  $forceUpdate: () => void
  $on: (event: string | Array<string>, fn: Function) => Component
  $once: (event: string, fn: Function) => Component
  $off: (event?: string | Array<string>, fn?: Function) => Component
  $emit: (event: string, ...args: Array<any>) => Component

  // lifecycle
  _init: Function
  _update: (vnode: VNode, hydrating?: boolean) => void

  // rendering
  _render: () => VNode

  // _c is internal that accepts `normalizationType` optimization hint
  _c: (
    vnode?: VNode,
    data?: VNodeData,
    children?: VNodeChildren,
    normalizationType?: number
  ) => VNode | void
}

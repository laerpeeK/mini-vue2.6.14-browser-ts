import VNode from '@/core/vdom/vnode'
import { Component } from '@/types/component'

export type VNodeChildren =
  | Array<null | VNode | string | number | VNodeChildren>
  | string

export interface VNodeData {
  key?: string | number
  slot?: string
  tag?: string
  attrs?: {[key: string]: any}
  staticClass?: string
  class?: any
  staticStyle?: {[key: string]: any}
  style?: string | Array<Object> | Object
  normalizedStyle?: Object
  [key: string]: any
}

export type VNodeComponentOptions = {
  Ctor: typeof Component
  propsData?: Object
  listeners?: Record<string, Function | Function[]>
  children?: Array<VNode>
  tag?: string
}

export type VNodeWithData = VNode & {
  tag: string
  data: VNodeData
  children?: Array<VNode>
  text: void
  elm: any
  ns: string | void
  context: Component
  key: string | number | undefined
  parent?: VNodeWithData
  componentOptions?: VNodeComponentOptions
  componentInstance?: Component
  isRootInsert: boolean
}

export type MountedComponentVNode = {
  context: Component
  componentOptions: VNodeComponentOptions
  componentInstance: Component
  parent: VNode
  data: VNodeData
}
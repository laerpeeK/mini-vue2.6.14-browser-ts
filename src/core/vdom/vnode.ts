import { Component } from '@/types/component'
import type { VNodeData } from '@/types/vnode'
export default class VNode {
  tag?: string
  data?: VNodeData
  children?: Array<VNode> | null
  text?: string
  isComment: boolean
  ns?: string
  elm: Node | void
  context: Component | void // rendered in this component's scope

  constructor(
    tag?: string,
    data?: VNodeData,
    children?: Array<VNode> | null,
    text?: string,
    elm?: Node,
    context?: Component
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.isComment = false
    this.text = text
    this.elm = elm
    this.context = context
    this.ns = undefined
  }
}

export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}

export function createTextVNode(val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}

import VNode from '@/core/vdom/vnode'

export type VNodeChildren =
  | Array<null | VNode | string | number | VNodeChildren>
  | string

export interface VNodeData {
  key?: string | number
  [key: string]: any
}
import { createTextVNode } from '@/core/vdom/vnode'
import { toString } from '@/shared/util'
export function installRenderHelpers(target: any) {
  target._v = createTextVNode
  target._s = toString
}

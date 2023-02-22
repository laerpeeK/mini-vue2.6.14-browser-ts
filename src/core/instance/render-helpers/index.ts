import { createTextVNode } from '@/core/vdom/vnode'

export function installRenderHelpers(target: any) {
  target._v = createTextVNode
}

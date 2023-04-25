import { createEmptyVNode, createTextVNode } from '@/core/vdom/vnode'
import { toString } from '@/shared/util'
import { bindDynamicKeys } from './bind-dynamic-keys'
import { bindObjectProps } from './bind-object-props'
export function installRenderHelpers(target: any) {
  target._v = createTextVNode
  target._s = toString
  target._b = bindObjectProps
  target._e = createEmptyVNode
  target._d = bindDynamicKeys
}

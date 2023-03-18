import { isDef } from '@/shared/util'
import { VNodeWithData } from '@/types/vnode'

export default {
  create(_: any, vnode: VNodeWithData) {
    registerRef(vnode)
  },
  update(oldVnode: VNodeWithData, vnode: VNodeWithData) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      debugger
    }
  },
  destroy(vnode: VNodeWithData) {
    registerRef(vnode, true)
  }
}

export function registerRef(vnode: VNodeWithData, isRemoval?: boolean) {
  const key = vnode.data.ref
  if (!isDef(key)) return
  
  debugger
}

import { inBrowser } from '@/core/util/env'
import VNode from '@/core/vdom/vnode'
import { isDef } from '@/shared/util'
import { VNodeWithData } from '@/types/vnode'

export function enter(vnode: VNodeWithData, toggleDisplay?: () => void) {
  const el: any = vnode.elm

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true
    el._leaveCb()
  }

  return
}

function _enter(_: any, vnode: VNodeWithData) {
  if (vnode.data.show !== true) {
    enter(vnode)
  }
}

export function leave(vnode: VNodeWithData, rm: Function) {
  rm()
}

export default inBrowser ? {
  create: _enter,
  activate: _enter,
  remove (vnode: VNodeWithData, rm: Function) {
    if (vnode.data.show !== true) {
      leave(vnode, rm)
    } else {
      rm()
    }
  }
} : {}
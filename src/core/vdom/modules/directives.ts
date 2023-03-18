import { VNodeWithData } from '@/types/vnode'
import { emptyNode } from '@/core/vdom/patch'

export default {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode: VNodeWithData) {
    updateDirectives(vnode, emptyNode)
  },
}

function updateDirectives(oldVnode: VNodeWithData, vnode: VNodeWithData) {
  if (oldVnode.data.directives || vnode.data.directives) {
    debugger
  }
}

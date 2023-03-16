import { VNodeWithData } from '@/types/vnode'
import { isUndef } from '@/shared/util'
function updateStyle(oldVnode: VNodeWithData, vnode: VNodeWithData) {
  const data = vnode.data
  const oldData = oldVnode.data
  if (
    isUndef(data.staticStyle) &&
    isUndef(data.style) &&
    isUndef(oldData.staticStyle) &&
    isUndef(oldData.style)
  ) {
    return
  }
}

export default {
  create: updateStyle,
  update: updateStyle,
}

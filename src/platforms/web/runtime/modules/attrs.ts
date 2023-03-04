import { isEdge, isIE, isIE9 } from '@/core/util/env'
import VNode from '@/core/vdom/vnode'

import { extend, isDef, isUndef, isTrue } from '@/shared/util'
import { VNodeWithData } from '@/types/vnode'
import {
  isBooleanAttr,
  isFalsyAttrValue,
  isEnumeratedAttr,
  convertEnumeratedValue,
  isXlink,
  xlinkNS,
  getXlinkProp,
} from '../../util/attrs'

function updateAttrs(oldVnode: VNodeWithData, vnode: VNodeWithData) {
  const opts = vnode.componentOptions
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  let key, cur, old
  const elm = vnode.elm
  const oldAttrs = oldVnode.data.attrs || {}
  let attrs: any = vnode.data.attrs || {}
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__) || isTrue(attrs._v_attr_proxy)) {
    attrs = vnode.data.attrs = extend({}, attrs)
  }

  for (key in attrs) {
    cur = attrs[key]
    old = oldAttrs[key]
    if (old !== cur) {
      setAttr(elm, key, cur, vnode.data.pre)
    }
  }
}

function setAttr(el: Element, key: string, value: any, isInPre?: any) {
  if (isInPre || el.tagName.indexOf('-') > -1) {
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key)
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key == 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key
      el.setAttribute(key, value)
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value))
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(value))
    } else {
      el.setAttributeNS(xlinkNS, key, value)
    }
  } else {
    baseSetAttr(el, key, value)
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key)
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    if (
      isIE &&
      !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' &&
      value !== '' &&
      !el.__ieph
    ) {
      const blocker = e => {
        e.stopImmediatePropagation()
        el.removeEventListener('input', blocker)
      }
      el.addEventListener('input', blocker)
      el._ieph = true /*IE placeholder patched */
    }
    el.setAttribute(key, value)
  }
}

export default {
  create: updateAttrs,
  update: updateAttrs,
}

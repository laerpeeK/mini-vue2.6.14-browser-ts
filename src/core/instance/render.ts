import { emptyObject } from '@/shared/util'
import { Component } from '@/types/component'
import { defineReactive } from '../observer'
import { warn } from '../util/debug'
import { handleError } from '../util/error'
import { nextTick } from '../util/next-tick'
import { createElement } from '../vdom/create-Element'
import VNode from '../vdom/vnode'
import { createEmptyVNode } from '../vdom/vnode'
import { isUpdatingChildComponent } from './lifecycle'
import { installRenderHelpers } from './render-helpers'

export let currentRenderingInstance: Component | null = null

export function initRender(vm: Component) {
  vm._vnode = null // the root of the child tree
  vm._staticTrees = null // v-once cached trees
  const options = vm.$options
  const parentVNode = (vm.$vnode = options._parentVNode) // the placeholder node in parent node
  const renderContext = parentVNode && parentVNode.context
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false) as VNode
  // @ts-expect-error
  vm.$createElement = (a, b, c, d) =>
    createElement(vm, a, b, c, d, true) as VNode

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  const parentData = parentVNode && parentVNode.data

  if (process.env.NODE_ENV !== 'production') {
    defineReactive(
      vm,
      '$attrs',
      (parentData && parentData.attrs) || emptyObject,
      () => {
        !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
      },
      true
    )
    defineReactive(
      vm,
      '$listeners',
      options._parentListeners || emptyObject,
      () => {
        !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
      },
      true
    )
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
  }
}

export function renderMixin(Vue: typeof Component) {
  // install runtime convenvience helpers
  installRenderHelpers(Vue.prototype)

  Vue.prototype.$nextTick = function (fn: (...args: any[]) => any) {
    return nextTick(fn, this)
  }

  Vue.prototype._render = function (): VNode {
    debugger
    const vm: Component = this
    const { render, _parentVNode } = vm.$options
    if (_parentVNode) {
      debugger
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVNode
    let vnode
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e: any) {
      handleError(e, vm, 'render')
    }

    return vnode
  }
}

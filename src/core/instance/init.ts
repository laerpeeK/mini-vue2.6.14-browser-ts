import type { Component } from '@/types/component'
import config from '@/core/config'
import { mark } from '../util/perf'
import { mergeOptions } from '../util/options'
import { initProxy } from './proxy'
import { initLifecycle, callHook } from './lifecycle';
import { initState } from './state'

let uid = 0

export function initMixin(Vue: typeof Component) {
  Vue.prototype._init = function (options?: Record<string, any>) {
    const vm: Component = this

    // a uid
    vm._uid = uid++

    let startTag
    // endTag
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      // endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to mark this as a Vue instance without having to do instanceof
    // check
    vm._isVue = true
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor as any) || {},
        options || {},
        vm
      )
    }

    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }

    vm._self = vm
    initLifecycle(vm)
    // initEvents(vm)
    // initRender(vm)
    callHook(vm, 'beforeCreate')
    // initInjections(vm) // resolve injections before data/props
    initState(vm)
    debugger
  }
}

export function resolveConstructorOptions(Ctor: typeof Component) {
  let options = Ctor.options
  if (Ctor.super) {
    // waitResolve
  }
  return options
}
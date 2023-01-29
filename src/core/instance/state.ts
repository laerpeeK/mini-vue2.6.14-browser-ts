import { Component } from '@/types/component'
import { bind, noop, hasOwn } from '@/shared/util'
import { warn } from '@/core/util/debug'
import { isReserved } from '../util/lang'

export function initState(vm: Component) {
  const opts = vm.$options
  if (opts.props) {
    initProps(vm, opts.props)
  }

  if (opts.methods) {
    initMethods(vm, opts.methods)
  }

  if (opts.data) {
    initData(vm)
  }
}

function initProps(vm: Component, propsOptions: Object) {}

function initMethods(vm: Component, methods: Object) {
  const props = vm.$options.props
  for (const key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn(
          `Method "${key}" has type "${typeof methods[
            key
          ]}" in the component definition. ` +
            `Did you reference the function correctly?`,
          vm
        )
      }

      if (props && hasOwn(props, key)) {
        warn(`Method "${key}" has already been defined as a prop.`, vm)
      }

      if (key in vm && isReserved(key)) {
        warn(
          `Method "${key}" conflicts with an existing Vue instance method. ` +
            `Avoid defining component methods that start with _ or $.`
        )
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}

function initData(vm: Component) {
}
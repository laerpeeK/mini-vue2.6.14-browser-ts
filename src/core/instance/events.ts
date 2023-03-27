import { Component } from '@/types/component'

export function initEvents(vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
}

export function eventsMixin(Vue: typeof Component) {
  const hookRE = /^hook:/
}

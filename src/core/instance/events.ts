import { Component } from '@/types/component'

export function initEvents(vm: Component) {
  vm._hasHookEvent = false
}

export function eventsMixin(Vue: typeof Component) {
  const hookRE = /^hook:/
}

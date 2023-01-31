import Vue from '@/core'
import type { Component } from '@/types/component'
import { inBrowser } from '@/core/util/env'
import { query } from '../util'
import { mountComponent } from '@/core/instance/lifecycle'

// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

export default Vue

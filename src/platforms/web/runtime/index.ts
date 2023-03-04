import Vue from '@/core'
import type { Component } from '@/types/component'
import { inBrowser } from '@/core/util/env'
import { query } from '../util'
import { mountComponent } from '@/core/instance/lifecycle'
import { noop } from '@/shared/util'
import { patch } from './patch'
import { isReserevedAttr, mustUseProp } from '../util/attrs'
import {
  isReservedTag,
  getTagNamespace,
  isUnknownElement,
} from '../util/element'

// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReserevedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

export default Vue

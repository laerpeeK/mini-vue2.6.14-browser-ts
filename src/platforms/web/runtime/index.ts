import type { Component } from '@/types/component'
import Vue from '@/core'
import { inBrowser } from '@/core/util/env'
import { mountComponent } from '@/core/instance/lifecycle'
import { noop } from '@/shared/util'
import { patch } from '@/platforms/web/runtime/patch'
import { query } from '@/platforms/web/util'
import { isReserevedAttr, mustUseProp } from '@/platforms/web/util/attrs'
import {
  isReservedTag,
  getTagNamespace,
  isUnknownElement,
} from '@/platforms/web/util/element'

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

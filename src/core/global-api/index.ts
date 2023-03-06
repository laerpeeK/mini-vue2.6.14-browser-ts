import type { GlobalAPI } from '@/types/global-api'
import config from '../config'
import { initUse } from './use'
import { warn } from '../util/debug'
import { set, del, observe } from '../observer'
import { nextTick } from '../util/next-tick'
import { extend } from '@/shared/util'
import { initMixin } from './mixin'
import { mergeOptions } from '../util/options'
import { defineReactive } from '../observer'
import { ASSET_TYPES } from '@/shared/constant'

export function initGlobalAPI(Vue: GlobalAPI) {
  // config
  const configDef: Record<string, any> = {}
  configDef.get = () => config

  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // then unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive,
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  initUse(Vue)
  initMixin(Vue)
}

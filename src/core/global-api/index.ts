import { GlobalAPI } from '@/types/global-api'
import config from '../config'
import { initUse } from './use'
import { warn } from '../util/debug'
import { set, del, observe } from '../observer'
import { nextTick } from '../util/next-tick'
import { extend } from '@/shared/util'

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

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick
  
  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)

  // this is ued to identify the 'base' constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  initUse(Vue)
}

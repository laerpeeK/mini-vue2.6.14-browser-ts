import type { GlobalAPI } from '@/types/global-api'
import { mergeOptions } from '../util/options'

export function initMixin(Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}

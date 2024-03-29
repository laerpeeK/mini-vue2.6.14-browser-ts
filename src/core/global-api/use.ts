import type { GlobalAPI } from '@/types/global-api'
import { toArray } from '@/shared/util'
export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | any) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = [])
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (plugin.install && typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (plugin && typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}

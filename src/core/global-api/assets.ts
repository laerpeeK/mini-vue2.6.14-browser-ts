import type { GlobalAPI } from '@/types/global-api'
import { ASSET_TYPES } from '@/shared/constant'
import { validateComponentName } from '../util/options'
import { isPlainObject } from '../../shared/util'

export function initAssetRegisters(Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach((type) => {
    Vue[type] = function (id: string, definition?: Function | Object) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }

        if (type === 'component' && isPlainObject(definition)) {
          // @ts-expect-error
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }

        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}

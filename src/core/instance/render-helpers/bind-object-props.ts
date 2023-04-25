import config from '@/core/config'
import { warn } from '@/core/util/debug'
import {
  camelize,
  hyphenate,
  isObject,
  isReservedAttribute,
  toObject,
} from '@/shared/util'
import type { VNodeData } from '@/types/vnode'

export function bindObjectProps(
  data: any,
  tag: string,
  value: any,
  asProp: boolean,
  isSync?: boolean
): VNodeData {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' &&
        warn('v-bind without argument expects an Object or Array value', this)
    } else {
      if (Array.isArray(value)) {
        value = toObject(value)
      }
      let hash: any
      for (const key in value) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data
        } else {
          const type = data.attrs && data.attrs.type
          hash =
            asProp || config.mustUseProp(tag, type, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {})
        }
        const camelizedKey = camelize(key)
        const hyphenateKey = hyphenate(key)
        if (!(camelizedKey in hash) && !(hyphenateKey in hash)) {
          hash[key] = value[key]

          if (isSync) {
            const on = data.on || (data.on = {})
            on[`update:${key}`] = function ($event) {
              value[key] = $event
            }
          }
        }
      }
    }
  }
  return data
}

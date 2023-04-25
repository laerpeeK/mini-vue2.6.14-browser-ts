import { warn } from "@/core/util/debug"

export function bindDynamicKeys(
  baseObj: Record<string, any>,
  values: Array<any>
) {
  for (let i = 0; i < values.length; i += 2) {
    const key = values[i]
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1]
    } else if (
      process.env.NODE_ENV !== 'production' &&
      key !== '' &&
      key !== null
    ) {
      // null is a special value for explicitly removing a binding
      warn(
        `Invalid value for dynamic directive argument (expected string or null): ${key}`,
        this
      )
    }
  }
  return baseObj
}

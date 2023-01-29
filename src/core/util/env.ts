// Browser environment sniffing
export const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
export const isIE = UA && /msie|trident/.test(UA)

// can we use __proto__?
export const hasProto = '__proto__' in {}

// detect devtools
export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
let _isServer

export const isServerRendering = () => {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server'
    } else {
      _isServer = false
    }
  }
  return _isServer
}

export function isNative(Ctor: any): boolean {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

export const hasSymbol =
  typeof Symbol !== 'undefined' &&
  isNative(Symbol) &&
  typeof Reflect !== 'undefined' &&
  isNative(Reflect.ownKeys)

let _Set
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available
  _Set = Set
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = class Set implements SimpleSet {
    set: Record<string, boolean> = Object.create(null)

    has(key: string | number) {
      return this.set[key] === true
    }

    add(key: string | number) {
      this.set[key] = true
    }

    clear() {
      this.set = Object.create(null)
    }
  }
}

export interface SimpleSet {
  has(key: string | number): boolean
  add(key: string | number): any
  clear(): void
}

export { _Set }
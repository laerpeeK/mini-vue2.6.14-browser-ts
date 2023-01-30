import type { ComponentOptions } from './options'
import type Watcher from '@/core/observer/watcher'
export declare class Component {
  constructor(options?: any)
  // constructor infomation
  static cid: number
  static options: Record<string, any>
  static superOptions: Record<string, any>
  static super: typeof Component

  // private properties
  _isVue: true
  _uid: number | string
  _renderProxy: Component
  _self: Component
  _watcher: Watcher | null
  _inactive: boolean | null
  _directInactive: boolean
  _isMounted: boolean
  _isDestroyed: boolean
  _isBeingDestroyed: boolean
  _hasHookEvent: boolean
  _data: Record<string, any>
  _props: Record<string, any>
  _computedWatchers: { [key: string]: Watcher}
  _watchers: Array<Watcher>

  // public properties
  $root: Component
  $options: ComponentOptions
  $parent: Component | undefined
  $children: Array<Component>
  $refs: {
    [key: string]: Component | Element | Array<Component | Element> | undefined
  }
  $data: Record<string, any>
  $props: Record<string, any>
  $watch: (expOrFn: string | (() => any), cb: Function, options?: Record<string, any>) => Function

  // public methods
  $set: <T>(
    target: Record<string, any> | Array<T>,
    key: string | number,
    val: T
  ) => T
  $delete: <T>(
    target: Record<string, any> | Array<T>,
    key: string | number,
  ) => void

  // lifecycle
  _init: Function
}

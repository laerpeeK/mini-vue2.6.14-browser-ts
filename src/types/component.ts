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

  // public properties
  $root: Component
  $options: ComponentOptions
  $parent: Component | undefined
  $children: Array<Component>
  $refs: {
    [key: string]: Component | Element | Array<Component | Element> | undefined
  }
    // lifecycle
    _init: Function
}
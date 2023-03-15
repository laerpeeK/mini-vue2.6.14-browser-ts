import { Component } from '@/types/component'
import { Config } from '@/core/config'
import { ComponentOptions } from './options'
/**
 * @internal
 */
export interface GlobalAPI {
  // new(options?: any): Component
  (options?: any): void
  cid: number
  options: Record<string, any>
  config: Config
  util: Object

  extend: (options: ComponentOptions | object) => typeof Component
  set: <T>(target: Object | Array<T>, key: string | number, value: T) => T
  delete: <T>(target: Object | Array<T>, key: string | number) => void
  nextTick: (fn: Function, context?: Object) => void | Promise<any>
  use: (plugin: Function | Object) => GlobalAPI
  mixin: (mixin: Object) => GlobalAPI
  compile: (template: string) => {
    render: Function
    staticRenderFns: Array<Function>
  }

  directive: (id: string, def?: Function | Object) => Function | Object | void
  component: (
    id: string,
    def?: typeof Component | Object
  ) => typeof Component | void
  filter: (id: string, def?: Function) => Function | void

  observable: <T>(value: T) => T

  // allow dynamic method registration
  [key: string]: any
}

export interface extendAPI extends GlobalAPI {
  superOptions: Record<string, any>
  extendOptions: Record<string, any>
  sealedOptions: Record<string, any>
  super: typeof Component
}

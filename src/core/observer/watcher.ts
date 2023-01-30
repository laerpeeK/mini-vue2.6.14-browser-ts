import type { Component } from '@/types/component'
import type Dep from './dep'
import type { SimpleSet } from '../util/env'
import { _Set as Set } from '../util/env'
import { queueWatcher } from './scheduler'
import { pushTarget, popTarget } from './dep'
import { noop, isObject, remove } from '../../shared/util';
import { warn } from '../util/debug'
import { parsePath } from '../util/lang'
import { handleError, invokeWithErrorHandling } from '../util/error';
import { traverse } from './traverse'

let uid = 0

export interface WatcherOptions {
  lazy?: boolean
  sync?: boolean
  user?: boolean
  deep?: boolean
}

export default class Watcher {
  vm: Component | null
  newDepIds: SimpleSet
  newDeps: Array<Dep>
  depIds: SimpleSet
  deps: Array<Dep>
  id: number
  lazy: boolean
  dirty: boolean
  sync: boolean
  active: boolean
  getter: Function
  expression: string
  value: any
  user: boolean
  deep: boolean
  cb: Function

  constructor(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: WatcherOptions | null
  ) {
    this.vm = vm
    vm._watchers.push(this)
    
    if (options) {
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.user = !!options.user
      this.deep = !!options.deep
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }

    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.newDepIds = new Set()
    this.newDeps = []
    this.depIds = new Set()
    this.deps = []
    this.expression =
      process.env.NODE_ENV !== 'production' ? expOrFn.toString() : ''

    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' &&
          warn(
            `Failed watching path: "${expOrFn}" ` +
              'Watcher only accepts simple dot-delimited paths. ' +
              'For full control, use a function instead.',
            vm
          )
      }
    }
    this.value = this.lazy ? undefined : this.get()
  }

  /**
   * Add a dependency to this directive.
   */
  addDep(dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update() {
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run() {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {
          const info = `callback for watcher "${this.expression}"`
          invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info)          
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /**
   * Evaluate the getter, and re-collect dependencies
   */
  get() {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e: any) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  /**
   * Clean up for dependency collection.
   */
  cleanupDeps() {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    // jack
    // like NodeJS garbage collect, exchange the address
    let tmp: any = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  /**
   * Evaluate the value of the watcher
   * This only gets called for watchers
   */
  evaluate() {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher
   */
  depend() {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  teardown() {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the wm is being destroyed
      if (this.vm && !this.vm?._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}

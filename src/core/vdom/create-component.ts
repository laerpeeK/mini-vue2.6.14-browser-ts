import { isObject, isUndef, isDef, isTrue } from '@/shared/util'
import { Component } from '@/types/component'
import { InternalComponentOptions } from '@/types/options'
import { VNodeData, VNodeWithData, MountedComponentVNode } from '@/types/vnode'
import { resolveConstructorOptions } from '../instance/init'
import { activeInstance, callHook } from '../instance/lifecycle'
import { warn } from '../util/debug'
import { extractPropsFromVNodeData } from './helpers/extract-props'
import VNode from './vnode'

// inline hooks to be invoked on component VNodes during patch
const componentVNodeHooks = {
  init(vnode: VNodeWithData, hydrating: boolean) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive component, treat as a patch
      debugger
    } else {
      const child = (vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      ))
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  },
  prepatch(oldVnode: MountedComponentVNode, vnode: MountedComponentVNode) {
    debugger
  },
  insert(vnode: MountedComponentVNode) {
    const { context, componentInstance } = vnode
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }
    if (vnode.data.keepAlive) {
      debugger
    }
  },
  destroy(vnode: MountedComponentVNode) {
    debugger
  },
}

const hooksToMerge = Object.keys(componentVNodeHooks)

export function createComponent(
  Ctor?: typeof Component,
  data?: VNodeData,
  context?: Component,
  children?: Array<VNode>,
  tag?: string
) {
  if (isUndef(Ctor)) {
    return
  }

  const baseCtor = context?.$options._base

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor?.extend(Ctor!)
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(`Invalid Component definition: ${String(Ctor)}`, context)
    }
    return
  }

  // async component
  let asyncFactory
  if (isUndef(Ctor.cid)) {
    debugger
  }

  data = data || {}

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor)

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data)
  }

  // extract props
  const propsData = extractPropsFromVNodeData(data, Ctor, tag)

  // functional component
  if (isTrue(Ctor.options.functional)) {
    debugger
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  const listeners = data.on
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn

  if (isTrue(Ctor.options.abstract)) {
    debugger
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data)

  // return a placeholder vnode
  const name = Ctor.options.name || tag
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data,
    undefined,
    undefined,
    undefined,
    context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )

  return vnode
}

export function createComponentInstanceForVnode(vnode: any, parent: any) {
  const options: InternalComponentOptions = {
    _isComponent: true,
    _parentVnode: vnode,
    parent,
  }

  // check inline-template render functions
  const inlineTemplate = vnode.data.inlineTemplate
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.renderClass
    options.staticRenderFns = inlineTemplate.staticRenderFns
  }
  return new vnode.componentOptions.Ctor(options) as Component
}

function installComponentHooks(data: VNodeData) {
  const hooks = data.hook || (data.hook = {})
  for (let i = 0; i < hooksToMerge.length; i++) {
    const key = hooksToMerge[i]
    const existing = hooks[key]
    const toMerge = componentVNodeHooks[key]
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge
    }
  }
}

function mergeHook(f1: any, f2: any) {
  const merged = (a, b) => {
    f1(a, b)
    f2(a, b)
  }
  merged._merged = true
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  const prop = (options.model && options.model.prop) || 'value'
  const event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value
  const on = data.on || (data.on = {})
  const existing = on[event]
  const callback = data.model.callback
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing)
    }
  } else {
    on[event] = callback
  }
}

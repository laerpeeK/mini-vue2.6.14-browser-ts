import { GlobalAPI } from '@/types/global-api'
import { warn } from '../util/debug'
import { initMixin } from './init'
import { renderMixin } from './render'
import { stateMixin } from './state'
import { lifecycleMixin } from './lifecycle'
import { eventsMixin } from './events'

function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

//@ts-expect-error Vue has function type
// Vue.prototype._init
initMixin(Vue)

//@ts-expect-error Vue has function type
// Vue.prototype.$data $props $set $delete $watch
stateMixin(Vue)

//@ts-expect-error Vue has function type
eventsMixin(Vue)

//@ts-expect-error Vue has function type
lifecycleMixin(Vue)


//@ts-expect-error Vue has function type
renderMixin(Vue)

export default Vue as unknown as GlobalAPI

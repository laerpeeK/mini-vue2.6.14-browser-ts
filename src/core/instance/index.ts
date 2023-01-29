import { GlobalAPI } from '@/types/global-api'
import { warn } from '../util/debug'
import { initMixin } from './init'

function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

//@ts-expect-error Vue has function type
initMixin(Vue)
export default Vue as unknown as GlobalAPI

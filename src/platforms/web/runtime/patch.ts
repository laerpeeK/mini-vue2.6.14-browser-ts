import * as nodeOps from 'web/runtime/node-ops'
import platformModules from 'web/runtime/modules'
import baseModules from 'core/vdom/modules'
import { createPatchFunction } from '@/core/vdom/patch'
// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

export const patch: Function = createPatchFunction({ nodeOps, modules })

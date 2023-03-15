import * as nodeOps from '@/platforms/web/runtime/node-ops'
import platformModules from '@/platforms/web/runtime/modules'
import baseModules from '@/core/vdom/modules'
import { createPatchFunction } from '@/core/vdom/patch'
// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

export const patch: Function = createPatchFunction({ nodeOps, modules })

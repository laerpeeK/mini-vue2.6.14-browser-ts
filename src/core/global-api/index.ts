import { GlobalAPI } from '@/types/global-api'
import { initUse } from './use'
export function initGlobalAPI(Vue: GlobalAPI) {
  initUse(Vue)
}

import type { CompilerOptions } from '@/types/compiler'
import {
  isPreTag,
  isReservedTag,
  getTagNamespace,
} from '@/platforms/web/util/element'
import { mustUseProp } from '@/platforms/web/util/attrs'
import { isUnaryTag, canBeLeftOpenTag } from './util'

export const baseOptions: CompilerOptions = {
  isPreTag,
  isReservedTag,
  getTagNamespace,
  mustUseProp,
  expectHTML: true,
  isUnaryTag,
  canBeLeftOpenTag,
}

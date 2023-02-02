import type { CompilerOptions } from '@/types/compiler'
import { isPreTag, isReservedTag, getTagNamespace } from '../util/element'
import { mustUseProp } from '../util/attrs'
import { isUnaryTag, canBeLeftOpenTag } from './util';

export const baseOptions: CompilerOptions = {
  isPreTag,
  isReservedTag,
  getTagNamespace,
  mustUseProp,
  expectHTML: true,
  isUnaryTag,
  canBeLeftOpenTag
}

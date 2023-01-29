import type { ComponentOptions } from '@/types/options';

export function getComponentName(options: ComponentOptions) {
  return options.name || options.__name || options._componentTag
}
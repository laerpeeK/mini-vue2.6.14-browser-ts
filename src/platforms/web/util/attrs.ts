import { makeMap } from "@/shared/util";

// attributes that should be using props for binding
const acceptValue = makeMap('input,textarea,options,select,progress')
export const mustUseProp = (tag: string, type?: string | null, attr?: string): boolean  => {
  return (
    (attr === 'value' && acceptValue(tag) && type !== 'button') ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
}
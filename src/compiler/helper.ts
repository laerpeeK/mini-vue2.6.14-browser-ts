import { ASTElement } from '../types/compiler'
export function getAndRemoveAttr(
  el: ASTElement,
  name: string,
  removeFromMap?: boolean
) {
  let val
  if ((val = el.attrsMap[name]) != null) {
    const list = el.attrsList
    for (let i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1)
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name]
  }
  return val
}

type Range = { start?: number; end?: number }

export function addProp(
  el: ASTElement,
  name: string,
  value: string,
  range?: Range,
  dynamic?: boolean
) {
  ;(el.props || (el.props = [])).push(
    rangeSetItem({ name, value, dynamic }, range)
  )
  el.plain = false
}

export function addAttr(
  el: ASTElement,
  name: string,
  value: any,
  range?: Range,
  dynamic?: boolean
) {
  const attrs = dynamic
    ? el.dynamicAttrs || (el.dynamicAttrs = [])
    : el.attrs || (el.attrs = [])
  attrs.push(rangeSetItem({ name, value, dynamic }, range))
  el.plain = false
}

function rangeSetItem(item: any, range?: { start?: number; end?: number }) {
  if (range) {
    if (range.start != null) {
      item.start = range.start
    }
    if (range.end != null) {
      item.end = range.end
    }
  }
  return item
}
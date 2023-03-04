import {
  ASTElement,
  CompilerOptions,
  ASTAttr,
  ASTNode,
  ASTText,
  ASTExpression,
} from '@/types/compiler'
import { warn as baseWarn } from '@/core/util/debug'
import { no } from '@/shared/util'

export class CodegenState {
  options: CompilerOptions
  warn: Function
  staticRenderFns: Array<string>
  pre: boolean
  maybeComponent: (el: ASTElement) => boolean

  constructor(options: CompilerOptions) {
    this.options = options
    this.warn = options.warn || baseWarn
    const isReservedTag = options.isReservedTag || no
    this.staticRenderFns = []
    this.pre = false
    this.maybeComponent = (el: ASTElement) =>
      !!el.component || !isReservedTag(el.tag)
  }
}

// hoist static sub-trees out
function genStatic(el: ASTElement, state: CodegenState) {
  el.staticProcessed = true
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  const originalPreState = state.pre
  if (el.pre) {
    state.pre = el.pre
  }
  state.staticRenderFns.push(`with(this){return ${genElement(el, state)}}`)
  state.pre = originalPreState
  return `_m(${state.staticRenderFns.length - 1}${
    el.staticInFor ? ',true' : ''
  })`
}

// #3895, #4268
function transformSpecialNewlines(text: string): string {
  return text.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
}

function genProps(props: Array<ASTAttr>): string {
  let staticProps = ``
  let dynamicProps = ``
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    const value = transformSpecialNewlines(prop.value)
    if (prop.dynamic) {
      dynamicProps += `${prop.name},${value},`
    } else {
      staticProps += `"${prop.name}":${value},`
    }
  }
  staticProps = `{${staticProps.slice(0, -1)}}`
  if (dynamicProps) {
    return `_d(${staticProps},[${dynamicProps.slice(0, -1)}])`
  } else {
    return staticProps
  }
}

export function genData(el: ASTElement, state: CodegenState) {
  let data = '{'
  // attributes
  if (el.attrs) {
    data += `attrs:${genProps(el.attrs)},`
  }
  data = data.replace(/,$/, '') + '}'
  return data
}

export function genText(text: ASTText | ASTExpression): string {
  return `_v(${
    text.type === 2
      ? text.expression // no need for () because already wrapped in _s()
      : transformSpecialNewlines(JSON.stringify(text.text))
  })`
}

function genNode(node: ASTNode, state: CodegenState): string {
  if (node.type === 1) {
    console.warn('[jack debug]: unfinish')
    return ''
  } else if (node.type === 3 && node.isComment) {
    console.warn('[jack debug]: unfinish')
    return ''
  } else {
    return genText(node)
  }
}
// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType(
  children: Array<ASTNode>,
  maybeComponent: (el: ASTElement) => boolean
): number {
  let res = 0
  for (let i = 0; i < children.length; i++) {
    const el: ASTNode = children[0]
    if (el.type !== 1) {
      continue
    }
  }

  return res
}

export function genChildren(
  el: ASTElement,
  state: CodegenState,
  checkSkip?: boolean,
  altGenElement?: Function,
  altGenNode?: Function
) {
  const children = el.children
  if (children.length) {
    const el: any = children[0]
    // optimize single v-for
    if (
      children.length === 1 &&
      el.for &&
      el.tag !== 'template' &&
      el.tag !== 'slot'
    ) {
      const normalizationType = checkSkip
        ? state.maybeComponent(el)
          ? `,1`
          : `,0`
        : ''
      return `${(altGenElement || genElement)(el, state)}${normalizationType}`
    }

    const normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0
    const gen = altGenElement || genNode
    return `[${children.map((c) => gen(c, state)).join(',')}]${
      normalizationType ? `,${normalizationType}` : ''
    }`
  }
}

export function genElement(el: ASTElement, state: CodegenState) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else {
    let code
    if (el.component) {
      console.warn('[jack debug]: unfinished')
    } else {
      let data
      const maybeComponent = state.maybeComponent(el)
      if (!el.plain || (el.pre && maybeComponent)) {
        data = genData(el, state)
      }
      let tag: string | undefined
      if (!tag) tag = `'${el.tag}'`
      const children = el.inlineTemplate ? null : genChildren(el, state, true)
      code = `_c(${tag}${data ? `,${data}` : ''}${
        children ? `,${children}` : ''
      })`
    }
    return code
  }
}

export function generate(ast: ASTElement | void, options: CompilerOptions) {
  const state = new CodegenState(options)
  // fix #11483, Root level <script> tags should not be rendered.
  const code = ast
    ? ast.tag === 'script'
      ? 'null'
      : genElement(ast, state)
    : '_c("div")'
  return {
    render: `with(this){return ${code}}`,
    staticRenderFns: state.staticRenderFns,
  }
}

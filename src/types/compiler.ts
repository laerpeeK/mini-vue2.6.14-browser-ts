import type { Component } from './component'

export type CompilerOptions = {
  warn?: Function // allow customizing warning in different enviroments; e.g. node
  modules?: Array<ModuleOptions> // platform specific modules; e.g. style; class
  directives?: { [key: string]: Function } // platform specfic directives

  // web specific
  expectHTML?: boolean // only false for non-web builds
  outputSourceRange?: boolean
  isPreTag?: (tag: string) => boolean // check if a tag match pre
  mustUseProp?: (tag: string, type: string | null, name: string) => boolean // check if an attribute should be bound as a property
  isReservedTag?: (tag: string) => boolean | undefined // check if a tag is a native for the platform
  getTagNamespace?: (tag: string) => string | undefined // check the namespace for a tag
  isUnaryTag?: (tag: string) => boolean | undefined // check if a tag is unary for the platform
  canBeLeftOpenTag?: (tag: string) => boolean | undefined // check if a tag can be left opened
  shouldDecodeNewlines?: boolean
  shouldDecodeNewlinesForHref?: boolean 
  shouldKeepComment?: boolean
  preserveWhitespace?: boolean // preserve whitespace between elements? (Deprecated)
  whitespace?: 'preserve' | 'condense' // whitespace handling strategy

  // runtime user-configurable
  delimiters?: [string, string] // template delimiters
  comments?: boolean // preserve comments in template
}

export type CompiledResult = {
  ast: ASTElement | null
  render: string
  staticRenderFns: Array<string>
  errors?: Array<string | WarningMessage>
  tips?: Array<string | WarningMessage>
}

export type ASTElement = {
  type: 1
  tag: string
  attrsList: Array<ASTAttr>
  attrsMap: {[key: string]: any}
  rawAttrsMap: { [key: string]: ASTAttr }
  parent: ASTElement | void
  children: Array<ASTNode>

  start?: number
  end?: number
  attrs?: Array<ASTAttr>
  forbidden?: true
  plain?: boolean
  pre?: true
  ns?: string

  processed?: true
}

export type ASTExpression = {
  type: 2
  expression: string
}

export type ASTText = {
  type: 3
  text: string
}

export type ASTNode = ASTElement | ASTExpression | ASTText

export type WarningMessage = {
  msg: string
  start?: number
  end?: number
}

export type ModuleOptions = {}


export type CompiledFunctionResult = {
  render: Function
  staticRenderFns: Array<Function>
}

export type Compile = (
  template: string,
  options: CompilerOptions
) => CompiledResult

export type CompileToFunctions = (
  template: string,
  options?: CompilerOptions,
  vm?: Component
) => CompiledFunctionResult


export type createCompiler = (baseOptions: CompilerOptions) => {
  compile: Compile
  compileToFunctions: CompileToFunctions
}

export type ASTAttr = {
  name: string
  value: any
  dynamic?: boolean
  start?: number
  end?: number
}
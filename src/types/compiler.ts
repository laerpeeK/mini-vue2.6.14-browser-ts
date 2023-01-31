import type { Component } from './component'

export type CompilerOptions = {
  warn?: Function // allow customizing warning in different enviroments; e.g. node
  modules?: Array<ModuleOptions> // platform specific modules; e.g. style; class
  directives?: { [key: string]: Function } // platform specfic directives

  // web specific
  expectHTML?: boolean // only false for non-web builds
  outputSourceRange?: boolean

  // runtime user-configurable
  delimiters?: [string, string] // template delimiters
}

export type CompiledResult = {
  ast: ASTElement | null
  render: string
  staticRenderFns: Array<string>
  errors?: Array<string | WarningMessage>
  tips?: Array<string | WarningMessage>
}

export type ASTElement = {}

export type ASTNode = ASTElement

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
  options?: CompilerOptions
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

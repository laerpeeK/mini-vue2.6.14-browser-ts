import { createCompilerCreator } from './create-compiler'
import type { CompilerOptions, CompiledResult } from '@/types/compiler'
import { parse } from './parser'
import { optimize } from './optimizer'
import { generate } from './codegen'
// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using that default parts.
export const createCompiler = createCompilerCreator(function baseCompile(
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  debugger
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns,
  }
})

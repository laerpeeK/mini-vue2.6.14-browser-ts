import { createCompilerCreator } from './create-compiler'
import type { CompilerOptions, CompiledResult } from '@/types/compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using that default parts.
export const createCompiler = createCompilerCreator(function baseCompile(
  template: string,
  options?: CompilerOptions
): CompiledResult {
  const ast = { template, options }
  const render = 'return render'
  const staticRenderFns = []
  return {
    ast,
    render,
    staticRenderFns,
  }
})
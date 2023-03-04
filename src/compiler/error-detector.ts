import type { ASTNode } from '@/types/compiler'
// detect problematic expressions in a template
export function detectErrors(ast: ASTNode | null | undefined, warn: Function) {
  // jack will
  return { ast, warn }
}

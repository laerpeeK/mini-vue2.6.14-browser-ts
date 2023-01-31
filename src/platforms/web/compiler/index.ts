import { baseOptions } from './options'
import { createCompiler } from '@/compiler'

const { compile, compileToFunctions } = createCompiler(baseOptions)
export { compile, compileToFunctions }

import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import typescript from 'rollup-plugin-typescript2'
export default {
  input: './src/index.ts',
  output: {
    file: './dist/vue.js',
    name: 'Vue',
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    alias({
      entries: {
        '@': path.resolve(__dirname, './src')
      }
    }),
    typescript({
      exclude: "node_modules/**"
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    injectProcessEnv({
      NODE_ENV: 'development'
    })
  ],
}
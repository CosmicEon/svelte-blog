import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import typescriptCompiler from 'typescript';
import sveltePreprocessor from 'svelte-preprocess';

const development = process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'blog',
    file: 'public/build/index.js'
  },
  plugins: [
    svelte({
      dev: development,
      extensions: ['.svelte'],
      preprocess: sveltePreprocessor(),
      emitCss: true
    }),
    postcss({
      extract: true,
      minimize: true,
      use: [
        ['sass', {
          includePaths: [
            './theme',
            './node_modules'
          ]
        }]
      ]
    }),
    typescript({
      typescript: typescriptCompiler,
      clean: true
    }),
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs({ include: 'node_modules/**' }),

    development && serve({
      contentBase: './public',
      open: false
    }),

    development && livereload({ watch: './public' }),

    !development && terser({ sourcemap: true })
  ],
  watch: {
    clearScreen: false
  }
}
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import html from 'rollup-plugin-bundle-html';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
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
    file: 'dist/index.js'
  },
  plugins: [
    svelte({
      dev: development,
      extensions: ['.svelte'],
      preprocess: sveltePreprocessor(),
      emitCss: true
    }),
    html({
      template: 'public/index.html',
      dest: 'dist',
      filename: 'index.html'
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
    copy({
      targets: [
        {
          src: ['public/favicon.png'],
          dest: 'dist'
        }
      ],
      copyOnce: true
    }),

    development && serve({
      contentBase: './dist',
      open: false
    }),

    development && livereload({ watch: './dist' }),

    !development && terser({ sourcemap: true })
  ],
  watch: {
    clearScreen: false
  }
}
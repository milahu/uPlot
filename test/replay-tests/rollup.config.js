import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
//import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    name: 'app',
    sourcemap: true,
    format: 'iife',
    file: 'public/bundle.js'
  },
  plugins: [

    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production
      }
    }),

    css({ output: 'bundle.css' }),

    json(),

    resolve({
      browser: true,
      dedupe: ['svelte']
    }),

    commonjs({
      extensions: [
        '.js',
        '.snap',
        // actual extension is .js.snap, but not yet supported
        // https://github.com/rollup/plugins/issues/740
      ],
    }),

    !production && serve({
      open: true, // open browser
      verbose: false,
      contentBase: 'public',
      // Options used in setting up server
      host: 'localhost',
      //host: '0.0.0.0', // listen on all interfaces
      port: 5000,
    }),

    !production && livereload('public'),

    //production && terser()
  ],
  watch: {
    clearScreen: false
  }
};

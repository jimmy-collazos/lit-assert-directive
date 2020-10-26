import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

export default [
  // UMD minify(node and browser)
  {
    input: './lit-assert-directive.js',
    plugins: [
      nodeResolve(),
      terser()
    ],
    output: {
      exports: 'named',
      file: './min.js',
      format: 'umd',
      name: 'litAssertDirective'
    }
  },
];

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'json-filter.js',
  output: {
    file: 'dist/json-filter.min.js',
    format: 'umd',
    name: 'JsonFilter'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};
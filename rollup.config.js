import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "json-filter.js",
  output: {
    file: "dist/json-filter.min.js",
    format: "umd",
    name: "JsonFilter",
  },
  plugins: [
    babel({ babelHelpers: "bundled" }),
    commonjs(),
    nodeResolve(),
    terser(),
  ],
};

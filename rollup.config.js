import babel from '@rollup/plugin-babel'

export default {
  input: 'src/hypp.js',
  output: [
    {
      file: 'lib/cjs/hypp.js',
      format: 'cjs'
    },
    {
      file: 'lib/esm/hypp.js',
      format: 'esm'
    }
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
}

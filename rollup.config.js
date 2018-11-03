import babel from "rollup-plugin-babel";

const browserConfig = {
  input: "src/browser.js",
  output: [
    {
      file: "lib/cjs/browser.js",
      format: "cjs"
    },
    {
      file: "lib/esm/browser.js",
      format: "esm"
    }
  ],
  plugins: [
    babel({
      exclude: "node_modules/**" // only transpile our source code
    })
  ]
};

const serverConfig = {
  input: "src/server.js",
  output: [
    {
      file: "lib/cjs/server.js",
      format: "cjs"
    },
    {
      file: "lib/esm/server.js",
      format: "esm"
    }
  ],
  external: ["param-case"],
  plugins: [
    babel({
      exclude: "node_modules/**" // only transpile our source code
    })
  ]
};

export default [browserConfig, serverConfig];

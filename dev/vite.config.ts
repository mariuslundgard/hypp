import path from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
  esbuild: {
    jsxInject: `import {fragment} from 'hypp'`,
  },
  resolve: {
    alias: {
      hypp: path.resolve(__dirname, '../src/index.ts'),
    },
  },
})

import path from 'path'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      hypp: path.resolve(__dirname, 'src/index.ts'),
    },
  },
})

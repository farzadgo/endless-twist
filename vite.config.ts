import { defineConfig } from 'vite'
// import glsl from 'vite-plugin-glsl'
import { resolve } from 'pathe'

export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
  },
  // plugins: [glsl()],
  // assetsInclude: ['**/*.gltf'] // if problem in production
})

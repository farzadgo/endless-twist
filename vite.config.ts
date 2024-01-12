import { defineConfig } from 'vite'
// import glsl from 'vite-plugin-glsl'
import { resolve } from 'pathe'

export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
  },
  assetsInclude: ["**/*.md"],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        publication: resolve(__dirname, 'publication/index.html'),
      }
    }
  }
  // plugins: [glsl()],
  // assetsInclude: ['**/*.gltf'] // if problem in production
})

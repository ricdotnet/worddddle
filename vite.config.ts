import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ClassStoresPlugin } from '@idevelopthings/vue-class-stores/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ClassStoresPlugin({
      // The src path where your stores will be located
      storesPath: 'src/Stores',
      // The name of the generated typescript declaration file
      // stores.d.ts is the default
      storesFileName: 'stores.d.ts',
  }),
  vue(),
  ]
})

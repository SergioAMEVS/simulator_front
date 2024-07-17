import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Object.assign(process.env, loadEnv(mode, process.cwd()))

  return defineConfig({
    build: {
      outDir: 'dist'
    },
    base: process.env.VITE_BASE_URL,
    // server: {
    //   mimeTypes: {
    //     // The key is the file extension and the value is the MIME type
    //     css: 'text/css',
    //     html: 'text/html',
    //     js: 'text/javascript'
    //   }
    // },
    plugins: [react()],
    // server: {
    //   watch: {
    //     usePolling: true
    //   },
    //   host: true, // needed for the Docker Container port mapping to work
    //   strictPort: true,
    //   port: 5173
    // },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  })
  // define: {
  //   'process.env.VITE_APP_BASE_URL': JSON.stringify(
  //     process.env.VITE_APP_BASE_URL
  //   )
  // }
}

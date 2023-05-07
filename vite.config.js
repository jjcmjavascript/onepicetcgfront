import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  plugins: [
    react(),
    svgrPlugin(),
    eslintPlugin({
      cache: false,
      fix: true,
      emitWarning: false,
      failOnWarning: false,
      emitError: true,
      failOnError: true,
    }),
  ],

  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000,
  },
});

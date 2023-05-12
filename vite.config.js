import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

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

  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),

      // rutas de modulos
      '@duels': path.resolve(__dirname, 'src/modules/duels'),
    },
  },
});

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '');


  const allowedHosts = (env.VITE_ALLOWED_HOSTS || '')
    .split(',')
    .map(h => h.trim())
    .filter(Boolean);

  return {
    plugins: [react(), tailwindcss()],
    cacheDir: path.resolve(__dirname, '../node_modules/.vite'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@shared': path.resolve(__dirname, '../shared/src'),
      },
    },
    server: {
      allowedHosts,
    },
  };
});

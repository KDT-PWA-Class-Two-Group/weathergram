import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default (mode) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.BACKEND_URL;

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: target,
          changeOrigin: true
        }
      },
  });
};
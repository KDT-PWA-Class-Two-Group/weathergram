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
          target,
          changeOrigin: true,
          // 필요 시:
          // secure: false,   // self-signed HTTPS일 때
          // rewrite: (p) => p, // 경로 변환 필요 없으면 생략 가능
        },
      },
    },
  });
};
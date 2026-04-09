import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import cesium from 'vite-plugin-cesium';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [vue(), tailwindcss(), cesium()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.AI_API_KEY': JSON.stringify(env.AI_API_KEY || ''),
      'process.env.AI_BASE_URL': JSON.stringify(env.AI_BASE_URL || 'http://localhost:11434/v1'),
      'process.env.AI_MODEL_NAME': JSON.stringify(env.AI_MODEL_NAME || 'qwen2.5:7b'),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

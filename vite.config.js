import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base оставлен './' чтобы сборка корректно открывалась и на GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: './',
});

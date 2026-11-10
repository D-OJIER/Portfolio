import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes every asset URL relative so the build works on GitHub Pages
// (served from https://<user>.github.io/<repo>/).
export default defineConfig({
  base: './',
  plugins: [react()],
});

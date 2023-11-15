import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// other imports...

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/flight-search-app/', // এখানে তোমার GitHub repo নাম বসাবে
});

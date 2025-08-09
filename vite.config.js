import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Netlify এর জন্য বেস পাথ সরল রাখো
});

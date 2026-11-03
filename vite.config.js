import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Pour un déploiement dans un sous-dossier (ex. GitHub Pages) : base: '/mon-depot/'
export default defineConfig({
  plugins: [react()],
  base: '/',
});

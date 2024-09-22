import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    envDir: './environment',
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src/'),
        },
    },
    server: {
        https: {
          cert: fs.readFileSync('/etc/ssl/certs/test-opshero_site.crt'),
          key: fs.readFileSync('/etc/ssl/private/test-opshero.site.key'),
        },
        // Make sure the server is accessible over the local network
        host: '0.0.0.0',
      },
});

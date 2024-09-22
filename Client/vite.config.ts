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
          key: fs.readFileSync(path.resolve(__dirname, 'ssl/private.key')),
          cert: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.crt')),
        },
        // Make sure the server is accessible over the local network
        host: '0.0.0.0',
      },
});

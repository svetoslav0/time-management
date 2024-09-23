import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
let config = {
    plugins: [react()],
    envDir: './environment',
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src/'),
        },
    },
};

if (import.meta.env.VITE_ENV == 'DEV') {
    config.server = {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'ssl/private.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.crt')),
        },
        host: '0.0.0.0',
    }
}

export default defineConfig(config);

import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    let config = {
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
            host: '0.0.0.0',
        }
    };

    if (process.env.VITE_ENV !== 'DEV') {
        delete config.server;
    }

    console.log('DEBUG:');
    console.log(process.env.VITE_ENV);
    console.log(process.env);
    console.log(config.server);

    return defineConfig(config);
};

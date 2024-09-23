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
    };

    if (process.env.ENV == 'DEV') {
        console.log('IS DEV!!!');

        config['server'] = {
            https: {
                key: fs.readFileSync(path.resolve(__dirname, 'ssl/private.key')),
                    cert: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.crt')),
            },
            host: '0.0.0.0',
        }
    }

    console.log('=================== config =================== ');
    console.log(config);

    return defineConfig(config);
};

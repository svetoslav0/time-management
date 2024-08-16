import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './reactQuery/queryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId: string = process.env.CLIENT_ID as string;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={clientId}>
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);

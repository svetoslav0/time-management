import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './App.tsx';
import { queryClient } from './reactQuery/queryClient.ts';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID!;

console.log('DEBUG clientId:');
console.log(clientId);

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

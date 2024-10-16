import { RequestOptions } from '../shared/types';

import { clearUserData } from '@/util/util';

const host = import.meta.env.VITE_API_BASE_URL;
export async function httpRequest<T, V>(
    options: RequestOptions<T>,
    responseType: 'json' | 'blob' = 'json'
): Promise<V> {
    const { url, method, data, headers } = options;
    const fetchHeaders = new Headers({
        'Content-Type': 'application/json',
        ...headers,
    });

    const request: RequestInit = {
        method,
        credentials: 'include',
        headers: fetchHeaders,
    };

    if (data) {
        if (data instanceof FormData) {
            request.body = data;
            fetchHeaders.delete('Content-Type');
        } else {
            request.body = JSON.stringify(data);
        }
    }

    try {
        const response = await fetch(host + url, request);

        if (!response.ok) {
            if (response.status === 403) {
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message || `HTTP Request failed with status ${response.status}`);
        }

        if (response.status === 204) {
            return {} as V;
        }

        if (responseType === 'blob') {
            return (await response.blob()) as V;
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('HTTP Request failed due to an unknown error');
        }
    }
}
